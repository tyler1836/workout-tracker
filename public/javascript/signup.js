async function signupFormHandler(event) {
    event.preventDefault();


    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    //route to signup page
    if (email && password && username) {
        const response = await fetch('/api/signup', {
            method: 'POST',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        });
        if (response.ok) {
            console.log('success');


            document.location.replace('/api/dashboard');

        } else {
            alert(response.statusText);
        }
    }
}

// document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);

// fixes NULL by executing after the DOM fully loads
var el = document.querySelector('.signup-form');
if (el) {
	el.addEventListener('submit', signupFormHandler, false);
}