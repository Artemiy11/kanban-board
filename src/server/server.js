import express from "express";
import cors from "cors";
import { pool } from "./database.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/addTask", (req, res) => {
  const id = req.body["id"];
  const title = req.body["title"];
  const description = req.body["description"];
  const color = req.body["color"];
  const status = req.body["status"];

  const insertSTMT = `INSERT INTO task (id, status, title, description, color) VALUES ('${id}', '${status}', '${title}', '${description}', '${color}');`;
  console.log(insertSTMT);

  pool
    .query(insertSTMT)
    .then(() => {
      res.sendStatus(200); // Sending a success status code
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.get("/getTasks", (req, res) => {
  pool
    .query("SELECT * FROM task;")
    .then((result) => {
      const tasks = result.rows;
      res.json(tasks);
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.put("/updateTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;
  const { field, value } = req.body;

  const updateSTMT = `UPDATE task SET ${field} = '${value}' WHERE id = '${taskId}';`;

  pool
    .query(updateSTMT)
    .then(() => {
      res.sendStatus(200); // Sending a success status code
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

app.delete("/deleteTask/:taskId", (req, res) => {
  const taskId = req.params.taskId;

  const deleteSTMT = `DELETE FROM task WHERE id = '${taskId}';`;

  pool
    .query(deleteSTMT)
    .then(() => {
      res.sendStatus(200); // Sending a success status code
    })
    .catch((err) => {
      console.log("ERROR", err);
      res.status(500).json({ error: "Internal server error" });
    });
});

// Start the server
const port = 3002; // Choose the port number you prefer
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
