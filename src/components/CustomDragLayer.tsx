import { useDragLayer } from "react-dnd";
import { useAppState } from "../hooks/useAppState";
import { CustomDragLayerContainer, DragPreviewWrapper } from "../styles";
import Column from "../Column";
import Card from "../Card";

export default function CustomDragLayer() {
  const { draggedItem } = useAppState();
  const { currentOffset } = useDragLayer((monitor) => ({
    currentOffset: monitor.getSourceClientOffset(),
  }));

  return draggedItem && currentOffset ? (
    <CustomDragLayerContainer>
      <DragPreviewWrapper position={currentOffset}>
        {draggedItem.type === "COLUMN" ? (
          <Column
            id={draggedItem.id}
            text={draggedItem.text}
            isPreview={true}
          />
        ) : (
          <Card
            id={draggedItem.id}
            text={draggedItem.text}
            columnId={draggedItem.columnId}
            isPreview={true}
          />
        )}
      </DragPreviewWrapper>
    </CustomDragLayerContainer>
  ) : null;
}
