import dotenv from "dotenv";
dotenv.config();

export const BASE_URL = process.env.VITE_API_URL || "";
export const USERS_URL = "/api/users";
