const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const { initialBlogs } = require("./test_data");
const {
  getObjectsFromModel,
  initializeDb,
  generateFirstUserToken,
} = require("./test_helper");
const jwt = require("jsonwebtoken");
const {
  blogWithoutTitle,
  blogWithoutURL,
  userWithoutUsername,
  userWithInvalidUsername,
  userWithoutPassword,
  userWithInvalidPassword,
  validUser,
  nonUniqueUser,
  statusCodes: {
    HTTP_OK,
    HTTP_CREATED,
    HTTP_NO_CONTENT,
    HTTP_BAD_REQUEST,
    HTTP_UNAUTHORIZED,
  },
} = require("./test_data");

const API = supertest(app);

beforeEach(async () => await initializeDb());

describe("Blog API", () => {
  test("should return a list of blogs in JSON format with a 200 status", async () => {
    const blogs = await API.get("/api/blogs")
      .expect(HTTP_OK)
      .expect("Content-Type", /application\/json/);

    expect(blogs.body).toHaveLength(initialBlogs.length);
  });

  test("should return blogs with a defined unique identifier", async () => {
    const blogs = await getObjectsFromModel("Blog");

    blogs.forEach((blog) => expect(blog.id).toBeDefined());
  });

  describe("with valid authentication", () => {
    describe("when creating new blogs", () => {
      test("should add a new blog entry to the database with a 201 status", async () => {
        const token = await generateFirstUserToken();
        const firstUserFromDb = jwt.verify(token, process.env.SECRET);

        const validBlog = {
          title: "Introducing react.dev",
          author: "Dan Abramov and Rachel Nabors",
          url: "https://react.dev/blog/2023/03/16/introducing-react-dev",
          likes: 21,
          user: firstUserFromDb.id,
        };

        await API.post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(validBlog)
          .expect(HTTP_CREATED)
          .expect("Content-Type", /application\/json/);

        const blogs = await getObjectsFromModel("Blog");
        expect(blogs).toHaveLength(initialBlogs.length + 1);

        const titles = blogs.map((blog) => blog.title);
        expect(titles).toContain(validBlog.title);
      });

      test("should default the likes property to 0 when not provided", async () => {
        const token = await generateFirstUserToken();
        const firstUserFromDb = jwt.verify(token, process.env.SECRET);

        const blogWithoutLikes = {
          title: "Introducing react.dev",
          author: "Dan Abramov and Rachel Nabors",
          url: "https://react.dev/blog/2023/03/16/introducing-react-dev",
          user: firstUserFromDb.id,
        };

        const {
          body: { likes },
        } = await API.post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(blogWithoutLikes)
          .expect(HTTP_CREATED)
          .expect("Content-Type", /application\/json/);

        expect(likes).toBeDefined();
        expect(likes).toBe(0);
      });

      test("should return a 400 status when the blog is missing a title", async () => {
        const token = await generateFirstUserToken();

        await API.post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(blogWithoutTitle)
          .expect(HTTP_BAD_REQUEST);
      });

      test("should return a 400 status when the blog is missing a URL", async () => {
        const token = await generateFirstUserToken();

        await API.post("/api/blogs")
          .set("Authorization", `Bearer ${token}`)
          .send(blogWithoutURL)
          .expect(HTTP_BAD_REQUEST);
      });
    });

    describe("when deleting blogs", () => {
      test("should remove a blog resource with a 204 status", async () => {
        const token = await generateFirstUserToken();
        const user = jwt.verify(token, process.env.SECRET);

        const blogsBefore = user.blogs;
        const blogToDelete = blogsBefore[0];

        await API.delete(`/api/blogs/${blogToDelete}`)
          .set("Authorization", `Bearer ${token}`)
          .expect(HTTP_NO_CONTENT);

        const blogsAfter = await getObjectsFromModel("Blog");
        expect(blogsAfter).toHaveLength(blogsBefore.length - 1);

        const IDs = blogsAfter.map((blog) => blog.id);
        expect(IDs).not.toContain(blogToDelete.id);
      });
    });
  });

  describe("with invalid authentication", () => {
    test("should return a 401 status when creating a new blog", async () => {
      const users = await getObjectsFromModel("User");
      const firstUserFromDb = users[0];

      const validBlog = {
        title: "Introducing react.dev",
        author: "Dan Abramov and Rachel Nabors",
        url: "https://react.dev/blog/2023/03/16/introducing-react-dev",
        likes: 21,
        user: firstUserFromDb.id,
      };

      await API.post("/api/blogs").send(validBlog).expect(HTTP_UNAUTHORIZED);
    });

    test("should return a 401 status when deleting a blog", async () => {
      const blogs = await getObjectsFromModel("Blog");
      const blogToDelete = blogs[0];

      await API.delete(`/api/blogs/${blogToDelete.id}`).expect(
        HTTP_UNAUTHORIZED
      );
    });
  });

  describe("when updating blogs", () => {
    test("should update the likes property of a blog with a 200 status", async () => {
      const blogs = await getObjectsFromModel("Blog");
      const blogToUpdate = blogs[0];

      blogToUpdate.likes += 5;

      const response = await API.put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(HTTP_OK)
        .expect("Content-Type", /application\/json/);

      expect(response.body.likes).toBe(blogToUpdate.likes);
    });
  });

  describe("user operations", () => {
    describe("when validating usernames", () => {
      test("should return a 400 status when the username is not provided", async () => {
        await API.post("/api/users")
          .send(userWithoutUsername)
          .expect(HTTP_BAD_REQUEST);
      });

      test("should return a 400 status when the username is less than 3 characters", async () => {
        await API.post("/api/users")
          .send(userWithInvalidUsername)
          .expect(HTTP_BAD_REQUEST);
      });

      test("should return a 400 status when the username is not unique", async () => {
        await API.post("/api/users").send(validUser);
        await API.post("/api/users")
          .send(nonUniqueUser)
          .expect(HTTP_BAD_REQUEST);
      });
    });

    describe("when validating passwords", () => {
      test("should return a 400 status when the password is not provided", async () => {
        await API.post("/api/users")
          .send(userWithoutPassword)
          .expect(HTTP_BAD_REQUEST);
      });

      test("should return a 400 status when the password is less than 3 characters", async () => {
        await API.post("/api/users")
          .send(userWithInvalidPassword)
          .expect(HTTP_BAD_REQUEST);
      });
    });
  });

  afterAll(async () => await mongoose.connection.close());
});
