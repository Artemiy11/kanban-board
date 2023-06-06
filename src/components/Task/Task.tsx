import React, { useRef, useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import taskStore from "../../store";
import { taskProps } from "../../utils/models";
import "./styles.css";
import { useTaskDragAndDrop } from "../../hooks/useTaskDragAndDrop";

interface ResizableTextareaProps {
  value: string;
  id: string;
}

interface TaskComponentProps {
  taskProps: taskProps;
  index: number;
}

const Task = (taskComponentProps: TaskComponentProps) => {
  const { taskProps, index } = taskComponentProps;
  const { id, title, description, color } = taskProps;
  const { ref, isDragging } = useTaskDragAndDrop<HTMLDivElement>({
    task: taskProps,
    index,
  });
  const [trashVisible, setTrashVisible] = useState(false);

  const handleTitleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = event.target.value.split("\n");

    if (lines.length > 1) {
      event.target.value = lines[0];
    }

    taskStore.changeTask(id, "title", event.target.value);
  };

  const handleBlur = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (event.target.value === "") {
      taskStore.changeTask(id, "title", "Title");
    }
  };

  return (
    <div
      onMouseEnter={() => setTrashVisible(true)}
      onMouseLeave={() => setTrashVisible(false)}
      ref={ref}
      className="card"
      style={{ backgroundColor: color, opacity: isDragging ? 0.5 : 1}}
    >
      <div className="header">
        <textarea
          className="editable-textarea bold"
          maxLength={30}
          value={title}
          onChange={handleTitleChange}
          onBlur={handleBlur}
        />
        <button
          onClick={() => taskStore.deleteTask(id)}
          className="invisible-button"
          style={{display: trashVisible ? 'block' : 'none'}}
        >
          <BsTrashFill />
        </button>
      </div>
      <ResizableTextarea value={description} id={id} />
    </div>
  );
};

const ResizableTextarea: React.FC<ResizableTextareaProps> = ({ value, id }) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
    taskStore.changeTask(id, "description", event.target.value);
  };

  const handleBlur = () => {
    if (value === "") {
      taskStore.changeTask(id, "description", "Description");
    }
  };

  return (
    <textarea
      className="editable-textarea"
      ref={textareaRef}
      value={value}
      onChange={handleInputChange}
      onBlur={handleBlur}
    />
  );
};

export { Task };
