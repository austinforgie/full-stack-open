const { favoriteBlog } = require("../utils/list-helper");
const { listOfBlogs, blogWithMostLikes } = require("./testData");

describe("favoriteBlog function", () => {
  test("throws a type error when list is not an array", () => {
    expect(() => favoriteBlog({})).toThrow(TypeError);
  });

  test("returns the blog with the highest number of likes from a list", () => {
    expect(favoriteBlog(listOfBlogs)).toEqual(blogWithMostLikes);
  });

  test("throws an error when the blog list is empty", () => {
    expect(() => favoriteBlog([])).toThrow();
  });
});
