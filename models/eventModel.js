import dbConnect from "../config/db-config.js";

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM event WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// READ ALL
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM event", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// CREATE
const createNew = (event) => {
  const { title, date, description, id_category } = event;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO event (title, date, description, id_category) VALUES (?,?,?,?)",
      [title, date, description, id_category],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// UPDATE
const updateEvent = (event) => {
  const { title, date, description, id_category, id } = event;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE event SET title = ?, date = ?, description = ?, id_category =? WHERE id = ?",
      [title, date, description, id_category, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};
// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM event WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

export default { getAll, getOneById, deleteById, createNew, updateEvent };
