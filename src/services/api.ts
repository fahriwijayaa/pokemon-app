import axios from "axios";

let bearerToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZDI1ZmIwZDRlOTJmOTZhMjZmZTkwYWE3N2ZiZTA0ZSIsIm5iZiI6MTc1ODI2NDkyOC4wMTQwMDAyLCJzdWIiOiI2OGNjZmU2MDFkNmUzZTNjODNjZjQ5NDkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.fqP4QK_3KZPLZuHDwhtBH_aM-K7pUsKiJpypO9cNeDY";

const API = axios.create();

export const setAxiosConfig = (token: string) => {
  // bearerToken = token;
};

API.interceptors.request.use((axiosConfig) => {
  axiosConfig.baseURL = import.meta.env.VITE_BASE_URL;
  axiosConfig.headers.Authorization = `Bearer ${bearerToken}`;

  return axiosConfig;
});

export default API;
