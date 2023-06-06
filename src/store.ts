import { makeAutoObservable } from "mobx";
import { taskProps } from "./utils/models";
import { ColumnType } from "./utils/enums";
import { getTasks, updateTask, deleteTask, addtask } from "./client";

class TaskStore {
  constructor() {
    makeAutoObservable(this);
    this.dropTaskFrom = this.dropTaskFrom.bind(this);
    this.initTasks();
  }

  tasks: taskProps[] = [];

  async initTasks() {
    try {
      const data = await getTasks();
      console.log(data);
      this.tasks = data;
    } catch (error) {
      console.error("Error initializing tasks:", error);
    }
  }

  changeTask(id: string, field: keyof taskProps, value: string) {
    updateTask({field, value, taskId: id});
    console.log(field, id);
    const taskIndex = this.tasks.findIndex((item) => item.id === id);
    const updatedTask = {
      ...this.tasks[taskIndex],
      [field]: value,
    };

    this.tasks = [
      ...this.tasks.slice(0, taskIndex),
      updatedTask,
      ...this.tasks.slice(taskIndex + 1),
    ];
  }

  addTask(task: taskProps) {
    addtask(task);
    this.tasks = [...this.tasks, task];    
  }

  deleteTask(taskId: string) {
    deleteTask(taskId);
    const deleteIndex = this.tasks.findIndex((item) => item.id === taskId);

    this.tasks = [
      ...this.tasks.slice(0, deleteIndex),
      ...this.tasks.slice(deleteIndex + 1),
    ];
  }

  dropTaskFrom(to: ColumnType, id: taskProps["id"]) {
    updateTask({ field: 'status', value: to, taskId: id });
    const movingTaskIndex = this.tasks.findIndex((item) => item.id === id);
    const movingTask = this.tasks[movingTaskIndex];
    movingTask.status = to;

    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.tasks = [...this.tasks, movingTask];
    console.log(to);
    this.tasks.forEach(({ id, title, description, status }) =>
      console.log(id, title, description, status)
    );
  }
}

const taskStore = new TaskStore();
export default taskStore;
