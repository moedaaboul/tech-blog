import { makeRequest } from './helpers.js';

const loginForm = document.querySelector('#login-form');

const handleLogin = async (event) => {
  event.preventDefault();

  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  console.log(email, password);
  if (email && password) {
    try {
      const data = await makeRequest('/api/travellers/login', 'POST', {
        email,
        password,
      });
      // json respon from login POST route
      console.log(data, 'data');
      if (data.success) {
        window.location.replace('/api/travellers');
      } else {
        console.log('Failed to login');
      }
    } catch (error) {
      console.log('Failed to login', error);
    }
  } else {
    console.log('Failed to login');
  }
};

loginForm.addEventListener('submit', handleLogin);
