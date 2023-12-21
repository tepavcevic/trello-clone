import { DragItem } from "../DragItem";
import { Action } from "./actions";
import { findItemIndexById, moveItem } from "../utils/taskItems";

export type Task = {
  id: string;
  text: string;
};

export type List = {
  id: string;
  text: string;
  tasks: Task[];
};

export type AppState = {
  lists: List[];
  draggedItem: DragItem | null;
};

export function appStateReducer(
  draft: AppState,
  action: Action
): AppState | void {
  switch (action.type) {
    case "ADD_LIST": {
      draft.lists.push({
        id: crypto.randomUUID(),
        text: action.payload,
        tasks: [],
      });
      break;
    }
    case "ADD_TASK": {
      const { text, listId } = action.payload;
      const listIndex = findItemIndexById<Task>(draft.lists, listId);

      draft.lists[listIndex].tasks.push({
        id: crypto.randomUUID(),
        text: text,
      });
      break;
    }
    case "MOVE_LIST": {
      const { draggedId, hoverId } = action.payload;
      const dragIndex = findItemIndexById(draft.lists, draggedId);
      const hoverIndex = findItemIndexById(draft.lists, hoverId);
      draft.lists = moveItem(draft.lists, dragIndex, hoverIndex);
      break;
    }
    case "SET_DRAGGED_ITEM": {
      draft.draggedItem = action.payload;
      break;
    }

    default:
      break;
  }
}
