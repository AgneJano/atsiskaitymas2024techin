import proceduresController from "../controller/proceduresController.mjs";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const router = express.Router();

router.post('/create', proceduresController.createProcedure);
router.patch('/update/:id', proceduresController.updateProcedure);
router.delete('/:id', proceduresController.deleteProcedure);
router.get('/', proceduresController.getAllProcedures);
router.get('/:id', proceduresController.getProcedureById);

export default router;