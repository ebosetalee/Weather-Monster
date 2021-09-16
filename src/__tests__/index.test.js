import request from "supertest";
import { createConnection } from "typeorm";
import faker from "faker";
import {StatusCodes} from "http-status-codes";
import { app } from "../app.js";
import Cities from "../models/cities.js";
import Temperatures from "../models/temperatures.js";

const connection = await createConnection({
	type: "mysql",
	username: "test",
	password: "test",
	database: "test",
	synchronize: true,
	dropSchema: true,
	entities: [Cities, Temperatures]
});

beforeEach(async () => {
	if (!connection.isConnected) {
		await connection.connect();
	}
});

afterEach(async () => {
	await connection.close();
});

async function createCity() {
	const payload = {
		name: faker.address.cityName(),
		latitude: faker.address.latitude(),
		longitude: faker.address.longitude()
	};

	const { body } = await request(app).post("/api/v1/cities").send(payload);

	return body;
}

async function addTemperature(city_id) {
	const payload = {
		min: faker.datatype.number({ max: 100 }),
		max: faker.datatype.number({ max: 100 }),
		timestamp: faker.time.recent(),
		city_id: city_id
	};

	const { body } = await request(app)
		.post("/api/v1/temperatures")
		.send(payload);

	return body;
}

describe("Cities Controller test", () => {
	test("should create a city in the database", async () => {
		const payload = {
			name: faker.address.cityName(),
			latitude: faker.address.latitude(),
			longitude: faker.address.longitude()
		};

		const { body, status } = await request(app)
			.post("/api/v1/cities")
			.send(payload);

		expect(status).toBe(StatusCodes.CREATED);
		expect(body.name).toBe(payload.name);
		expect(body.latitude).toBe(payload.latitude);
		expect(body.longitude).toBe(payload.longitude);
	});

	test("should get all cities in the database", async () => {
		const city = await createCity();

		const { body, status } = await request(app).get("/api/v1/cities");

		expect(status).toBe(StatusCodes.OK);
		expect(body.length).toBe(1);
		expect(body[0].id).toBe(city.id);
		expect(body[0].name).toBe(city.name);
	});

	test("should return error if city not in the database", async () => {
		const { body, status } = await request(app).get("/api/v1/cities/" + 12);

		expect(status).toBe(StatusCodes.NOT_FOUND);
		expect(body.message).toMatch(/not found/i);
	});

	test("should update a city using it's id", async () => {
		const city = await createCity();
		const payload = {
			name: city.name,
			latitude: faker.address.latitude(),
			longitude: faker.address.longitude()
		};

		const { body, status } = await request(app)
			.patch("/api/v1/cities/" + city.id)
			.send(payload);
		expect(status).toBe(StatusCodes.OK);
		expect(body.id).toBe(city.id);
		expect(body.latitude).toBe(payload.latitude);
		expect(body.longitude).toBe(payload.longitude);
	});

	test("should delete a city and return it details", async () => {
		const city = await createCity();

		const { body, status } = await request(app).delete(
			"/api/v1/cities/" + city.id
		);

		expect(status).toBe(StatusCodes.OK);
		expect(body.id).toBe(city.id);
		expect(body.name).toBe(city.name);
		expect(body.latitude).toBe(city.latitude);
		expect(body.longitude).toBe(city.longitude);
	});
});

describe("Temperatures Controller test", () => {
	test("should add temperature with foreign key city_id to the database", async () => {
		const city = await createCity();
		const payload = {
			min: faker.datatype.number({ max: 100 }),
			max: faker.datatype.number({ max: 100 }),
			timestamp: faker.time.recent(),
			city_id: city.id
		};

		const { body, status } = await request(app)
			.post("/api/v1/temperatures")
			.send(payload);

		expect(status).toBe(StatusCodes.CREATED);
		expect(body.city_id).toBe(payload.city_id);
		expect(body.min).toBe(payload.min);
		expect(body.max).toBe(payload.max);
	});

	test("should return all temperatures", async () => {
		const city = await createCity();
		const temperature = await addTemperature(city.id);

		const { body, status } = await request(app).get("/api/v1/temperatures");

		expect(status).toBe(StatusCodes.OK);
		expect(body.length).toBe(1);
		expect(body[0].id).toBe(temperature.id);
		expect(body[0].min).toBe(temperature.min);
		expect(body[0].min).toBe(temperature.min);
	});
});

describe("Forecast Controllers test", () => {
	test("should make a forecast using temperatures", async () => {
		const city = await createCity();
		await addTemperature(city.id);
		await addTemperature(city.id);

		const tempRes = await request(app).get("/api/v1/temperatures");
		const tempBody = tempRes["body"];
		const { body, status } = await request(app).get(
			"/api/v1/forecasts/" + 1
		);

		expect(status).toBe(StatusCodes.OK);
		expect(body.sample).toBe(tempBody.length);
	});

	test("should throw error if no Temperature is found", async () => {
		const city = await createCity();

		const { body, status } = await request(app).get(
			"/api/v1/forecasts/" + city.id
		);

		expect(status).toBe(StatusCodes.NOT_FOUND);
		expect(body.error).toMatch(/not found/i);
	});
});
