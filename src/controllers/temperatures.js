import Temperatures from "../models/temperatures.js";
import { getRepository } from "typeorm";

const TemperatureRepository = () => {
	return getRepository(Temperatures);
};
const TemperaturesController = {
	async createTemperature(payload) {
		try {
			const Temperature = await TemperatureRepository().save(payload);
			return Temperature;
		} catch (error) {
			return error;
		}
	},

	async findAllTemperatures() {
		try {
			const findTemperatures = await TemperatureRepository().find();
			return findTemperatures;
		} catch (error) {
			return error;
		}
	},

	async findTemperaturesWithCityId(city_id) {
		try {
			const getTemperatures = await TemperatureRepository().find({
				where: { city_id }
			});
			return getTemperatures;
		} catch (error) {
			return error;
		}
	}
};

export default TemperaturesController;
