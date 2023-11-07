import { useState } from "react";
import InputField from "../InputField";
import PropTypes from "prop-types";

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const clearFields = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const addBlog = async (event) => {
    event.preventDefault();

    await createBlog({ title, author, url });

    clearFields();
  };

  return (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <fieldset>
        <InputField label="title" value={title} onChange={setTitle} />
        <InputField label="author" value={author} onChange={setAuthor} />
        <InputField label="url" value={url} onChange={setUrl} />
      </fieldset>
      <button type="submit">create</button>
    </form>
  );
};

CreateBlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default CreateBlogForm;
