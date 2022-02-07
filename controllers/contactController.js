import express from "express";
import Contact from "../models/contactModel.js";
import Joi from "joi";
const router = express.Router();

const schemaContact = Joi.object({
  id: Joi.number().integer(),
  firstname: Joi.string().min(1).max(255).required(),
  lastname: Joi.string().min(1).max(255).required(),
  email: Joi.string().email().min(3).required(),
  message: Joi.string().min(3).required(),
});

router
  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const contact = await Contact.getOneById(id);

      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/", async (req, res) => {
    try {
      const contact = await Contact.getAll();

      res.json(contact);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .post("/", async (req, res) => {
    const contact = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      message: req.body.message,
    };

    try {
      const { error, value } = await schemaContact.validate(contact);
      const contactCreate = await Contact.createNew(value);
      if (contactCreate) {
        const newContact = await Contact.getOneById(contactCreate);
        res.json(newContact);
      } else res.status(422).json({ message: error.message });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const contactDelete = await Contact.deleteById(id);
      if (contactDelete) {
        res.json(`L'article ${id} a bien été effacée`);
      } else {
        res.status(422).json(`Une erreur est survenue lors de la suppression`);
      }
    } catch (error) {
      res.status(500).json(`Erreur serveur`);
    }
    return res.status(201).end();
  });

export default router;
