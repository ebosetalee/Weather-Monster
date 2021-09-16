import express from "express";
import getMinOrMax from "../controllers/forecasts.js";
import TemperaturesController from "../controllers/temperatures.js";

const { findTemperaturesWithCityId } = TemperaturesController;
const router = express.Router();

router.get("/:city_id", async (req, res) => {
	try {
		const city_id = req.params.city_id;
		const temperatures = await findTemperaturesWithCityId(city_id);

		if (!temperatures[0]) {
			throw "Temperature samples not found";
		}

		const payload = {
			city_id,
			min: getMinOrMax("min", temperatures),
			max: getMinOrMax("max", temperatures),
			sample: temperatures.length
		};

		return res.status(200).json(payload);
	} catch (error) {
		return res.status(404).json({ message: "something went wrong", error });
	}
});

export default router;
