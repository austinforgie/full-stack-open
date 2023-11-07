const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../model/user");

userRouter.get("/", async (_, response) => {
  const users = await User.find({}).populate("blogs", {
    url: 1,
    title: 1,
    author: 1,
  });

  response.json(users);
});

userRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  if (!password || password.length < 3) {
    return response
      .status(400)
      .json({ error: "password must be at least 3 characters long" });
  }

  const SALT_ROUNDS = 10;
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

  const user = new User({ username, name, passwordHash });
  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = userRouter;
