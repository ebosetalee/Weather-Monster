import express from "express";
import axios from "axios";
import TemperaturesController from "../controllers/temperatures.js";
import webhookController from "../controllers/webhooks.js";

const { createTemperature, findAllTemperatures } = TemperaturesController;
const { findWebhooks } = webhookController;

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		if (!req.body.timestamp) {
			req.body.timestamp = new Date().getTime();
		}
		const temperature = await createTemperature(req.body);

		const webhooks = await findWebhooks(temperature.city_id);

		const postAxios = await Promise.all(
			webhooks.map(
				async (it) =>
					await axios({
						method: "post",
						url: it.callback_url,
						data: temperature
					})
			)
		);
		console.log(postAxios.map((it) => it.status));

		return res.status(201).json(temperature);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "something went wrong", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const temperatures = await findAllTemperatures();
		return res.status(200).json(temperatures);
	} catch (error) {
		return res.status(400).json({ message: "something went wrong", error });
	}
});

export default router;
