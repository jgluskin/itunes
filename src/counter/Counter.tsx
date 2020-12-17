import { useState } from "react";
import { Button, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { decCount, incCount, selectCount } from "./counterSlice";

export function Counter() {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <Stack direction="row">
      <div>{count}</div>
      <Button colorScheme="green" onClick={() => dispatch(incCount(1))}>+</Button>
      <Button colorScheme="red" onClick={() => dispatch(decCount(1))}>-</Button>
    </Stack>
  );
}
