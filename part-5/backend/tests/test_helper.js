const Blog = require("../model/blog");
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { initialBlogs } = require("./test_data");

const getObjectsFromModel = async (model) => {
  const models = {
    Blog,
    User,
  };

  if (!models[model]) {
    throw new Error(`model ${model} not found`);
  }

  const foundObjects = await models[model].find({});
  return foundObjects.map((object) => object.toJSON());
};

const initializeDb = async () => {
  await User.deleteMany({});
  await Blog.deleteMany({});

  const PLAINTEXT_PASSWORD = "sQl7nk";
  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(PLAINTEXT_PASSWORD, SALT_ROUNDS);

  const initialUser = new User({
    username: "juser1",
    name: "Jest User 1",
    passwordHash,
    blogs: [],
  });

  const savedUser = await initialUser.save();

  const blogObjects = initialBlogs.map(
    (blog) =>
      new Blog({
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: savedUser._id,
      })
  );

  const savedBlogs = await Promise.all(blogObjects.map((blog) => blog.save()));
  const savedBlogIds = savedBlogs.map((blog) => blog._id);

  savedUser.blogs = savedUser.blogs.concat(savedBlogIds);

  await savedUser.save();
};

const generateFirstUserToken = async () => {
  const usersFromDb = await getObjectsFromModel("User");
  const firstUserFromDb = usersFromDb[0];

  return jwt.sign(firstUserFromDb, process.env.SECRET);
};

module.exports = { initializeDb, getObjectsFromModel, generateFirstUserToken };
