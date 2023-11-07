const totalLikes = (posts) => {
  return posts.reduce((total, post) => total + post.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (!Array.isArray(blogs)) {
    throw new TypeError("expected an array of blogs");
  }

  if (blogs.length === 0) {
    throw new Error("empty blog list");
  }

  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max));
};

const findEntityOfHighestValue = (list, targets, updateValue = null) => {
  const [targetKey, targetValue] = targets;
  const accumulations = new Map();

  list.forEach((item) => {
    const key = item[targetKey];
    const value = updateValue || item[targetValue];

    accumulations.set(key, (accumulations.get(key) || 0) + value);
  });

  const target = [...accumulations.entries()].reduce(
    (highest, [key, value]) => {
      return value > highest.value ? { key, value } : highest;
    },
    { key: null, value: 0 }
  );

  return { [targetKey]: target.key, [targetValue]: target.value };
};

const mostBlogs = (blogs) => {
  return findEntityOfHighestValue(blogs, ["author", "blogs"], 1);
};

const mostLikes = (blogs) => {
  return findEntityOfHighestValue(blogs, ["author", "likes"]);
};

module.exports = { totalLikes, favoriteBlog, mostBlogs, mostLikes };
