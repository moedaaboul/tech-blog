//DOMContentLoaded - it fires when initial HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function () {
  // querySelector - it returns the element within the document that matches the specified selector
  var elements = document.querySelectorAll('.dropdown');

  Array.from(elements).forEach(function (element) {
    element.addEventListener('click', function (event) {
      //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
      event.stopPropagation();

      //classList.toggle - it toggles between adding and removing a class name from an element
      element.classList.toggle('is-active');
    });
  });
});
