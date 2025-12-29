(function(){
  const form = document.getElementById('orderForm');
  const instructionsBox = document.getElementById('instructionsBox');
  const message = document.getElementById('formMessage');
  const receiptInput = document.getElementById('receipt');
  const clearBtn = document.getElementById('clearBtn');

  // Read payment display values from assets/data/payment.json
  let PAYMENT_DATA = null;
  fetch('/assets/data/payment.json').then(r=>r.json()).then(j=>{ PAYMENT_DATA = j; }).catch(()=>{ PAYMENT_DATA = null; });

  // Change this to your serverless endpoints during deployment.
  const CREATE_ORDER_ENDPOINT = '/.netlify/functions/create-order';
  const UPLOAD_RECEIPT_ENDPOINT = '/.netlify/functions/upload-receipt';

  function serializeForm(formEl){
    const fd = new FormData(formEl);
    const data = {};
    for (const [k,v] of fd.entries()){
      if (k === 'items[]'){
        data.items = data.items || [];
        data.items.push(v);
      } else {
        data[k] = v;
      }
    }
    return data;
  }

  async function postJSON(url, body){
    const res = await fetch(url, {
      method:'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(body),
    });
    return res.json();
  }

  form && form.addEventListener('submit', async function(e){
    e.preventDefault();
    message.textContent = 'Creating order…';
    instructionsBox.innerHTML = '';

    const data = serializeForm(form);

    // Basic client-side validation
    if (!data.name || !data.phone || !data.address){
      message.textContent = 'Please fill name, phone, and address.';
      return;
    }
    // Build items details (parse price included in value)
    const items = [];
    const formData = new FormData(form);
    for (const val of formData.getAll('items[]')){
      const [title, price] = val.split('|');
      items.push({title, price: Number(price)});
    }
    if (items.length === 0){
      message.textContent = 'Please select at least one product.';
      return;
    }
    // compute total
    const total = items.reduce((s,i)=>s+i.price,0);
    data.items = items;
    data.total_amount = total;
    data.site = window.location.origin;

    try {
      const res = await postJSON(CREATE_ORDER_ENDPOINT, data);
      if (res && res.success){
        const orderId = res.orderId;
        message.textContent = 'Order created. Follow the payment instructions below.';
        renderInstructions(orderId, data.payment_method, data.total_amount, res.paymentDetails);
        if (receiptInput.files && receiptInput.files.length){
          message.textContent = 'Uploading receipt…';
          const file = receiptInput.files[0];
          if (file.size > 5*1024*1024){
            message.textContent = 'Receipt too large. Max 5MB.';
            return;
          }
          const b64 = await fileToBase64(file);
          const upRes = await postJSON(UPLOAD_RECEIPT_ENDPOINT, {
            orderId,
            fileName: file.name,
            contentType: file.type,
            base64: b64.split(',')[1],
            customerEmail: data.email || ''
          });
          if (upRes && upRes.success){
            message.textContent = 'Receipt uploaded. We will verify your transfer and confirm soon.';
          } else {
            message.textContent = 'Order created, but receipt upload failed. You can send it via WhatsApp or email.';
          }
        } else {
          message.textContent = 'Order created. Please complete transfer and upload the receipt or send via WhatsApp.';
        }
      } else {
        message.textContent = (res && res.error) ? res.error : 'Failed to create order. Try again later.';
      }
    } catch(err){
      console.error(err);
      message.textContent = 'Unexpected error. Try again later.';
    }
  });

  clearBtn && clearBtn.addEventListener('click', function(){ form.reset(); instructionsBox.innerHTML=''; message.textContent=''; });

  function renderInstructions(orderId, method, amount, paymentDetails = null){
    const container = instructionsBox;
    let html = `<div><strong>Order ID:</strong> ${orderId}</div>`;
    html += `<div><strong>Amount:</strong> PKR ${amount}</div>`;
    const pd = PAYMENT_DATA;
    if (paymentDetails){
      html += `<div class=\"muted\">${paymentDetails}</div>`;
    } else if (pd){
      if (method === 'jazzcash'){
        html += `<div><strong>JazzCash:</strong> <br>Number: <code>${pd.jazzcash_number}</code><br>Include Order ID in the transfer note.</div>`;
      } else if (method === 'easypaisa'){
        html += `<div><strong>Easypaisa:</strong> <br>Number: <code>${pd.easypaisa_number}</code><br>Include Order ID in the transfer note.</div>`;
      } else {
        html += `<div><strong>Bank Transfer:</strong> <br>Account: <code>${pd.bank.account_title} — ${pd.bank.account_number}</code><br>IBAN: <code>${pd.bank.iban}</code><br>Bank: <code>${pd.bank.bank_name}</code><br>Include Order ID in the transfer note.</div>`;
      }
    } else {
      if (method === 'jazzcash'){
        html += `<div><strong>JazzCash:</strong> <br>Number: <code>+92 3xx xxxxxxx</code><br>Include Order ID in the transfer note.</div>`;
      } else if (method === 'easypaisa'){
        html += `<div><strong>Easypaisa:</strong> <br>Number: <code>+92 3xx xxxxxxx</code><br>Include Order ID in the transfer note.</div>`;
      } else {
        html += `<div><strong>Bank Transfer:</strong> <br>Account: <code>FlavourCo — 0123456789 (Bank Name)</code><br>IBAN: <code>PK00XXXXXXXXXXXX</code><br>Include Order ID in the transfer note.</div>`;
      }
    }
    html += `<div class=\"muted\" style=\"margin-top:.6rem\">After payment, upload the transfer receipt in the form to speed up verification.</div>`;
    container.innerHTML = html;
  }

  function fileToBase64(file){
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
})();
