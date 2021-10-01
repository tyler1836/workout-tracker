async function logout() {
	const response = await fetch('/api/logout', {
		method: 'post',
		headers: { 'Content-Type': 'application/json' },
	});

	if (response.ok) {
		document.location.replace('/logout');
	} else {
		alert('alert here');
	}
}

//   document.querySelector('#logout').addEventListener('click', logout);

// fixes NULL by executing after the DOM fully loads
var el = document.querySelector('#logout');
if (el) {
	el.addEventListener('click', logout, false);
}
