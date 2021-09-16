import express from "express";
import webhookController from "../controllers/webhooks.js";

const router = express.Router();
const { createWebhook, deleteWebhook } = webhookController;

router.post("/", async (req, res) => {
	try {
		const webhook = await createWebhook(req.body);

		return res.status(201).json(webhook);
	} catch (error) {
		return res.status(404).json({ message: "something went wrong", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const deleted = await deleteWebhook(id);

		if (!deleted.affected === 1) {
			throw "Webhook not deleted";
		}

		return res.status(204).send();
	} catch (error) {
		return res.status(404).json({ message: "something went wrong", error });
	}
});

export default router;
