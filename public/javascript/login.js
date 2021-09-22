async function loginFormHandler(event) {
    event.preventDefault();
  
    const email = document.querySelector('#email-login').value.trim();
    // const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    //route to login page
    if (email && password) {
      const response = await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      if (response.ok) {
        document.location.replace('/api/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  }

  document.querySelector('.yellow').addEventListener('click', loginFormHandler);