import { useCallback, useState } from "react";
import youtubeAPI from "../../../api/youtube";
import { message } from "antd";
import { setSearchResults } from "../../../store/slices/searchSlice";

export default function useYouTubeSearch(query, dispatch) {
  const [loading, setLoading] = useState(false);

  const fetchVideos = useCallback(
    async (params) => {
      setLoading(true);

      try {
        const { data } = await youtubeAPI.get("/search", { params });
        const items = data.items || [];

        if (items.length === 0) {
          dispatch(setSearchResults({ query: params.q, videos: [] }));
          return;
        }

        const ids = items.map((v) => v.id.videoId).join(",");

        const { data: statsData } = await youtubeAPI.get("/videos", {
          params: { id: ids, part: "statistics" },
        });

        const statsMap = Object.fromEntries(
          statsData.items.map((s) => [s.id, s.statistics.viewCount])
        );

        const enriched = items.map((v) => ({
          ...v,
          viewCount: statsMap[v.id.videoId],
        }));

        dispatch(setSearchResults({ query: params.q, videos: enriched }));
      } catch (e) {
        message.error("Не удалось загрузить видео");
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  const handleSearch = useCallback(() => {
    if (!query.trim()) return;

    fetchVideos({
      q: query,
      maxResults: 12,
      part: "snippet",
      type: "video",
    });
  }, [query, fetchVideos]);

  const runSearch = useCallback(
    (q, order, maxResults) => {
      const params = {
        q,
        maxResults: Number(maxResults) || 12,
        part: "snippet",
        type: "video",
      };

      if (order && order.trim() !== "") {
        params.order = order;
      }

      fetchVideos(params);
    },
    [fetchVideos]
  );

  return { loading, handleSearch, runSearch };
}
