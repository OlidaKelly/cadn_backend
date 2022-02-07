import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM social", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM social WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM social WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (social) => {
  const { name, url, icon } = social;
  return new Promise((resolve, reject) => {
    dbConnect.query("INSERT INTO social (name, url, icon) VALUES (?,?,?)", [name, url, icon], (err, result) => {
      if (err) reject(err);
      else resolve(result.insertId);
    });
  });
};

// UPDATE
const updateSocial = (social) => {
  const { title, id } = social;
  return new Promise((resolve, reject) => {
    dbConnect.query("UPDATE social SET title = ? WHERE id = ?", [title, id], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

export default { getAll, getOneById, deleteById, createNew, updateSocial };
