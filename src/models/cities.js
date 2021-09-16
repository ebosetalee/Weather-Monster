import { EntitySchema } from "typeorm";
import { BaseColumnsSchemaPart } from "./basemodel.js";

const Cities = new EntitySchema({
	name: "Cities",
	tableName: "Cities",
	columns: {
		...BaseColumnsSchemaPart,
		name: {
			type: "varchar",
			unique: true
		},
		latitude: {
			type: "varchar"
		},
		longitude: {
			type: "varchar"
		}
	}
});

export default Cities;
