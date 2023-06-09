async function newFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="title-of-post"]').value;
    const post = document.querySelector('input[name="post"]').value;
  
    const response = await fetch(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post
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
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);