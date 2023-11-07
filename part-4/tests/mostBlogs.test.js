const { mostBlogs } = require("../utils/list-helper");
const { listOfBlogs, authorWithMostBlogs } = require("./testData");

test("should return the author with the most amount of blogs", () => {
  expect(mostBlogs(listOfBlogs)).toEqual(authorWithMostBlogs);
});
