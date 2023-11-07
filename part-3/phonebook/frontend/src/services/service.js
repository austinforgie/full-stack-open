import axios from "axios";

const BASE_URL = "/api/persons";
axios.defaults.baseURL = BASE_URL;

const request = (method, url = "", data) => {
  return axios({ url, method, data })
    .then((response) => response.data)
    .catch((error) => {
      console.error("Network error has occurred:", error);
      throw error;
    });
};

const getAll = () => request("get");
const create = (object) => request("post", "", object);
const remove = (id) => request("delete", `/${id}`);
const update = (id, newObject) => request("put", `/${id}`, newObject);

const service = {
  getAll,
  create,
  remove,
  update,
};

export default service;
