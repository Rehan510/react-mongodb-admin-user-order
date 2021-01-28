import axios from "axios";
const Instance = axios.create({
  baseURL: "http://localhost:9992",
});

export default Instance;
