import dbConnect from "../config/db-config.js";

// READ ALL
const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM service", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM service WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM service WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (service) => {
  const { price, name, time, description, image, id_category } = service;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO service (price, name, time, description, image, id_category) VALUES (?,?,?,?,?,?)",
      [price, name, time, description, image, id_category],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// UPDATE
const updateService = (service) => {
  const { price, name, time, description, image, id_category, id } = service;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE service SET price = ?, name = ?, time = ?, description = ?, image = ?, id_category = ? WHERE id = ?",
      [price, name, time, description, image, id_category, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export default { getAll, getOneById, deleteById, createNew, updateService };
