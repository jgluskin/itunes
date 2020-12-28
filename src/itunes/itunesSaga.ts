import { put, takeLatest } from 'redux-saga/effects';
import { loadedEbooks, loadedMusicVideos, searchEbooks, searchMusicVideos } from "./itunesSlice";
import * as yup from 'yup';
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { Ebook, ebookSchema, generateItunesResultsSchema, musicVideoSchema } from './types';

async function fetchData<Schema extends yup.AnySchema<any, any, any>>(url: string, schema: Schema) {
  const response = await fetch(url)
  const data = await response.json();

  const responseSchema = generateItunesResultsSchema(schema);

  const { results } = await responseSchema.validate(data);

  return results;
}

async function fetchEbooks(searchTerm: string) {
  return fetchData(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=ebook`, ebookSchema);
}

async function fetchMusicVideos(searchTerm: string) {
  return fetchData(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=musicVideo`, musicVideoSchema);
}

type PayloadActionFromCreator<AC> = AC extends ActionCreatorWithPayload<infer P> ? PayloadAction<P> : never;

function* onSearchEbooks(action: PayloadActionFromCreator<typeof searchEbooks>) {
  const ebooks: Ebook[] = yield fetchEbooks(action.payload);
  yield put(loadedEbooks(ebooks))
}

function* onSearchMusicVideos(action: PayloadActionFromCreator<typeof searchEbooks>) {
  const musicVideos = yield fetchMusicVideos(action.payload);
  yield put(loadedMusicVideos(musicVideos))
}

export function* itunesSaga() {
  yield takeLatest(searchEbooks.type, onSearchEbooks);
  yield takeLatest(searchMusicVideos.type, onSearchMusicVideos);
}
