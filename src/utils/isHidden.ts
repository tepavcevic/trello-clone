import { DragItem } from "../DragItem";

export function isHidden(
  draggedItem: DragItem | null,
  itemType: string,
  id: string
) {
  return Boolean(
    draggedItem && draggedItem?.type === itemType && draggedItem.id === id
  );
}
