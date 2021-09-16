import Cities from "../models/cities.js";
import { getRepository } from "typeorm";

const cityRepository = () => {
	return getRepository(Cities);
};
const CitiesController = {
	async createCity(payload) {
		const newCity = await cityRepository().save(payload);
		const city = cityRepository().findOneOrFail({
			where: { id: newCity.id }
		});
		return city;
	},

	async findAllCities() {
		const findCities = await cityRepository().find();
		return findCities;
	},

	async findCityById(id) {
		const findCity = await cityRepository().findOne({
			where: { id }
		});
		return findCity;
	},

	async updateCityById(id, body) {
		await cityRepository().update(id, body);
		const updatedCity = await cityRepository().findOne({ where: { id } });

		return updatedCity;
	},

	async deleteCityById(id) {
		const deleteCity = await cityRepository().findOne({ where: { id } }); 
		await cityRepository().delete(id);
		
		return deleteCity;
	}
};

export default CitiesController;
