import express from "express";
import usersRouter from "./users.mjs";
import proceduresRouter from "./procedures.mjs";


const router = express.Router();

//PAKEISTI
router.use("/users", usersRouter);

router.use("/procedures", proceduresRouter);

export default router;
