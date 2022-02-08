import { makeRequest } from './helpers.js';

const createCommentButton = document.querySelector('#create-comment');
const deleteBlogBtn = document.querySelector('.delete-btn');

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

createCommentButton.addEventListener('click', handleCreateComment);
deleteBlogBtn.addEventListener('click', handleDeleteBlog);
