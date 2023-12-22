import { useRef } from "react";
import { useAppState } from "./hooks/useAppState";
import { CardContainer } from "./styles";
import { isHidden } from "./utils/isHidden";
import useDragItem from "./hooks/useDragItem";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { moveTask, setDraggedItem } from "./context/actions";

type CardProps = {
  id: string;
  text: string;
  columnId: string;
  isPreview?: boolean;
};

export default function Card({
  id,
  text,
  columnId,
  isPreview = false,
}: CardProps) {
  const { draggedItem, dispatch } = useAppState();
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useDragItem({
    type: "CARD",
    id,
    text,
    columnId,
  });
  const [, drop] = useDrop({
    accept: "CARD",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type !== "CARD") {
        return;
      }
      if (draggedItem.id === id) {
        return;
      }

      dispatch(moveTask(draggedItem.id, id, draggedItem.columnId, columnId));
      dispatch(setDraggedItem({ ...draggedItem, columnId }));
    }),
  });

  drag(drop(ref));

  return (
    <CardContainer
      $isPreview={isPreview}
      ref={ref}
      $isHidden={isHidden(draggedItem, "CARD", id, isPreview)}
    >
      {text}
    </CardContainer>
  );
}
