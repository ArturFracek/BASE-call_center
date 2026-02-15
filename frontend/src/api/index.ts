import axios from "axios";
import { DEFAULT_API_BASE_URL, ENV_KEYS } from "@/constants";

const baseURL =
  import.meta.env[ENV_KEYS.VITE_API_URL] ?? DEFAULT_API_BASE_URL;

export const api = axios.create({
  baseURL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});
