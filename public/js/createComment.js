import { makeRequest } from './helpers.js';

const createCommentButton = document.querySelector('#create-comment');
const deleteBlogBtn = document.querySelector('.delete-btn');
const deleteCommentBtn = document.querySelectorAll('.delete-comment');
var elements = document.querySelectorAll('.delete-comment');

const handleCreateComment = async () => {
  const comment = document.querySelector('#comment').value;
  const titleID = document.querySelector('.title').id;
  console.log(createCommentButton, titleID);
  if (comment && titleID) {
    try {
      const data = await makeRequest('/api/comments', 'POST', {
        comment_text: comment,
        blog_id: titleID,
      });
      // json respon from login POST route
      console.log(data, 'data');
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
  console.log(titleID);
  if (titleID) {
    try {
      const data = await makeRequest(`/api/blogs/${titleID}`, 'DELETE');
      // json respon from login POST route
      console.log(data, 'data');
      if (data.success) {
        window.location.replace('/api/blogs');
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
      console.log(commentID);
      const data = await makeRequest(`/api/comments/${commentID}`, 'DELETE');
      console.log(data, 'data');
      if (data.success) {
        window.location.replace(`/api/blogs/${titleID}`);
      } else {
        console.log('Failed to login');
      }
    });
  });
});

createCommentButton.addEventListener('click', handleCreateComment);
deleteBlogBtn.addEventListener('click', handleDeleteBlog);
