async function commentFormHandler(event) {
    event.preventDefault();

    const title = document.querySelector('#title').value.trim();
    const post_text = document.querySelector('#comment_text').value.trim();
  
    const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (title && comment_text) {
        const response = await fetch('/api/posts', {
          method: 'POST',
          body: JSON.stringify({
            post_id,
            title,
            post_text
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });
      
        if (response.ok) {
          document.location.reload('/notespage');
        } else {
          alert(response.statusText);
        }
      }
  }
  
  var teal = document.querySelector('.teal');
  if(teal){ teal.addEventListener('click', commentFormHandler);}