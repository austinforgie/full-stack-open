import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog/Blog";
import LoginForm from "./components/LoginForm";
import CreateBlogForm from "./components/CreateBlogForm/CreateBlogForm";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import useNotification from "./hooks/useNotification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, notify] = useNotification();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUserJSON = localStorage.getItem("loggedInBloglistUser");

    if (loggedInUserJSON) {
      const loggedInUser = JSON.parse(loggedInUserJSON);

      setUser(loggedInUser);
      blogService.setToken(loggedInUser.token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInBloglistUser");

    setUser(null);
    blogService.setToken(null);
  };

  const incrementBlogLikes = async (id, blogObject) => {
    const updatedBlog = await blogService.update(id, blogObject);

    setBlogs((prevBlogs) => {
      return prevBlogs.map((blog) =>
        blog.id === updatedBlog.id ? updatedBlog : blog
      );
    });
  };

  const createBlogFormRef = useRef();

  const createBlog = async (blogObject) => {
    createBlogFormRef.current?.toggleVisibility();

    const createdBlog = await blogService.create(blogObject);
    setBlogs((prevBlogs) => [...prevBlogs, createdBlog]);

    notify(`a new blog ${createdBlog.title} by ${createdBlog.author} added`);
  };

  const removeBlog = async (id, { title, author }) => {
    const removalConfirmed = window.confirm(
      `Remove blog ${title} by ${author}`
    );

    if (removalConfirmed) {
      await blogService.remove(id);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
    }
  };

  const renderLoginSection = () => {
    if (user)
      return (
        <>
          <span>{user.username} logged in </span>
          <button type="button" onClick={handleLogout}>
            logout
          </button>
        </>
      );

    return (
      <Togglable buttonLabel="login" ref={createBlogFormRef}>
        <LoginForm user={user} handleUserChange={setUser} notify={notify} />
      </Togglable>
    );
  };

  const renderBlogCreationSection = () =>
    user && (
      <Togglable buttonLabel="create">
        <CreateBlogForm createBlog={createBlog} notify={notify} />
      </Togglable>
    );

  const sortedBlogElements = [...blogs]
    .sort((a, b) => b.likes - a.likes)
    .map((blog) => (
      <Blog
        key={blog.id}
        blog={blog}
        addLikes={incrementBlogLikes}
        loggedInUser={user?.username}
        removeBlog={removeBlog}
      />
    ));

  return (
    <main>
      <h2>blogs</h2>
      {notification && <div role="alert">{notification}</div>}
      {renderLoginSection()}
      {renderBlogCreationSection()}
      {sortedBlogElements}
    </main>
  );
};

export default App;
