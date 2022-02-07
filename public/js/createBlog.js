import { makeRequest } from './helpers.js';

const createBlogButton = document.querySelector('#create-blog');

const handleCreateBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  if (title && content) {
    try {
      const data = await makeRequest('/api/blogs', 'POST', {
        blog_title: title,
        blog_body: content,
      });
      // json respon from login POST route
      console.log(data, 'data');
      if (data.success) {
        window.location.replace('/');
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
createBlogButton.addEventListener('click', handleCreateBlog);