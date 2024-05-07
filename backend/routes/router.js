const express = require('express')
const router = express.Router()
const schemas = require('../models/schemas')

router.get('/blogs', async (req, res) => {
  const blogsData = await schemas.Blogs.find({}).exec()

  if (blogsData) {
    res.json(blogsData)
  }
})

router.post('/blogs', async (req, res) => {
  const { title, body, author, date } = req.body

  const newBlog = new schemas.Blogs({ title: title, body: body, author: author, date: date })
  const saveBlog = await newBlog.save()

  if (saveBlog) {
    res.send('Blog added')
  } else {
    res.send('Failed. Blog not added')
  }

  res.end()
})

// ----------- Users----------------

router.get('/users', async (req, res) => {
  const usersData = await schemas.Users.find({}).exec()

  if (usersData) {
    res.json(usersData)
  }
})

router.get('/users/:username', async (req, res) => {

  const userData = await schemas.Users.findOne({ username: req.params.username }).exec();

  res.json(userData)
})

router.post('/users', async (req, res) => {
  const { username, fullName, password, recoveryAnswer, recoveryQuestion, role } = req.body

  const newUser = new schemas.Users({
    username: username, fullName: fullName, password: password,
    recoveryAnswer: recoveryAnswer, recoveryQuestion: recoveryQuestion,
    role: role
  })
  const saveUser = await newUser.save()

  if (saveUser) {
    res.send('User created')
  } else {
    res.send('Failed. User not created')
  }

  res.end()
})

router.put('/users/:username', async (req, res) => {

  const { password, fullName } = req.body;
  const filter = { username: req.params.username };

  if (password) {
    const update = { password: password };

    const updateUser = await schemas.Users.findOneAndUpdate(filter, update);

    if (updateUser) {
      res.send('User updated')
    } else {
      res.send('Failed. User not updated')
    }
  }

  if (fullName) {
    const update = { fullName: fullName };

    const updateUser = await schemas.Users.findOneAndUpdate(filter, update);

    if (updateUser) {
      res.send('User updated')
    } else {
      res.send('Failed. User not updated')
    }
  }

  res.end()
})

router.delete('/users/:username', async (req, res) => {
  const filter = { username: req.params.username };

  await schemas.Users.findOneAndDelete(filter);

})

module.exports = router