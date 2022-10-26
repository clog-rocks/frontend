import axios from "axios";

// Set up Axios instance.
export default axios.create({
  baseURL: "http://localhost:8000/",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
