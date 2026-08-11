import axios from "axios";

export const API_BASE =
  "https://streaming-rayliziie-official.rayyankrens0304.workers.dev";

const client = axios.create({
  baseURL: API_BASE,
  timeout: 25000,
  headers: { Accept: "application/json" },
});

export default client;
