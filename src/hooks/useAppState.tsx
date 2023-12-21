import { useContext } from "react";
import { AppStateContext } from "../context/AppContext";

export function useAppState() {
  return useContext(AppStateContext);
}
