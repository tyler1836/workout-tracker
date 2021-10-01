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
var noteTitle = document.querySelector('#title');
var noteText = document.querySelector('.comment');
$('.post-list').on('click', 'li', function(){
  console.log('anything')
  console.log($(this).next('li'))
  var id = $(this)[0].id;
  var title = $(this)[0].innerHTML;
  var text = $(this).next('li')[0].innerHTML;
  $(noteTitle).attr('data_id', id);
  noteTitle.value = title;
  noteText.value = text;
  
})

  var teal = document.querySelector('.teal');
  if(teal){ teal.addEventListener('click', commentFormHandler);}