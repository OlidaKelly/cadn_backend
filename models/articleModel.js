import dbConnect from "../config/db-config.js";

const getAll = () => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM article", (err, results) => {
            if (err) reject(err);
            else resolve(results);
        });
    });
};

// READ ONE
const getOneById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("SELECT * FROM article WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result[0]);
        });
    });
};

// DELETE
const deleteById = (id) => {
    return new Promise((resolve, reject) => {
        dbConnect.query("DELETE FROM article WHERE id = ?", id, (err, result) => {
            if (err) reject(err);
            else resolve(result.affectedRows);
        });
    });
};

// CREATE
const createNew = (article) => {
    const { title, description, image, date, id_category } = article;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "INSERT INTO article (title, description, image, date, id_category) VALUES (?,?,?,?,?)",
            [title, description, image, date, id_category],
            (err, result) => {
                if (err) reject(err);
                else resolve(result.insertId);
            }
        );
    });
};

// UPDATE
const updateArticle = (article) => {
    const { title, description, image, date, id_category, id } = article;
    return new Promise((resolve, reject) => {
        dbConnect.query(
            "UPDATE article SET title = ?, description = ?, image = ?, date = ?, id_category = ? WHERE id = ?",
            [title, description, image, date, id_category, id],
            (err, result) => {
                if (err) reject(err);
                else resolve(result);
            }
        );
    });
};

export default { getAll, getOneById, deleteById, createNew, updateArticle };
