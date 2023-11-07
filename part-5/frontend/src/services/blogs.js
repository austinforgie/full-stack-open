import axios from "axios";

const BASE_URL = "http://localhost:3003/api/blogs";
axios.defaults.baseURL = BASE_URL;

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const request = (method, url = "", data, config = {}) => {
  return axios({ url, method, data, ...config })
    .then((response) => response.data)
    .catch((error) => {
      console.error("network error has occurred:", error);
      throw error;
    });
};

const getAll = () => request("get");

const create = (object) => {
  const config = {
    headers: { Authorization: token },
  };

  return request("post", "", object, config);
};

const update = (id, newObject) => request("put", `/${id}`, newObject);

const remove = (id) => {
  const config = {
    headers: { Authorization: token },
  };

  return request("delete", `/${id}`, null, config);
};

export default { setToken, getAll, create, update, remove };
