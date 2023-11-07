import { useState } from "react";
import "../../styles/style.css";
import PropTypes from "prop-types";

const Blog = ({ blog, addLikes, loggedInUser, removeBlog }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const { id, title, author, url, likes, user } = blog;

  const blogDetailsStyle = `Blog--${
    detailsVisible ? "full-view" : "collapsed-view"
  }`;

  const handleLikesClick = () => {
    const updatedBlog = {
      ...blog,
      likes: likes + 1,
    };

    addLikes(id, updatedBlog);
  };

  return (
    <article className="Blog">
      <h3>
        {`${title} by ${author}`}

        <button
          type="button"
          onClick={() => setDetailsVisible(!detailsVisible)}
        >
          {detailsVisible ? "hide" : "view"}
        </button>
      </h3>

      <div className={blogDetailsStyle}>
        <p>{url}</p>
        <div>
          {`likes ${likes}`}{" "}
          <button type="button" onClick={handleLikesClick}>
            like
          </button>
        </div>
        <p>{user.name}</p>

        {loggedInUser === user.username && (
          <button
            type="button"
            onClick={() => removeBlog(id, { title, author })}
          >
            remove
          </button>
        )}
      </div>
    </article>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  addLikes: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
};

export default Blog;
