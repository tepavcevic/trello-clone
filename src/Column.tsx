import AddNewItem from "./AddNewButton";
import Card from "./Card";
import { useAppState } from "./hooks/useAppState";
import { ColumnContainer, ColumnTitle } from "./styles";

type ColumnProps = {
  id: string;
  text: string;
};

export default function Column({ id, text }: ColumnProps) {
  const { getTasksByListId } = useAppState();

  const tasks = getTasksByListId(id);

  return (
    <ColumnContainer>
      <ColumnTitle>{text}</ColumnTitle>
      {tasks.map((task) => (
        <Card key={id} id={id} text={task.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add new card"
        onAdd={() => console.log(" new card added")}
        dark={true}
      />
    </ColumnContainer>
  );
}
