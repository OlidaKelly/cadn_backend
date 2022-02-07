import express from "express";
import Category from "../models/categoryModel.js";
import Joi from "joi";
import upload from "../services/uploadFile.js";
const router = express.Router();

const schemaCategory = Joi.object({
    id: Joi.number().integer(),
    name: Joi.string().min(3).max(255).required(),
    image: Joi.string().min(3).max(255).required(),
    description: Joi.required(),
});

router
    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const category = await Category.getOneById(id);

            res.json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/", async (req, res) => {
        try {
            const category = await Category.getAll();

            res.json(category);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put("/", upload.single("image"), async (req, res) => {
        if (!req.file) {
            const category = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                image : req.body.imageUrl,
            };
    
            try {
                const { error, value } = await schemaCategory.validate(category);
                const categoryUpdated = await Category.updateCategory(value);
                if (categoryUpdated) {
                    res.json(category);
                } else res.json({ message: error.message }).status(422);
            } catch (err) {
                console.log(err);
                res.json({ message: err.message }).status(500);
            }
        } 
        else {
    
            const category = {
                id: req.body.id,
                name: req.body.name,
                description: req.body.description,
                image : `http://localhost:5000/images/${req.file.filename}`,
            };
    
            try {
                const { error, value } = await schemaCategory.validate(category);
                const categoryUpdated = await Category.updateCategory(value);
                if (categoryUpdated) {
                    res.json(category);
                } else res.json({ message: error.message }).status(422);
            } catch (err) {
                console.log(err);
                res.json({ message: err.message }).status(500);
            }
        }
    })

    .post("/", upload.single("image"), async (req, res) => {
        const category = {
            name: req.body.name,
            description: req.body.description,
            image : `http://localhost:5000/images/${req.file.filename}`,
        };

        try {
            const { error, value } = await schemaCategory.validate(category);
            const categoryCreate = await Category.createNew(value);
            if (categoryCreate) {
                const newCategory = await Category.getOneById(categoryCreate);
                res.json(newCategory);
            } else res.json({ message: error.message }).status(422);
        } catch (err) {
            res.json({ message: err.message }).status(500);
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const categoryDelete = await Category.deleteById(id);
            if (categoryDelete) {
                res.json(`La categorie ${id} a bien été effacée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
