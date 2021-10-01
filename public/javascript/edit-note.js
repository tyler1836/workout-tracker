async function editFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('#title').value;
	const post_text = document.querySelector('#comment_text').value.trim();
	const id = $('#title').attr('data_id')

	const response = await fetch(`/api/posts/${id}`, {
		method: 'PUT',
		body: JSON.stringify({
			title,
			post_text,
		}),
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (response.ok) {
		document.location.replace('/api/dashboard');
	} else {
		alert(response.statusText);
	}
}

$('.orange').on('click', editFormHandler)
