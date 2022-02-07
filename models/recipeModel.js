import dbConnect from "../config/db-config.js";

const getAll = () => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM recipe", (err, results) => {
      if (err) reject(err);
      else resolve(results);
    });
  });
};

// READ ONE
const getOneById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("SELECT * FROM recipe WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result[0]);
    });
  });
};

// DELETE
const deleteById = (id) => {
  return new Promise((resolve, reject) => {
    dbConnect.query("DELETE FROM recipe WHERE id = ?", id, (err, result) => {
      if (err) reject(err);
      else resolve(result.affectedRows);
    });
  });
};

// CREATE
const createNew = (recipe) => {
  const { title, description, person, time, ingredients } = recipe;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "INSERT INTO recipe (title, description, person, time, ingredients) VALUES (?,?,?,?,?)",
      [title, description, person, time, ingredients],
      (err, result) => {
        if (err) reject(err);
        else resolve(result.insertId);
      }
    );
  });
};

// UPDATE
const updateRecipe = (recipe) => {
  const { title, description, person, time, ingredients, id } = recipe;
  return new Promise((resolve, reject) => {
    dbConnect.query(
      "UPDATE recipe SET title = ?, description = ?, person = ?, time = ?, ingredients = ? WHERE id = ?",
      [title, description, person, time, ingredients, id],
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      }
    );
  });
};

export default { getAll, getOneById, deleteById, createNew, updateRecipe };
