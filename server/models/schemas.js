const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  id: { type: String },
  title: { type: String, require: true },
  body: { type: String, require: true },
  author: { type: String }
}, { collection: 'blogs' });

const userSchema = new Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true }
})

const Blogs = mongoose.model('Blogs', blogSchema, 'blogs');
const Users = mongoose.model('Users', userSchema, 'users');
const mySchemas = { 'Users': Users, 'Blogs': Blogs };

module.exports = mySchemas;