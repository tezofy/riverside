/* Riverside Racing Syndicate — site scripts */
(function () {
  'use strict';

  /* Enquiry form
     FORM_ENDPOINT must be set to the form-handling URL before launch
     (for example a Formspree endpoint). See SETUP.md. */
  var FORM_ENDPOINT = 'https://formspree.io/f/mjyypjwn';

  var form = document.querySelector('#enquiry-form');
  if (!form) return;

  var status = document.querySelector('#form-message');
  var button = form.querySelector('button[type="submit"]');
  var buttonHTML = button ? button.innerHTML : '';

  function setStatus(text) { if (status) status.textContent = text; }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    setStatus('');

    /* Honeypot: real visitors never fill this hidden field. Pretend success for bots. */
    var trap = form.querySelector('input[name="_gotcha"]');
    if (trap && trap.value) { form.reset(); setStatus('Thank you. Your enquiry has been sent.'); return; }

    if (!FORM_ENDPOINT) {
      console.error('Enquiry form is not configured: set FORM_ENDPOINT in assets/js/app.js.');
      setStatus('Sorry, enquiries are temporarily unavailable. Please try again shortly.');
      return;
    }

    if (button) { button.disabled = true; button.textContent = 'Sending…'; }

    try {
      var response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (!response.ok) throw new Error('Request failed');
      form.reset();
      setStatus('Thank you. Your enquiry has been sent.');
    } catch (error) {
      setStatus('Sorry, your enquiry could not be sent. Please try again later.');
    } finally {
      if (button) { button.disabled = false; button.innerHTML = buttonHTML; }
    }
  });
})();
