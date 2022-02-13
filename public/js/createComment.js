import { makeRequest } from './helpers.js';

const createCommentButton = document.querySelector('#create-comment');
const deleteBlogBtn = document.querySelector('.delete-btn');
var elements = document.querySelectorAll('.delete-comment');
var updateElements = document.querySelectorAll('.update-comment');
const handleCreateComment = async () => {
  const comment = document.querySelector('#comment').value;
  const titleID = document.querySelector('.title').id;
  if (comment && titleID) {
    try {
      const data = await makeRequest('/api/comments', 'POST', {
        comment_text: comment,
        blog_id: titleID,
      });
      if (data.success) {
        window.location.reload();
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

const handleDeleteBlog = async () => {
  const titleID = document.querySelector('.title').id;
  if (titleID) {
    try {
      const data = await makeRequest(`/api/blogs/${titleID}`, 'DELETE');
      if (data.success) {
        window.location.replace('/dashboard');
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

//DOMContentLoaded - it fires when initial HTML document has been completely loaded
document.addEventListener('DOMContentLoaded', function () {
  // querySelector - it returns the element within the document that matches the specified selector
  const titleID = document.querySelector('.title').id;
  Array.from(elements).forEach(function (element) {
    element.addEventListener('click', async function (event) {
      //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
      event.stopPropagation();
      const commentID = element.id;
      const data = await makeRequest(`/api/comments/${commentID}`, 'DELETE');
      if (data.success) {
        window.location.replace(`/blogs/${titleID}`);
      } else {
        console.log('Failed to login');
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // querySelector - it returns the element within the document that matches the specified selector
  const titleID = document.querySelector('.title').id;
  Array.from(updateElements).forEach(function (element) {
    element.addEventListener('click', function (event) {
      //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
      event.stopPropagation();
      const commentID = element.id;
      const messageBox = document.querySelector(`[data-id="${commentID}"]`);
      const saveBtn = document.querySelector(`[save-btn-id="${commentID}"]`);
      messageBox.toggleAttribute('disabled');
      saveBtn.classList.toggle('hidden');
      saveBtn.addEventListener('click', async function (event) {
        //event.stopPropagation() - it stops the bubbling of an event to parent elements, by preventing parent event handlers from being executed
        event.stopPropagation();
        const updatedComment = messageBox.value;
        const data = await makeRequest(`/api/comments/${commentID}`, 'PUT', {
          comment_text: updatedComment,
        });
        if (data.success) {
          window.location.replace(`/blogs/${titleID}`);
        } else {
          console.log('Failed to login');
        }
      });
    });
  });
});

createCommentButton.addEventListener('click', handleCreateComment);

document.addEventListener('DOMContentLoaded', function () {
  if (deleteBlogBtn) {
    deleteBlogBtn.addEventListener('click', handleDeleteBlog);
  }
});
