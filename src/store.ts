import { configureStore, Store } from "@reduxjs/toolkit";
import { counterReducer } from "./counter/counterSlice";
import createSagaMiddleware from 'redux-saga';
import { counterSaga } from "./counter/counterSaga";
import { all } from 'redux-saga/effects';

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(function* () {
  yield all([counterSaga()]);
});

type GetStoreState<S> = S extends Store<infer Bubbble, any> ? Bubbble : unknown;

export type StoreState = GetStoreState<typeof store>;
