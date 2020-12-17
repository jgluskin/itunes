import { put, takeLatest } from 'redux-saga/effects';
import { loadedEbooks, searchEbooks } from "./itunesSlice";
import * as yup from 'yup';
import { ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";

const ebookSchema = yup.object({
  trackId: yup.number().defined(),
  formattedPrice: yup.string().defined(),
  trackName: yup.string().defined(),
  artworkUrl60: yup.string().defined(),
}).defined();

export type Ebook = yup.InferType<typeof ebookSchema>;

async function fetchEbooks(searchTerm: string) {
  const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=ebook`)
  const data = await response.json();

  const responseSchema = yup.object({
    resultCount: yup.number().defined(),
    results: yup.array(ebookSchema),
  });

  return (await responseSchema.validate(data)).results;
}

type PayloadActionFromCreator<AC> = AC extends ActionCreatorWithPayload<infer P> ? PayloadAction<P> : never;

function* onSearchEbooks(action: PayloadActionFromCreator<typeof searchEbooks>) {
  const ebooks = yield fetchEbooks(action.payload);
  yield put(loadedEbooks(ebooks))
}

export function* itunesSaga() {
  yield takeLatest(searchEbooks.type, onSearchEbooks);
}
