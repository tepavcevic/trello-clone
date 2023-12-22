import AddNewItem from "./components/AddNewButton";
import Card from "./Card";
import { useAppState } from "./hooks/useAppState";
import { ColumnContainer, ColumnTitle } from "./styles";
import { addTask, moveList } from "./context/actions";
import { useRef } from "react";
import useDragItem from "./hooks/useDragItem";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from "./utils/isHidden";

type ColumnProps = {
  text: string;
  id: string;
  isPreview?: boolean;
};

export default function Column({ text, id, isPreview = false }: ColumnProps) {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) {
        return;
      }
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) {
          return;
        }

        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  const { drag } = useDragItem({ type: "COLUMN", id, text });

  drag(drop(ref));

  return (
    <ColumnContainer
      $isPreview={isPreview}
      ref={ref}
      $isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}
    >
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card text={task.text} key={task.id} id={task.id} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another card"
        onAdd={(text) => dispatch(addTask(text, id))}
        $dark
      />
    </ColumnContainer>
  );
}
