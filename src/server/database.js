import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  host: "localhost",
  user: "artemy",
  port: 5432,
  password: "solid_password787",
  database: "kanban_board_database",
});

export {pool};