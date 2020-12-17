import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StoreState } from "../store";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0,
  },
  reducers: {
    incCount(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    decCount(state, action: PayloadAction<number>) {
      state.count -= action.payload;
    },
  }
});

export const { incCount, decCount } = counterSlice.actions;

export const selectCount = (state: StoreState) => state.counter.count;

export const counterReducer = counterSlice.reducer;
