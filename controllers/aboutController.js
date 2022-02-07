import express from "express";
import About from "../models/aboutModel.js";
import Joi from "joi";
const router = express.Router();

const schemaAbout = Joi.object({
  id: Joi.number().integer(),
  fullname: Joi.string().min(3).max(255).required(),
  phone: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().required(),
  description: Joi.required(),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const about = await About.getOneById(id);
      res.json(about);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const about = await About.getAll();

      res.json(about);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/", async (req, res) => {
    const about = {
      id: req.body.id,
      description: req.body.description,
      email: req.body.email,
      fullname: req.body.fullname,
      phone: req.body.phone,
    };


    try {
      const { error, value } = await schemaAbout.validate(about);
      const aboutUpdate = await About.updateAbout(value);
      console.log('test :', error.details[0].message);
      if (aboutUpdate) res.json(about);
      else res.json({ message: error.message }).res.status(422);
    } catch (err) {
      res.json({ message: err.message }).status(500);
    }
  })
  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const aboutDelete = await About.deleteById(id);
      if (aboutDelete) {
        res.json(`L'article ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  }).post("/", async (req, res) => {
    const about = {
      description: req.body.description,
      email: req.body.email,
      fullname: req.body.fullname,
      phone: req.body.phone,
    };

    try {
      const { error, value } = await schemaAbout.validate(about);
      const categoryAbout = await About.createNew(value);
      if (categoryAbout) {
        const newAbout = await About.getOneById(categoryAbout);
        res.json(newAbout);
      } else res.json({ message: error.message }).status(422);
    } catch (err) {
      res.json({ message: err.message }).status(500);
    }
  })

export default router;
