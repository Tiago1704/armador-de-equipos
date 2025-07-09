import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { fetchChampions } from "../slices/championsSlice";

export function useChampions() {
  const dispatch = useDispatch<AppDispatch>();
  const champions = useSelector((state: RootState) => state.champions.champions);
  const status = useSelector((state: RootState) => state.champions.status);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchChampions());
    }
  }, [dispatch, status]);

  return { champions, status };
}
