const menu = document.querySelector('.menu');
const links = document.querySelector('.navlinks');
if(menu && links) menu.addEventListener('click',()=>{const open=links.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
// Set this to your Formspree form endpoint after creating and verifying your form.
const FORM_ENDPOINT = '';
const form = document.querySelector('#enquiry-form');
if(form) form.addEventListener('submit', async (event)=>{
 event.preventDefault(); const message=document.querySelector('#form-message');
 if(!FORM_ENDPOINT){message.textContent='This demo form is not connected yet. Please configure the form endpoint before publishing.';return;}
 const button=form.querySelector('button'); button.disabled=true; button.textContent='Sending…';message.textContent='';
 try{const response=await fetch(FORM_ENDPOINT,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});if(!response.ok)throw new Error('Failed');form.reset();message.textContent='Thank you. Your enquiry has been sent.'}catch(error){message.textContent='Sorry, your enquiry could not be sent. Please try again later.'}finally{button.disabled=false;button.innerHTML='Send enquiry <span aria-hidden="true">↗</span>'}
});
