import { useDrop } from 'react-dnd';
import { ColumnType, ItemType } from '../utils/enums';
import { DropItem, taskProps } from '../utils/models';

function useColumnDrop(
  column: ColumnType,
  handleDrop: (toColumn: ColumnType, taskId: taskProps['id']) => void,
) {
  const [{ isOver }, dropRef] = useDrop<DropItem, void, { isOver: boolean }>({
    accept: ItemType.TASK,
    drop: (dragItem) => {
      if (!dragItem || dragItem.to === column) {
        return;
      }

      handleDrop(column, dragItem.id);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return {
    isOver,
    dropRef,
  };
}

export default useColumnDrop;