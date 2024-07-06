import axios, { AxiosInstance } from "axios";

const baseUrl = process.env.REACT_APP_API_URL;

const Api: AxiosInstance = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
});



export default Api;