// Small interaction handlers for the static site
document.addEventListener('DOMContentLoaded', function(){
  const years = document.querySelectorAll('#year, #year2, #year3, #year4');
  years.forEach(el=>{ if(el) el.textContent = new Date().getFullYear(); });

  const form = document.getElementById('inquiry-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const name = form.name.value.trim();
      const phone = form.phone.value.trim();
      const message = form.message.value.trim();
      const msgEl = document.getElementById('form-msg');
      if(!name || !phone || !message){ msgEl.textContent = 'Please fill all fields.'; return; }
      // If form has a data-endpoint (Formspree or serverless), submit there as well
      const endpoint = form.dataset.endpoint;
      const whatsappNumber = '923390791989';
      const waText = encodeURIComponent(`Hi FlavourCo, I have an order inquiry.%0A%0AName: ${name}%0APhone: ${phone}%0A%0A${message}`);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;

      if(endpoint){
        // send to Formspree (or similar) asynchronously, don't block WhatsApp open
        fetch(endpoint, {method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json'}, body: JSON.stringify({name,phone,message})})
        .then(res=>{ if(res.ok) console.log('Form submitted to serverless endpoint'); })
        .catch(err=>console.warn('Serverless submit failed', err));
      }

      try{ window.open(waUrl, '_blank'); msgEl.textContent = 'Opening WhatsApp to send your inquiry.'; }
      catch(e){ const subject = encodeURIComponent('Order inquiry from ' + name); const body = encodeURIComponent(`Name: ${name}\nPhone: ${phone}\n\n${message}`); window.location.href = `mailto:orders@flavourco.pk?subject=${subject}&body=${body}`; msgEl.textContent = 'Could not open WhatsApp — opening your email client instead.'; }
      form.reset();
    });
  }

  // Quick-order forms on order.html
  const quick = document.getElementById('quick-order');
  if(quick){
    quick.addEventListener('submit', function(e){
      e.preventDefault();
      const name = quick.name.value.trim();
      const phone = quick.phone.value.trim();
      const qty = quick.qty.value.trim();
      const product = quick.querySelector('input[name="product"]').value;
      const msgEl = document.getElementById('order-msg');
      if(!name||!phone||!qty){ msgEl.textContent = 'Please fill all fields.'; return; }
      const whatsappNumber = '923390791989';
      const waText = encodeURIComponent(`Hi FlavourCo, I want to order ${qty} of ${product}.%0A%0AName: ${name}%0APhone: ${phone}`);
      const waUrl = `https://wa.me/${whatsappNumber}?text=${waText}`;
      const endpoint = quick.dataset.endpoint;
      if(endpoint){
        fetch(endpoint, {method:'POST', headers:{'Accept':'application/json','Content-Type':'application/json'}, body: JSON.stringify({name,phone,qty,product})})
        .then(r=>console.log('Submitted quick order'))
        .catch(()=>{});
      }
      try{ window.open(waUrl,'_blank'); msgEl.textContent='Opening WhatsApp...'; }
      catch(e){ window.location.href = `mailto:orders@flavourco.pk?subject=${encodeURIComponent('Order: '+product)}&body=${encodeURIComponent(`Name: ${name}\nPhone: ${phone}\nQty: ${qty}`)}`; msgEl.textContent='Opening email client...'; }
      quick.reset();
    });
  }
});