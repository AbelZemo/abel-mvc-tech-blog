async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title-of-post"]').value;
    const post = document.querySelector('input[name="post"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            post
        }),
        headers: {
            'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard/');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);