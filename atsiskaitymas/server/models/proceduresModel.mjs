import { pool } from "../db/postgresConnection.mjs";

const proceduresModel = {
    createProcedure: async (procedureData) => {
        try {
            const { title, category, duration, image, price } = procedureData;
            const result = await pool.query(
                "INSERT INTO procedures (title, category, duration, image, price) VALUES ($1, $2, $3, $4, $5) RETURNING *",
                [title, category, duration, image, price]
            );
            return result.rows[0];
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    updateProcedure: async (procedureId, updatedFields) => {
        try {
            // Create the query's set fields and values
            const setFields = Object.keys(updatedFields)
                .map((key, i) => `${key} = $${i + 1}`)
                .join(", ");

            const values = [...Object.values(updatedFields), procedureId]; // Correct order of values

            const result = await pool.query(
                `UPDATE procedures SET ${setFields} WHERE id = $${values.length} RETURNING *`,
                values
            );

            if (result.rowCount === 0) {
                // No project found with the given ID
                throw new Error("Procedure not found.");
            }

            return result.rows[0]; // Return the updated project
        } catch (error) {
            console.error("Error in updateProcedure:", error.message);
            throw error;
        }
    },
    deleteProcedure: async (id) => {
        try {
            const query = "DELETE FROM procedures WHERE id = $1";
            const result = await pool.query(query, [id]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getAllProcedures: async () => {
        try {
            const query = "SELECT * FROM procedures";
            const result = await pool.query(query);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
    getProcedureById: async (procedureId) => {
        try {
            const query = "SELECT * FROM procedures WHERE id = $1";
            const result = await pool.query(query, [procedureId]);
            return result.rows;
        } catch (error) {
            console.error(error);
            throw error;
        }
    },
};

export default proceduresModel;