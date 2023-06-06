import { useState } from "react";
import { Task } from "../Task/Task";
import "./styles.css";
import taskStore from "../../store";
import { reaction } from "mobx";
import { taskProps, BoardProps } from "../../utils/models";
import { ColumnType } from "../../utils/enums";
import { v4 as uuidv4 } from "uuid";
import useColumnDrop from "../../hooks/useColumnDrop";
import { getRandomCardColor } from "../../hooks/getRandomCardColor";

const Board = (props: BoardProps) => {
  const { columnType } = props;
  const [todoTasks, setTodoTasks] = useState<taskProps[]>(
    taskStore.tasks.filter((task) => task.status === columnType)
  );

  const {dropRef, isOver} = useColumnDrop(columnType, taskStore.dropTaskFrom);

  function getTitleColor(type: ColumnType) {
    switch (type) {
      case "Todo":
        return "#f2f2f2";
      case "In Progress":
        return "#B3E5FC";
      case "Blocked":
        return "#EF9A9A";
      case "Completed":
        return "#A5D6A7";
    }
  }

  reaction(
    () => taskStore.tasks,
    (tasks) => {
      const updatedTasks = tasks.filter((task) => task.status === columnType);
      setTodoTasks(updatedTasks);
    }
  );

  return (
    <div className="board">
      <div
        className="title"
        style={{ backgroundColor: getTitleColor(columnType) }}
      >
        {columnType}
      </div>
      <button
        onClick={() => {
          const uniqueKey = uuidv4();
          taskStore.addTask({
            id: uniqueKey,
            title: "Title",
            description: "Description",
            status: columnType,
            color: getRandomCardColor()
          });
        }}
        className="buttonAddTask"
      >
        +
      </button>
      <div ref={dropRef} style={{opacity: isOver ? 0.85 : 1}} className="taskContainer">
        {todoTasks.map((todoTask, index) => {
          return <Task taskProps={todoTask} index={index} key={index} />;
        })}
      </div>
    </div>
  );
};

export default Board;
