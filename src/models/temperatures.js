import { EntitySchema } from "typeorm";
import { BaseColumnsSchemaPart } from "./basemodel.js";

const Temperatures = new EntitySchema({
	name: "Temperatures",
	tableName: "Temperatures",
	columns: {
		...BaseColumnsSchemaPart,
		min: {
			type: "int"
		},
		max: {
			type: "int"
		},
		timestamp: {
			name: "timestamp",
			type: "bigint",
			nullable: false
		}
	},
	relations: {
		city_id: {
			target: "Cities",
			type: "many-to-one",
			cascade: "delete",
			joinColumn: {
				name: "city_id",
				referencedColumnName: "id"
			}
		}
	}
});

export default Temperatures;
