import dbConnect from "../config/db-config.js";

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM about WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};
// GET ALL
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM about", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM about WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// UPDATE
const updateAbout = (about) => {
  const { description, email, fullname, phone, id } = about;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE about SET description = ?, email = ?, fullname = ?, phone = ?  WHERE id = ?",
      [description, email, fullname, phone, id],
      (err, result) => {
        if (err) reject(console.log(err));
        else resolve(console.log(result));
      }
    );
  });
};
const createNew = (about) => {
  const { description, email, fullname, phone } = about;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO about (description, email, fullname, phone) VALUES (?,?,?,?)",
      [description, email, fullname, phone],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

export default { getAll, getOneById, updateAbout, deleteById, createNew };
