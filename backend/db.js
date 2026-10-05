// backend/db.js
import mysql from "mysql2";

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",           
  database: "sukhvaas_db",
});

export default db;
