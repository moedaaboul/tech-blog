const toggleBtn = document.querySelector('.burger');
const menuContainer = document.querySelector('.menu-container');
const menu = document.querySelector('.menu');

(function () {
  var toggleBtn = document.querySelector('.burger');
  var menuContainer = document.querySelector('.menu-container');
  toggleBtn.addEventListener('click', function () {
    toggleBtn.classList.toggle('is-active');
    menuContainer.classList.toggle('is-active');
  });
})();
