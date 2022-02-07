import express from "express";
import Service from "../models/serviceModel.js";
import upload from "../services/uploadFile.js";
import Joi from "joi";
const router = express.Router();

const schemaService = Joi.object({
    id: Joi.number().integer(),
    price: Joi.number().integer().required(),
    name: Joi.string().min(3).max(255).required(),
    time: Joi.number().integer().required(),
    description: Joi.required(),
    image: Joi.string().min(3).max(255).required(),
    id_category: Joi.number().integer().required(),
});

router
    .get("/", async (req, res) => {
        try {
            const service = await Service.getAll();

            res.json(service);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const service = await Service.getOneById(id);

            res.json(service);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .put("/", upload.single("image"), async (req, res) => {
        if (!req.file) {
            const service = {
                id: req.body.id,
                price: req.body.price,
                name: req.body.name,
                time: req.body.time,
                description: req.body.description,
                id_category: req.body.id_category,
                image : req.body.imageUrl,
            };

            try {
                const { error, value } = await schemaService.validate(service);
                const serviceUpdated = await Service.updateService(value);
                if (serviceUpdated) {
                    res.json(service);
                } else res.json({ message: error.message }).status(422);
            } catch (err) {
                console.log(err);
                res.json({ message: err.message }).status(500);
            }
        } 
        else {
    
            const service = {
                        id: req.body.id,
                        price: req.body.price,
                        name: req.body.name,
                        time: req.body.time,
                        description: req.body.description,
                        id_category: req.body.id_category,
                        image : `http://localhost:5000/images/${req.file.filename}`,
                    };
            
                    try {
                        const { error, value } = await schemaService.validate(service);
                        const serviceUpdated = await Service.updateService(value);
                        if (serviceUpdated) {
                            res.json(service);
                        } else res.json({ message: error.message }).status(422);
                    } catch (err) {
                        console.log(err);
                        res.json({ message: err.message }).status(500);
                    }
        }
    })

    .post("/", upload.single("image"), async (req, res) => {
        if (!req.file) {
            res.send({ error: `No file sended !` }).status(500);
        } else {
    
            const service = {
                        price: req.body.price,
                        name: req.body.name,
                        time: req.body.time,
                        description: req.body.description,
                        id_category: req.body.id_category,
                        image : `http://localhost:5000/images/${req.file.filename}`,
                    };
            
                    try {
                        const { error, value } = await schemaService.validate(service);
                        const serviceCreate = await Service.createNew(value);
                        if (serviceCreate) {
                            const newService = await Service.getOneById(serviceCreate);
                            res.json(newService);
                        } else res.json({ message: error.message }).status(422);
                    } catch (err) {
                        console.log(err);
                        res.json({ message: err.message }).status(500);
                    }
        }
    })

    .delete("/:id", async (req, res) => {
        const id = req.params.id;
        try {
            const serviceDelete = await Service.deleteById(id);
            if (serviceDelete) {
                res.json(`La Prestation ${id} a bien été supprimée`);
            } else {
                res.status(422).json(`Une erreur est survenue lors de la suppression`);
            }
        } catch (error) {
            res.status(500).json(`Erreur serveur`);
        }
        return res.status(201).end();
    });

export default router;
