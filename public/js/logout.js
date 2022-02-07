import { makeRequest } from './helpers.js';

const logoutNavItem = document.querySelector('#log-out');

const handleLogout = async (event) => {
  try {
    const data = await makeRequest('users/logout', 'POST', {});
    console.log(data, 'data');
    if (data.success) {
      window.location.replace('/login');
    } else {
      console.log('Failed to logout');
    }
  } catch (error) {
    console.log('Failed to logout', error);
  }
};

logoutNavItem.addEventListener('click', handleLogout);
