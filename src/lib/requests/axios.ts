import axios from "axios";
import { PUBLIC_API_URL } from '$env/static/public';

console.log('PUBLIC_API_URL :>> ', PUBLIC_API_URL);
export const Axios = axios.create({
  baseURL: PUBLIC_API_URL,
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
});