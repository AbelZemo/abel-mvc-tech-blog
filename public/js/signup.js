async function signupFormHandler(event) {
    event.preventDefault();
  
    const username = document.querySelector('#username-section').value.trim();
    const email = document.querySelector('#email-section').value.trim();
    const password = document.querySelector('#password-section').value.trim();

  
    if (username && email && password) {
      const response = await fetch('/api/users/register', {
        method: 'post',
        body: JSON.stringify({
          username,
          email,
          password
        }),
        headers: { 'Content-Type': 'application/json' }
      });
  
      // check the response status
      if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
}
  
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);