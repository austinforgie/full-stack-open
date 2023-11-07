const blogRouter = require("express").Router();
const Blog = require("../model/blog");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const body = request.body;

  if (!body.url || !body.title) return response.status(400).end();

  const user = request.user;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user.id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", userExtractor, async (request, response) => {
  const foundBlog = await Blog.findById(request.params.id);

  if (!foundBlog) {
    return response.status(404).json({ error: "blog not found" });
  }

  const user = request.user;

  if (foundBlog.user.toString() === user.id.toString()) {
    await Blog.deleteOne({ _id: foundBlog.id });
  } else return response.status(401).end();

  user.blogs = user.blogs.filter(
    (userBlog) => userBlog.id.toString() !== foundBlog.id.toString()
  );

  await user.save();

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const updateOperation = { likes: request.body.likes };
  const returnUpdated = { new: true };

  const updatedBlog = await Blog.findByIdAndUpdate(
    { _id: request.params.id },
    updateOperation,
    returnUpdated
  );

  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
