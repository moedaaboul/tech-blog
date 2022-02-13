import { makeRequest } from './helpers.js';

const editBlogButton = document.querySelector('#edit-btn');

const handleEditBlog = async (event) => {
  event.preventDefault();

  const blogID = document.querySelector('.title-label').id;
  const title = document.querySelector('#title').value;
  const content = document.querySelector('#content').value;
  console.log(title, content, blogID);
  if (title && content) {
    try {
      const data = await makeRequest(`/api/blogs/${blogID}`, 'PUT', {
        blog_title: title,
        blog_body: content,
      });
      // json respon from login POST route
      console.log(data, 'data');
      if (data.success) {
        window.location.replace('/');
      } else {
        console.log('Failed to update content');
      }
    } catch (error) {
      console.log('Failed to update content', error);
    }
  } else {
    console.log('Failed to update content');
  }
};
editBlogButton.addEventListener('submit', handleEditBlog);
