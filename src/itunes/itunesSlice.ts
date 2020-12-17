import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../store";
import { Ebook } from "./itunesSaga";

const itunesSlice = createSlice({
  name: 'itunes',
  initialState: {
    ebooks: [] as Ebook[],
  },
  reducers: {
    searchEbooks(state, action: PayloadAction<string>) {
      console.log('searchEbooks');
    },
    loadedEbooks(state, action: PayloadAction<Ebook[]>) {
      state.ebooks = action.payload;
    }
  }
});

export const { searchEbooks, loadedEbooks } = itunesSlice.actions;

export const selectItunesEbooks = (state: StoreState) => state.itunes.ebooks;

export const itunesReducer = itunesSlice.reducer;
