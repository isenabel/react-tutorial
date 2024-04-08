const express = require('express');
const router = express.Router();
const schemas = require('../models/schemas');

router.post('/blogs', async (req, res) => {
  const { title, body, author } = req.body;

  const newBlog = new schemas.Blogs({
    title: title,
    body: body,
    author: author
  });

  const postBlog = await newBlog.save();

  if (postBlog) {
    res.send('Blog added. Thank you');
  } else {
    res.send('Failed to add.');
  }

  res.end();
})

router.get('/blogs', async (req, res) => {
  const blogs = schemas.Blogs;

  const blogsData = await blogs.find({});

  if (blogsData) {
    res.send(JSON.stringify(blogsData));
  }

});

module.exports = router;