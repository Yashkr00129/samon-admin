import axios from "axios";

const __DEV__ = document.domain === "localhost";

export default axios.create({
  baseURL: __DEV__
    ? "http://localhost:8000/api/"
    : "http://3.111.219.243:8000/api/",
  headers: {
    "Content-type": "application/json",
  },
});
