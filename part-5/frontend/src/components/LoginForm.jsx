import { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";
import InputField from "./InputField";
import PropTypes from "prop-types";

const LoginForm = ({ handleUserChange, notify }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const loggedInUser = await loginService.login({
        username,
        password,
      });

      localStorage.setItem(
        "loggedInBloglistUser",
        JSON.stringify(loggedInUser)
      );

      blogService.setToken(loggedInUser.token);

      handleUserChange(loggedInUser);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        notify("wrong credentials");
      } else notify("network error has occurred");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>log into application</h2>
      <fieldset>
        <InputField label="username" value={username} onChange={setUsername} />
        <InputField
          type="password"
          label="password"
          value={password}
          onChange={setPassword}
        />
      </fieldset>
      <button type="submit">login</button>
    </form>
  );
};

LoginForm.propTypes = {
  handleUserChange: PropTypes.func.isRequired,
  notify: PropTypes.func.isRequired,
};

export default LoginForm;
