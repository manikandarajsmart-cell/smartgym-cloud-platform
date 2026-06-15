import axios from "axios";

const api = axios.create({
 baseURL: "https://api.smartgym.cloud/api",
});

export default api;
