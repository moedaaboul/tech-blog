import { makeRequest } from './helpers.js';

const createBlogButton = document.querySelector('#create-blog');

const handleCreateBlog = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  const description = document.querySelector('#description').value;
  if (title && content && description) {
    try {
      const data = await makeRequest('/api/blogs', 'POST', {
        blog_title: title,
        blog_body: content,
        blog_description: description,
      });
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
createBlogButton.addEventListener('submit', handleCreateBlog);
