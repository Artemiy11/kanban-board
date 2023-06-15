import { taskProps } from "./utils/models";

// const _path = "http://193.233.49.179:3002";
const _path = "https://artemdev.website";
// const _path = "artemdev.website";


export async function getTasks() {
  return await fetch(`${_path}/getTasks`, {
    method: "GET",
    headers: {
      'Content-Type': 'application/json',
    }
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Server response:", data);
      return data; // Возвращаем полученные данные
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error; // Пробрасываем ошибку дальше
    });
}

export async function updateTask({
  field,
  value,
  taskId,
}: {
  field: string;
  value: string;
  taskId: string;
}): Promise<void> {
  return await fetch(`${_path}/updateTask/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ field, value }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export async function deleteTask(taskId: string): Promise<void> {
  return await fetch(`${_path}/deleteTask/${taskId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}

export async function addtask(task: taskProps): Promise<void> {
  return await fetch(`${_path}/addTask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task)
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete task");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      throw error;
    });
}
