

async function loginFormHandler(event) {
    event.preventDefault();
    console.log('1111111')
    
    const email = document.querySelector('#email-login').value.trim();
    // const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-login').value.trim();
      console.log('2222222')
    //route to login page
    try{
  //     if (email)  {   
  //      const response =
  //     await fetch('/api/login', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       email
  //     }),
  //     headers: { 'Content-Type': 'application/json' }
  //   });
  //   console.log(response)
  //   if (response.ok) {
  //     document.location.replace('/api/signup');
  //   }
  //    else {
  //     alert(response.statusText);
  //   }
  // }
    if (email && password) {
      console.log(email, password)
      console.log(typeof email, typeof password)
      const response =
        await fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify({
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      console.log(response)
      // if (response.ok) {
      //   document.location.replace('/api/dashboard');
      // }
      //  else {
      //   alert(response.statusText);
      // }
    }
  }
  catch(error){
    console.log(error)
  }
   }
  

  document.querySelector('.yellow').addEventListener('click', loginFormHandler);