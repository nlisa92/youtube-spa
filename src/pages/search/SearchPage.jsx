import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Typography, message, Form } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { addQuery } from "../../store/slices/savedQueriesSlice";
import {
  setQuery,
  setViewMode,
} from "../../store/slices/searchSlice";

import useYouTubeSearch from "./hooks/useYouTubeSearch";
import useSavedQueryLoader from "./hooks/useSavedQueryLoader";

import SearchHeader from "./components/SearchHeader";
import VideoGrid from "./components/VideoGrid";
import VideoList from "./components/VideoList";
import SaveQueryModal from "./components/SaveQueryModal";

import { formatViews } from "../../helpers/formatViews";

const { Title, Text } = Typography;

export default function SearchPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const query = useSelector((state) => state.search.query);
  const viewMode = useSelector((state) => state.search.viewMode);
  const videos = useSelector((state) => state.search.videos);
  const [modalOpen, setModalOpen] = useState(false);

  const [form] = Form.useForm();

  const savedQuery = useSavedQueryLoader(location);
  const { loading, handleSearch, runSearch } = useYouTubeSearch(query, dispatch);

  useEffect(() => {
    if (savedQuery) {
      const queryString =
        typeof savedQuery.query === "string"
          ? savedQuery.query
          : JSON.stringify(savedQuery.query);
      dispatch(setQuery(queryString));

      runSearch(queryString, savedQuery.order, savedQuery.maxResults);
    }
  }, [savedQuery, runSearch, dispatch]);

  useEffect(() => {
    form.setFieldsValue({ query });
  }, [query]);

  return (
    <>
      <Title
        level={2}
        style={{
          textAlign: "center",
          marginBottom: 24,
          color: "#e8eaff",
          fontWeight: 600,
        }}
      >
        Поиск видео 🚀
      </Title>

      <SearchHeader
        query={query}
        setQuery={(q) => dispatch(setQuery(q))}
        loading={loading}
        onSearch={handleSearch}
        openSaveModal={() => setModalOpen(true)}
        viewMode={viewMode}
        setViewMode={(mode) => dispatch(setViewMode(mode))}
      />

      {videos.length > 0 && (
        <Text
          style={{
            display: "block",
            textAlign: "center",
            color: "#d3d6ff",
            marginBottom: 24,
          }}
        >
          Видео по запросу «{query}»
        </Text>
      )}

      {viewMode === "grid" ? (
        <VideoGrid videos={videos} navigate={navigate} formatViews={formatViews} />
      ) : (
        <VideoList videos={videos} navigate={navigate} formatViews={formatViews} />
      )}

      <SaveQueryModal
        open={modalOpen}
        close={() => setModalOpen(false)}
        form={form}
        query={query}
        dispatch={dispatch}
        addQuery={addQuery}
        message={message}
      />
    </>
  );
}
