import AddNewItem from "./components/AddNewButton";
import Card from "./Card";
import { useAppState } from "./hooks/useAppState";
import { ColumnContainer, ColumnTitle } from "./styles";
import { addTask, moveList } from "./context/actions";
import { useRef } from "react";
import useDragItem from "./hooks/useDragItem";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";

type ColumnProps = {
  id: string;
  text: string;
};

export default function Column({ id, text }: ColumnProps) {
  const { draggedItem, getTasksByListId, dispatch } = useAppState();
  const tasks = getTasksByListId(id);
  const ref = useRef<HTMLDivElement>(null);
  const { drag } = useDragItem({ type: "COLUMN", id, text });
  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: throttle(200, () => {
      if (!draggedItem) return;
      if (draggedItem.type === "COLUMN") {
        if (draggedItem.id === id) return;
        dispatch(moveList(draggedItem.id, id));
      }
    }),
  });

  drag(drop(ref));

  return (
    <ColumnContainer ref={ref}>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={id} id={id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add new card"
        onAdd={(text) => dispatch(addTask(text, id))}
        $dark={true}
      />
    </ColumnContainer>
  );
}
