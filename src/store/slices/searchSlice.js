import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  videos: [],
  viewMode: "grid",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchResults: (state, action) => {
      const { query, videos, viewMode } = action.payload;
      state.query = query;
      state.videos = videos;
      state.viewMode = viewMode ?? state.viewMode;
    },
    setQuery: (state, action) => {
      state.query = action.payload;
    },
    setViewMode: (state, action) => {
      state.viewMode = action.payload;
    },
  },
});

export const { setSearchResults, setQuery, setViewMode, clearSearch } =
  searchSlice.actions;
export default searchSlice.reducer;
