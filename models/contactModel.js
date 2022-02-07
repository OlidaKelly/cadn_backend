import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM contact", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM contact WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM contact WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (contact) => {
  const { firstname, lastname, email, message } = contact;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO contact (firstname, lastname, email, message) VALUES (?,?,?,?)",
      [firstname, lastname, email, message],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

export default { getAll, getOneById, deleteById, createNew };
