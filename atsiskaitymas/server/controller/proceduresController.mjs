import proceduresModel from "../models/proceduresModel.mjs";

const proceduresController = {
    createProcedure: async (req, res) => {
        try {
            const procedure = await proceduresModel.createProcedure(req.body);
            res.status(201).json(procedure);
        } catch (error) {
            res
                .status(500)
                .json({ message: "An error occured while creating the procedure." });
        }
    },

    updateProcedure: async (req, res) => {
        try {
            const procedureId = req.params.id;
            const procedure = await proceduresModel.updateProcedure(procedureId, req.body);
            res.status(200).json(procedure);
        } catch (error) {
            if (error.message === "Procedure not found.") {
                res.status(404).json({ message: "Procedure not found." });
            } else {
                res
                    .status(500)
                    .json({ message: "An error occurred while updating the procedure." });
            }
        }
    },
    deleteProcedure: async (req, res) => {
        try {
            const procedureId = req.params.id;
            const deletedProcedure = await proceduresModel.deleteProcedure(procedureId);
            if (!deletedProcedure) {
                return res.status(404).json({ message: "Procedure not found." });
            }
            res
                .status(200)
                .json({ message: "Procedure deleted successfully." });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    },
    getAllProcedures: async (req, res) => {
        try {
            const result = await proceduresModel.getAllProcedures();
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    },
    getProcedureById: async (req, res) => {
        try {
            const procedureId = req.params.id;
            const result = await proceduresModel.getProcedureById(procedureId);
            if (!result) {
                return res.status(404).json({ message: "Procedure not found." });
            }
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error" });
        }
    }
};

export default proceduresController;