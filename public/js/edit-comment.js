async function editFormHandler(event) {
    event.preventDefault();
  
    const comment = document.querySelector('input[name="comment"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/comments/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            comment,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        document.location.replace('/');
      }
  }
  
  document.querySelector('.edit-comment-form').addEventListener('submit', editFormHandler);