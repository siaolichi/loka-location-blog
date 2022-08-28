import axios from "axios";

export default axios.create({
  baseURL: process.env.NODE_ENV === "production" ? "https://loka-location.com" : "/",
  headers: { "X-Custom-Header": "foobar" },
});
