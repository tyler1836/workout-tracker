async function deleteFormHandler(event) {

    event.preventDefault();

    //routes to notes
    const id = $('#title').attr('data_id')
    const response = await fetch(`/api/posts/${id}`, {
        //deleting active note
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {

        document.location.replace('/api/dashboard');

      } else {

        alert(response.statusText);
      }
    
  }
  
  //  document.querySelector('.red').addEventListener('click', deleteFormHandler);

   $('.red').on('click', deleteFormHandler)