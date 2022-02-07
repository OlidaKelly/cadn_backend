
import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import Joi from "joi";
import jwt from "jsonwebtoken";
import middleware from "../services/middleware.js";


const router = express.Router();
const saltRounds = 10;
const schemaUser = Joi.object({
    email: Joi.string().email().required().trim(true),
    password: Joi.string()
        .regex(/^[a-zA-Z0-9]{3,30}$/)
        .required()
        .trim(true),
    is_admin: Joi.boolean().default(false),
});

router
    .post("/register", async (req, res) => {
        const { email, password } = req.body;
        try {
            const userIsValid = schemaUser.validate({ email, password });
            const userExist = await User.findByEmail(userIsValid.value.email);
            if (userIsValid.error) return res.status(422).json({ error: userIsValid.error.details[0].message });
            if (userExist) return res.json({ error: "Email already exists" }).status(409);
            try {
                const hash = bcrypt.hashSync(userIsValid.value.password, saltRounds);
                userIsValid.value.password = hash;
                const userId = await User.createNew(userIsValid.value);
                const user = await User.findById(userId);
                res.status(201).json(user);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })
    .post("/login", async (req, res) => {
        const { email, password } = req.body;
        try {
            const userIsValid = schemaUser.validate({ email, password });
            const userExist = await User.findByEmail(userIsValid.value.email);
            if (userExist) {
                const passwordIsValid = bcrypt.compareSync(userIsValid.value.password, userExist.password);
                if (passwordIsValid) {
                    const token = jwt.sign({id: userExist.id, role: userExist.is_admin}, process.env.SERVER_SECRET, {expiresIn: 360000 * 4});
                    res.send({token: token, user: {email: userExist.email, role: userExist.is_admin}}).status(200);
                }
                else res.json({ error: "Invalid password" }).status(401);
            } else res.json({ error: "User not found" }).status(404);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    })

    .get("/user-is-auth", middleware.verifyJWT, (req, res) => {
        res.json({auth: true, message: "utilisateur est authentifié"}).status(200);
    })



export default router;
