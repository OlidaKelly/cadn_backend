import dbConnect from "../config/db-config.js";

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM category WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// READ ALL
const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM category", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// CREATE
const createNew = (category) => {
    const { name, image, description } = category;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO category (name, image, description) VALUES (?,?,?)",
            [name, image, description],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

// UPDATE
const updateCategory = (category) => {
    const { name, image, description, id } = category;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "UPDATE category SET name = ?, image = ?, description = ? WHERE id = ?",
            [name, image, description, id],
            (err, result) => {
                if (err) reject(err);
                else {
                    resolve(result);
                }
            }
        );
    });
};
// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM category WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

export default { getAll, getOneById, deleteById, createNew, updateCategory };
