import express from "express";
import Recipe from "../models/recipeModel.js";
import Joi from "joi";
const router = express.Router();

const schemaRecipe = Joi.object({
  id: Joi.number().integer(),
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().required(),
  person: Joi.number().integer().required(),
  time: Joi.number().integer().required(),
  ingredients: Joi.string().required(),
});

router
  .get("/", async (req, res) => {
    try {
      const recipe = await Recipe.getAll();

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const recipe = await Recipe.getOneById(id);

      res.json(recipe);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const recipe = {
      id: req.params.id,
      title: req.body.title,
      description: req.body.description,
      person: req.body.person,
      time: req.body.time,
      ingredients: req.body.ingredients,
    };

    try {
      const { error, value } = await schemaRecipe.validate(recipe);
      const recipeUpdate = await Recipe.updateRecipe(value);
      if (recipeUpdate) res.json(recipe);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const recipe = {
      title: req.body.title,
      description: req.body.description,
      person: req.body.person,
      time: req.body.time,
      ingredients: req.body.ingredients,
    };

    try {
      const { error, value } = await schemaRecipe.validate(recipe);
      const recipeCreate = await Recipe.createNew(value);
      if (recipeCreate) {
        const newRecipe = await Recipe.getOneById(recipeCreate);
        res.json(newRecipe);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const recipeDelete = await Recipe.deleteById(id);
      if (recipeDelete) {
        res.json(`La recette ${id} a bien été supprimée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
