const express = require("express");
const router = express.Router();

function generateUniqueEmployeeId() {
  const min = 1000000; 
  const max = 9999999; 
  const randomNo = Math.floor(Math.random() * (max - min + 1)) + min;
  const randomStr = randomNo.toString();
  return "UI" + randomStr;
}

module.exports = function (db) {
  router.get("/", (req, res) => {
    const cafeName = req.query.cafe;
    if (cafeName) {
      console.info("Retrieve employees based on cafe using a GET request.");
      db.all(
        "SELECT employee_id, name, email, phone, join_date, CAST((julianday('now') - julianday(join_date)) AS INTEGER) AS days_worked, cafe_name FROM employees LEFT JOIN cafes ON employees.cafe_id=cafes.cafe_id WHERE cafe_name=? ORDER BY days_worked DESC;",
        [cafeName],
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Something went wrong on our end.");
          } else {
            console.info(
              `All employees by cafe name ${cafeName} retrieved.`
            );
            res.json(rows);
          }
        }
      );
    } else {
      db.all(
        "SELECT employee_id, name, email, phone, join_date, CAST((julianday('now') - julianday(join_date)) AS INTEGER)  AS days_worked, cafes.cafe_id, cafe_name FROM employees LEFT JOIN cafes ON employees.cafe_id=cafes.cafe_id ORDER BY days_worked DESC;",
        (err, rows) => {
          if (err) {
            console.error(err);
            return res.status(500).send("Something went wrong on our end.");
          } else {
            console.info("All employees retrieved.");
            return res.json(rows);
          }
        }
      );
    }
  });

  router.post("/", (req, res) => {
    console.info("Handle a POST request to add a new employee.");
    const {
      name,
      gender,
      email,
      phone,
      selectedDate: joinDate,
      selectedCafeId,
    } = req.body;

    db.all(
      "SELECT * FROM employees WHERE name=? OR email=?;",
      [name, email],
      (err, rows) => {
        if (err) {
          console.error(err);
          res.status(500).send("Something went wrong on our end.");
        } else {
          if (rows.length > 0) {
            const existingEmployee = rows.find(
              (employee) => employee.name === name || employee.email === email
            );
            if (existingEmployee.name === name) {
              console.log("Duplicate employee name found.");
              res.status(409).send("Duplicate employee name found.");
            } else {
              console.log("Duplicate employee email found.");
              res.status(400).send("Duplicate employee name found.");
            }
          } else {
            const employee_id = generateUniqueEmployeeId();
            db.run(
              "INSERT INTO employees (employee_id, name, gender, email, phone, join_date, cafe_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
              [
                employee_id,
                name,
                gender,
                email,
                phone,
                joinDate,
                selectedCafeId,
              ],
              function (err) {
                if (err) {
                  console.error(err);
                  res.status(500).send("Something went wrong on our end.");
                } else {
                  console.info("A new employee added.");
                  res.status(200).send("A new employee added.");
                }
              }
            );
          }
        }
      }
    );
  });

  router.put("/", (req, res) => {
    console.info("Handle a PUT request to update an employee.");
    const {
      employee_id,
      name,
      gender,
      email,
      phone,
      selectedDate: joinDate,
      selectedCafeId,
    } = req.body;
    db.run(
      "UPDATE employees SET name=?, gender=?, email=?, phone=?, join_date=?, cafe_id=? WHERE employee_id=?",
      [name, gender, email, phone, joinDate, selectedCafeId, employee_id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Something went wrong on our end.");
        } else {
          console.info("Employee has been updated.");
          res.json({ success: true });
        }
      }
    );
  });

  router.delete("/:id", (req, res) => {
    const employeeId = req.params.id;
    console.info(`Handle a DELETE request to delete an employee with employee id ${employeeId}`);
    const deleteQuery = "DELETE FROM employees WHERE employee_id = ?";

    db.run(deleteQuery, employeeId, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong on our end when deleting the employee." });
      } else {
        res.status(200).json({
          message: `Employee with ID ${employeeId} has been deleted.`,
        });
      }
    });
  });

  return router;
};
