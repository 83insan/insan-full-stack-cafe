const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();
const employeeRoutes = require("./routes/employeesRoutes");
const cafeRoutes = require("./routes/cafesRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const database = new sqlite3.Database("./db/freshCafe.db"); 

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS employees (
      employee_id VARCHAR,
      name VARCHAR,
      gender VARCHAR,
      email VARCHAR,
      phone VARCHAR,
      join_date DATE,
      cafe_id VARCHAR
    )
  `);
});

database.serialize(() => {
  database.run(`
    CREATE TABLE IF NOT EXISTS cafes (
      cafe_id VARCHAR,
      cafe_name VARCHAR,
      description VARCHAR,
      location VARCHAR
    )
  `);
});

app.use("/employees", employeeRoutes(database));
app.use("/cafes", cafeRoutes(database));

const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`The server is listening on port ${PORT}`);
});
