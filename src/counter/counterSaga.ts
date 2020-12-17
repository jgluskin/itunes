import { incCount } from "./counterSlice";
import { takeLatest } from 'redux-saga/effects';

async function wait(ms: number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  })
}

export function* onIncCount() {
  console.log('onIncCount');
  yield wait(3000);
  console.log('state after onIncCount');
}

export function* counterSaga() {
  yield takeLatest(incCount.type, onIncCount);
}
