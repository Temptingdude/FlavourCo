exports.handler = async function(event, context){
  try{
    const body = JSON.parse(event.body || '{}');
    const { orderId, fileName, contentType, base64, customerEmail } = body;
    if (!orderId || !fileName || !base64){
      return { statusCode:400, body: JSON.stringify({ success:false, error:'Missing required fields.' }) };
    }
    const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
    const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
    if (SENDGRID_API_KEY && ADMIN_EMAIL){
      const sgPayload = {
        personalizations:[{ to:[{email:ADMIN_EMAIL}], subject:`Receipt for order ${orderId}`}],
        from:{ email: ADMIN_EMAIL },
        content:[{ type:'text/plain', value: `Receipt received for order ${orderId}.` }],
        attachments:[{ content: base64, filename: fileName, type: contentType || 'application/octet-stream', disposition:'attachment' }]
      };
      if (customerEmail){ sgPayload.personalizations.push({ to:[{email:customerEmail}], subject:`Receipt uploaded for your order ${orderId}` }); }
      try{
        await fetch('https://api.sendgrid.com/v3/mail/send',{
          method:'POST',
          headers:{ 'Authorization': `Bearer ${SENDGRID_API_KEY}`, 'Content-Type':'application/json' },
          body: JSON.stringify(sgPayload)
        });
      }catch(e){ console.warn('SendGrid send failed', e); }
      return { statusCode:200, body: JSON.stringify({ success:true }) };
    }
    return { statusCode:200, body: JSON.stringify({ success:false, error:'SendGrid not configured. Receipts will not be emailed.' }) };
  }catch(err){ console.error(err); return { statusCode:500, body: JSON.stringify({ success:false, error:'Server error' }) }; }
};
