import axios from "axios";

const fetchAllUsers = () => {
  return axios.get("https://jsonplaceholder.typicode.com/users");
};

export { fetchAllUsers };
