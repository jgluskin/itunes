import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../store";
import { Ebook, MusicVideo } from "./types";

const itunesSlice = createSlice({
  name: 'itunes',
  initialState: {
    ebooks: [] as Ebook[],
    musicVideos: [] as MusicVideo[],
  },
  reducers: {
    searchEbooks(state, action: PayloadAction<string>) {
      console.log('searchEbooks');
    },
    loadedEbooks(state, action: PayloadAction<Ebook[]>) {
      state.ebooks = action.payload;
    },
    searchMusicVideos(state, action: PayloadAction<string>) {
      console.log('searchMusicVideos');
    },
    loadedMusicVideos(state, action: PayloadAction<MusicVideo[]>) {
      state.musicVideos = action.payload;
    }
  }
});

export const { searchEbooks, loadedEbooks, searchMusicVideos, loadedMusicVideos } = itunesSlice.actions;

export const selectItunesEbooks = (state: StoreState) => state.itunes.ebooks;
export const selectItunesMusicVideos = (state: StoreState) => state.itunes.musicVideos;

export const itunesReducer = itunesSlice.reducer;
