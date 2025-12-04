import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

const youtubeAPI = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  params: {
    key: API_KEY,
    part: "snippet",
    type: "video",
  },
});

export default youtubeAPI;
