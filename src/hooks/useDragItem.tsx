import { useDrag } from "react-dnd";
import { useAppState } from "./useAppState";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../context/actions";

export default function useDragItem(item: DragItem) {
  const { dispatch } = useAppState();
  const [, drag] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });

  return { drag };
}
