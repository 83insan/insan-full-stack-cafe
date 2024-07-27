const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");

module.exports = function (db) {
  router.get("/", (req, res) => {
    const location = req.query.location;
    if (location) {
      console.info("Retrieve cafes based on location using a GET request.");
      db.all(
        "SELECT cafe_name, description, COUNT(employee_id) as employees, location, cafes.cafe_id FROM cafes LEFT JOIN employees ON cafes.cafe_id=employees.cafe_id WHERE location=? GROUP BY cafes.cafe_id ORDER BY employees DESC;",
        [location],
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Something went wrong on our end.");
          } else {
            console.info(`All cafes by location ${location} retrieved.`);
            res.json(rows);
          }
        }
      );
    }
    else {
      console.info("Retrieve cafes using a GET request.");
      db.all(
        "SELECT cafe_name, description, COUNT(employee_id) as employees, location, cafes.cafe_id FROM cafes LEFT JOIN employees ON cafes.cafe_id=employees.cafe_id GROUP BY cafes.cafe_id ORDER BY employees DESC;",
        (err, rows) => {
          if (err) {
            console.error(err);
            res.status(500).send("Something went wrong on our end.");
          } else {
            console.info("All cafes retrieved.");
            res.json(rows);
          }
        }
      );
    }
  });

  router.post("/", (req, res) => {
    console.info("Handle a POST request to register a new cafe.");
    const { cafe_name, description, location } = req.body;
    const cafe_id = uuidv4();
    db.run(
      "INSERT INTO cafes (cafe_id, cafe_name, description, location) VALUES (?, ?, ?, ?)",
      [cafe_id, cafe_name, description, location],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Something went wrong on our end.");
        } else {
          console.info("A new cafe added.");
          res.json({ success: true });
        }
      }
    );
  });

  router.put("/", (req, res) => {
    console.info("Handle a PUT request to update a cafe.");
    const { cafe_id, cafe_name, description, location } = req.body;
    db.run(
      "UPDATE cafes SET cafe_name=?, description=?, location=? WHERE cafe_id=?",
      [cafe_name, description, location, cafe_id],
      function (err) {
        if (err) {
          console.error(err);
          res.status(500).send("Something went wrong on our end.");
        } else {
          console.info("Cafe has been updated.");
          res.json({ success: true });
        }
      }
    );
  });

  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.info(`Handle a DELETE request to delete a cafe with cafe id ${id}`);
    const deleteSQL = "DELETE FROM cafes WHERE cafe_id = ?";

    db.run(deleteSQL, id, function (err) {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong on our end." });
        return;
      }
      else {
        db.run(
          "DELETE FROM employees WHERE cafe_id = ?",
          id,
          function (err) {
            if (err) {
              console.error(err);
              res.status(500).json({ error: "Something went wrong on our end when deleting employees" });
              return;
            }
            console.log("All relevant employees worked in the cafe has been deleted.");
            res.sendStatus(204); // Success, no content
          }
        );
      }
    });
  });

  return router;
};
