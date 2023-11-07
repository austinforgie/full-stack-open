const { totalLikes } = require("../utils/list-helper");
const {
  listOfBlogs,
  listWithOneBlog,
  singleBlogLikes,
  multiBlogLikes,
} = require("./testData");

describe("totalLikes function", () => {
  test("returns 0 for an empty list", () => {
    expect(totalLikes([])).toBe(0);
  });

  test("calculates likes for a single-blog list", () => {
    expect(totalLikes(listWithOneBlog)).toBe(singleBlogLikes);
  });

  test("calculates the total likes for a multi-blog list", () => {
    expect(totalLikes(listOfBlogs)).toBe(multiBlogLikes);
  });
});
