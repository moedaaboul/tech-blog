import { makeRequest } from './helpers.js';

const registerForm = document.querySelector('#register-form');

const handleRegister = async (event) => {
  event.preventDefault();

  const name = document.querySelector('#username').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirm-password').value;
  console.log(name);

  if (
    email &&
    name &&
    password &&
    confirmPassword &&
    password === confirmPassword
  ) {
    try {
      const data = await makeRequest('api/users/register', 'POST', {
        name,
        email,
        password,
      });
      console.log(data, 'data');
      if (data.success) {
        window.location.replace('/');
        // registerForm.removeEventListener('submit', handleRegister);
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

registerForm.addEventListener('submit', handleRegister);
