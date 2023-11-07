const { mostLikes } = require("../utils/list-helper");
const { listOfBlogs, authorWithMostLikes } = require("./testData");

test("should return the author with the most amount of likes", () => {
  expect(mostLikes(listOfBlogs)).toEqual(authorWithMostLikes);
});
