import axios from "axios";
import { YT_API_KEY, YT_API_BASE_URL } from "../helpers/apiConfig";

const youtubeAPI = axios.create({
  baseURL: YT_API_BASE_URL,
  params: {
    key: YT_API_KEY,
  },
});

export default youtubeAPI;
