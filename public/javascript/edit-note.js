async function editFormHandler(event) {
	event.preventDefault();

	const title = document.querySelector('title').value;
	const post_text = document.querySelector('comment_text').value;
	const id = window.location.toString().split('/')[
		window.location.toString().split('/').length - 1
	];

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
		document.location.replace('/dashboard/');
	} else {
		alert(response.statusText);
	}
}

document.querySelector('.orange').addEventListener('submit', editFormHandler);
