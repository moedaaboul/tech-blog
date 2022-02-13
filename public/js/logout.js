const logoutNavItem = document.querySelector('#log-out');

const handleLogout = async () => {
  const response = await fetch('/api/users/logout', {
    method: 'POST',
  });

  if (response.ok) {
    window.location.replace('/login');
  } else {
    alert('Failed to logout');
  }
};

logoutNavItem.addEventListener('click', handleLogout);
