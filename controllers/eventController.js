import express from "express";
import Event from "../models/eventModel.js";
import Joi from "joi";
const router = express.Router();

const schemaEvent = Joi.object({
  id: Joi.number().integer(),
  title: Joi.string().min(3).max(255).required(),
  date: Joi.date().required(),
  description: Joi.string().min(3).required(),
  id_category: Joi.number().integer().required(),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const event = await Event.getOneById(id);

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const event = await Event.getAll();

      res.json(event);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .put("/:id", async (req, res) => {
    const event = {
      id: req.params.id,
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaEvent.validate(event);
      const eventUpdate = await Event.updateEvent(value);
      if (eventUpdate) res.json(event);
      else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .post("/", async (req, res) => {
    const event = {
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      id_category: req.body.id_category,
    };

    try {
      const { error, value } = await schemaEvent.validate(event);
      const eventCreate = await Event.createNew(value);
      if (eventCreate) {
        const newEvent = await Event.getOneById(eventCreate);
        res.json(newEvent);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const eventDelete = await Event.deleteById(id);
      if (eventDelete) {
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
