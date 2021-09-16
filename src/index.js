import "dotenv/config";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { app, port } from "./app.js";
import Cities from "./models/cities.js";
import Temperatures from "./models/temperatures.js";
import Webhooks from "./models/webhooks.js";

createConnection({
	type: "mysql",
	host: process.env.DATABASE_HOST,
	port: process.env.DATABASE_PORT,
	username: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
	dropSchema: true,
	synchronize: true,
	entities: [Temperatures, Cities, Webhooks],
	migrationsTableName: "custom_migration_table",
	migrations: ["./src/models/migration/*.js"]
})
	.then(
		console.log("Connected to Database...."),
		app.listen(port, () => {
			console.log(`server is runnng on port: ${port}`);
		})
	)
	.catch((error) => console.log(error));
