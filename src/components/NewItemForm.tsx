import { ChangeEvent, KeyboardEvent, useState } from "react";
import { NewItemButton, NewItemFormContainer, NewItemInput } from "../styles";
import useFocus from "../hooks/useFocus";

type NewItemFormProps = {
  onAdd(text: string): void;
};

export default function NewItemForm({ onAdd }: NewItemFormProps) {
  const [text, setText] = useState<string>("");
  const { inputRef } = useFocus();

  function handleChangeText(event: ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleAddText(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter") onAdd(text);
  }

  return (
    <NewItemFormContainer>
      <NewItemInput
        value={text}
        ref={inputRef}
        onChange={handleChangeText}
        onKeyDown={handleAddText}
      />
      <NewItemButton onClick={() => onAdd(text)}>Create</NewItemButton>
    </NewItemFormContainer>
  );
}
