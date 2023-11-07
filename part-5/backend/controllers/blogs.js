const blogRouter = require("express").Router();
const Blog = require("../model/blog");
const { userExtractor } = require("../utils/middleware");

blogRouter.get("/", async (_, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });

  response.json(blogs);
});

blogRouter.post("/", userExtractor, async (request, response) => {
  const { title, author, url, likes } = request.body;

  if (!url || !title) return response.status(400).end();

  const user = request.user;

  if (!user) return response.status(401).json({ error: "invalid user" });

  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user.id,
  });

  let savedBlog = await blog.save();
  savedBlog = await savedBlog.populate("user", { username: 1, name: 1 });

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

  // 'toString()' is invoked on the 'ObjectId' (BSON) type
  if (!user || foundBlog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: "invalid user" });
  }

  user.blogs = user.blogs.filter(
    (userBlog) => userBlog.toString() !== foundBlog.id.toString()
  );

  await user.save();
  await Blog.deleteOne({ _id: foundBlog.id });

  response.status(204).end();
});

blogRouter.put("/:id", async (request, response) => {
  const updateOperation = { likes: request.body.likes };
  const returnUpdated = { new: true };

  let updatedBlog = await Blog.findByIdAndUpdate(
    { _id: request.params.id },
    updateOperation,
    returnUpdated
  );

  updatedBlog = await updatedBlog.populate("user", { username: 1, name: 1 });

  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
