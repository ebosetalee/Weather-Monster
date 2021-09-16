import express from "express";
import CitiesController from "../controllers/cities.js";

const {
	createCity,
	findAllCities,
	updateCityById,
	findCityById,
	deleteCityById
} = CitiesController;

const router = express.Router();

router.post("/", async (req, res) => {
	try {
		const city = await createCity(req.body);

		return res.status(201).json(city);
	} catch (error) {
		return res.status(400).json({ message: "something went wrong", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const cities = await findAllCities();
		return res.status(200).json(cities);
	} catch (error) {
		return res.status(400).json({ message: "something went wrong", error });
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const cities = await findCityById(id);
		if (!cities) {
			return res.status(404).json({ message: "City is not found" });
		}
		return res.status(200).json(cities);
	} catch (error) {
		return res.status(400).json({ message: "something went wrong", error });
	}
});

router.patch("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const cities = await updateCityById(id, req.body);
		return res.status(200).json(cities);
	} catch (error) {
		console.log(error);
		return res.status(400).json({ message: "something went wrong", error });
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const cities = await deleteCityById(id);

		return res.status(200).json(cities);
	} catch (error) {
		return res.status(400).json({ message: "something went wrong", error });
	}
});

export default router;
