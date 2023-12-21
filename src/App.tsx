import AddNewItem from "./components/AddNewButton";
import Column from "./Column";
import { useAppState } from "./hooks/useAppState";
import { AppContainer } from "./styles";
import { addList } from "./context/actions";

function App() {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      {lists.map((list) => (
        <Column key={list.id} id={list.id} text={list.text} />
      ))}
      <AddNewItem
        toggleButtonText="+ Add another list"
        onAdd={(text) => dispatch(addList(text))}
      />
    </AppContainer>
  );
}

export default App;
