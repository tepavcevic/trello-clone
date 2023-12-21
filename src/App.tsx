import AddNewItem from "./AddNewButton";
import Column from "./Column";
import { useAppState } from "./hooks/useAppState";
import { AppContainer } from "./styles";

function App() {
  const { lists } = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column key={list.id} id={list.id} text={list.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={() => console.log("new list item created ")}
      />
    </AppContainer>
  );
}

export default App;
