import { getEnvVar } from "./env";

export const API_BASE_URL = getEnvVar("VITE_API_BASE_URL");
export const API_USERS = getEnvVar("VITE_API_USERS");
export const API_AUTH = getEnvVar("VITE_API_AUTH");

export const YT_API_KEY = getEnvVar("VITE_YOUTUBE_API_KEY");
export const YT_API_BASE_URL = getEnvVar("VITE_YOUTUBE_API_BASE_URL");
