import { useDrag } from "react-dnd";
import { useAppState } from "./useAppState";
import { DragItem } from "../DragItem";
import { setDraggedItem } from "../context/actions";
import { useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";

export default function useDragItem(item: DragItem) {
  const { dispatch } = useAppState();
  const [, drag, preview] = useDrag({
    type: item.type,
    item: () => {
      dispatch(setDraggedItem(item));
      return item;
    },
    end: () => dispatch(setDraggedItem(null)),
  });

  useEffect(() => {
    preview(getEmptyImage(), { captureDraggingState: true });
  }, [preview]);

  return { drag };
}
