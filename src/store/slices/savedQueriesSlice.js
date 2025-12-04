import { createSlice, nanoid } from "@reduxjs/toolkit";

const savedQueriesSlice = createSlice({
  name: "savedQueries",
  initialState: {
    list: [],
  },
  reducers: {
    addQuery: {
      reducer(state, action) {
        state.list.push(action.payload);
      },
      prepare(data) {
        return {
          payload: {
            id: nanoid(), 
            ...data,
          },
        };
      },
    },
    updateQuery(state, action) {
      const index = state.list.findIndex((q) => q.id === action.payload.id);

      if (index !== -1) {
        state.list[index] = {
          ...state.list[index],
          ...action.payload,
        };
      }
    },
    deleteQuery(state, action) {
      state.list = state.list.filter((q) => q.id !== action.payload);
    },
  },
});

export const { addQuery, updateQuery, deleteQuery } = savedQueriesSlice.actions;
export default savedQueriesSlice.reducer;
