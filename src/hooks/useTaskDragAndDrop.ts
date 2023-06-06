import { ItemType } from "./../utils/enums";
import { DragItem, taskProps } from "../utils/models";
import { useDrag } from "react-dnd";
import { useRef } from "react";

export function useTaskDragAndDrop<T extends HTMLElement>({
  task,
  index,
}: {
  task: taskProps;
  index: number;
}) {
  const ref = useRef<T>(null);

  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.TASK,
    item: { from: task.status, id: task.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(ref);

  return {
    ref,
    isDragging,
  };
}
