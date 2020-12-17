import { configureStore, Store } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counterSlice";
import createSagaMiddleware from 'redux-saga';
import { counterSaga } from "./counter/counterSaga";
import { all } from 'redux-saga/effects';
import { itunesReducer } from "./itunes/itunesSlice";
import { itunesSaga } from "./itunes/itunesSaga";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    itunes: itunesReducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(function* () {
  yield all([itunesSaga(), counterSaga()]);
});

type GetStoreState<S> = S extends Store<infer State, any> ? State : unknown;

export type StoreState = GetStoreState<typeof store>;
