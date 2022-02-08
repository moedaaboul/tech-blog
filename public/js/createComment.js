import { makeRequest } from './helpers.js';

const createCommentButton = document.querySelector('#create-comment');

const handleCreateComment = async () => {
  const comment = document.querySelector('#comment').value;
  const titleID = document.querySelector('.title');
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
createCommentButton.addEventListener('click', handleCreateComment);
