const singleBlogLikes = 5;
const multiBlogLikes = 36;

const authorWithMostBlogs = { author: "Robert C. Martin", blogs: 3 };
const authorWithMostLikes = { author: "Edsger W. Dijkstra", likes: 17 };

const blogWithMostLikes = {
  _id: "5a422b3a1b54a676234d17f9",
  title: "Canonical string reduction",
  author: "Edsger W. Dijkstra",
  url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
  likes: 12,
  __v: 0,
};

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

const listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: singleBlogLikes,
    __v: 0,
  },
];

const listOfBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

const blogWithoutTitle = {
  author: "Ricky Hanlon",
  url: "https://jestjs.io/blog/2022/05/11/jest-joins-openjs",
  likes: 6,
};

const blogWithoutURL = {
  title: "Jest joins OpenJS Foundation",
  author: "Ricky Hanlon",
  likes: 6,
};

const userWithoutUsername = {
  username: "",
  name: "Jest Testing",
  password: "876F@79%$",
};

const userWithInvalidUsername = {
  username: "je",
  name: "Jest Testing",
  password: "456*9!@",
};

const userWithoutPassword = {
  username: "jtesting45",
  name: "Jest Testing",
  password: "",
};

const userWithInvalidPassword = {
  username: "jtestin92",
  name: "Jest Testing",
  password: "1!",
};

const validUser = {
  username: "jtesting",
  name: "Jest Testing",
  password: "135!",
};

const nonUniqueUser = {
  username: "jtesting",
  name: "JT",
  password: "675%",
};

const statusCodes = {
  HTTP_OK: 200,
  HTTP_CREATED: 201,
  HTTP_NO_CONTENT: 204,
  HTTP_BAD_REQUEST: 400,
  HTTP_UNAUTHORIZED: 401,
};

module.exports = {
  singleBlogLikes,
  multiBlogLikes,
  authorWithMostBlogs,
  authorWithMostLikes,
  blogWithMostLikes,
  initialBlogs,
  listOfBlogs,
  listWithOneBlog,
  blogWithoutTitle,
  blogWithoutURL,
  userWithoutUsername,
  userWithInvalidUsername,
  userWithoutPassword,
  userWithInvalidPassword,
  validUser,
  nonUniqueUser,
  statusCodes,
};
