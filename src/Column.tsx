import AddNewItem from "./components/AddNewButton";
import Card from "./Card";
import { useAppState } from "./hooks/useAppState";
import { ColumnContainer, ColumnTitle } from "./styles";
import { addTask } from "./context/actions";

type ColumnProps = {
  id: string;
  text: string;
};

export default function Column({ id, text }: ColumnProps) {
  const { getTasksByListId, dispatch } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={id} id={id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add new card"
        onAdd={(text) => dispatch(addTask(text, id))}
        dark={true}
      />
    </ColumnContainer>
  );
}
