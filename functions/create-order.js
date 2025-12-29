exports.handler = async function(event, context){
  try{
    const body = JSON.parse(event.body || '{}');
    const {name,phone,email,address,items,total_amount,site,payment_method} = body;
    if (!name || !phone || !address || !items || !Array.isArray(items) || items.length===0){
      return { statusCode:400, body: JSON.stringify({ success:false, error:'Missing required fields.' }) };
    }
    const orderId = 'FC' + Date.now().toString(36) + Math.random().toString(36).slice(2,6).toUpperCase();
    const order = { orderId, name, phone, email, address, items, total_amount, site, payment_method, status:'pending', created_at: new Date().toISOString() };

    // Optionally store in Supabase if configured
    const SUPABASE_URL = process.env.SUPABASE_URL;
    const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (SUPABASE_URL && SUPABASE_KEY){
      try{
        await fetch(`${SUPABASE_URL}/rest/v1/orders`,{
          method:'POST',
          headers:{
            'Content-Type':'application/json',
            'apikey': SUPABASE_KEY,
            'Authorization': `Bearer ${SUPABASE_KEY}`,
            'Prefer': 'return=representation'
          },
          body: JSON.stringify(order)
        });
      }catch(e){ console.warn('Supabase insert failed', e); }
    }

    // Send admin email via SendGrid if configured
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (SENDGRID_API_KEY && ADMIN_EMAIL){
      const sgPayload = {
        personalizations:[{ to:[{email:ADMIN_EMAIL}], subject:`New FlavourCo order ${orderId}`}] ,
        from:{ email: ADMIN_EMAIL },
        content:[{ type:'text/plain', value: `New order ${orderId}\n\n${JSON.stringify(order, null, 2)}` }]
      };
      try{
        await fetch('https://api.sendgrid.com/v3/mail/send',{
          method:'POST',
          headers:{ 'Authorization': `Bearer ${SENDGRID_API_KEY}`, 'Content-Type':'application/json' },
          body: JSON.stringify(sgPayload)
        });
      }catch(e){ console.warn('SendGrid send failed', e); }
    }

    return { statusCode:200, body: JSON.stringify({ success:true, orderId, paymentDetails: null }) };
  }catch(err){ console.error(err); return { statusCode:500, body: JSON.stringify({ success:false, error:'Server error' }) }; }
};
