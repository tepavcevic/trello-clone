import { DragItem } from "../DragItem";

export type Action =
  | { type: "ADD_LIST"; payload: string }
  | { type: "ADD_TASK"; payload: { text: string; listId: string } }
  | {
      type: "MOVE_LIST";
      payload: { draggedId: string; hoverId: string };
    }
  | {
      type: "SET_DRAGGED_ITEM";
      payload: DragItem | null;
    };

export function addTask(text: string, listId: string): Action {
  return { type: "ADD_TASK", payload: { text, listId } };
}

export function addList(text: string): Action {
  return { type: "ADD_LIST", payload: text };
}

export function moveList(draggedId: string, hoverId: string): Action {
  return {
    type: "MOVE_LIST",
    payload: {
      draggedId,
      hoverId,
    },
  };
}

export function setDraggedItem(draggedItem: DragItem): Action {
  return {
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem,
  };
}
