import express from "express";
import Social from "../models/socialModel.js";
import Joi from "joi";
const router = express.Router();

const schemaSocial = Joi.object({
  id: Joi.number().integer(),
  name: Joi.string().min(3).max(255).required(),
  url: Joi.string().min(3).max(255).required(),
  icon: Joi.string().min(3).max(255).required(),
});

router
  .get("/", async (req, res) => {
    try {
      const social = await Social.getAll();
      res.json(social);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })

  .get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const social = await Social.getOneById(id);

      res.json(social);
    } catch (error) {
      res.json({ message: error.message }).status(500);
    }
  })

  .put("/", async (req, res) => {
    const social = {
      name: req.body.name,
      url: req.body.url,
      icon: req.body.icon,
    };

    try {
      const { error, value } = await schemaSocial.validate(social);
      const socialUpdate = await Social.updateSocial();
      if (socialUpdate) res.json(social);
      else res.json({ message: error.message }).res.status(422);
    } catch (err) {
      res.json({ message: err.message }).status(500);
    }
  })

  .post("/", async (req, res) => {
    const social = {
      name: req.body.name,
      url: req.body.url,
      icon: req.body.icon,
    };
    try {
      const { error, value } = await schemaSocial.validate(social);
      const socialCreate = await Social.createNew(value);
      if (socialCreate) {
        const newSocial = await Social.getOneById(socialCreate);
        res.json(newSocial);
      } else res.json({ message: error.message }).status(422);
    } catch (err) {
      console.log(err);
      res.json({ message: err.message }).status(500);
    }
  })

  .delete("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const socialDelete = await Social.deleteById(id);
      if (socialDelete) {
        res.json(`Le réseau social ${id} a bien été supprimée`);
      } else {
        res.json(`Une erreur est survenue lors de la suppression`).status(422);
      }
    } catch (error) {
      res.json(`Erreur serveur`).status(500);
    }
    return res.status(201).end();
  });

export default router;
