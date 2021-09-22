async function deleteFormHandler(event) {

    event.preventDefault();

    //routes to notes
    const response = await fetch(`/api/posts/${id}`, {
        //deleting active note
        method: 'DELETE',
        body: JSON.stringify({
        post_id: id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {

        document.location.replace('/dashboard');

      } else {

        alert(response.statusText);
      }
    
  }
  
   document.querySelector('.red').addEventListener('click', deleteFormHandler);