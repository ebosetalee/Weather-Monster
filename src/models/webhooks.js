import { EntitySchema } from "typeorm";

const Webhooks = new EntitySchema({
	name: "Webhooks",
	tableName: "Webhooks",
	columns: {
		id: {
			type: "int",
			primary: true,
			generated: true,
			generationStrategy: 1
		},
		callback_url: {
			type: "varchar",
			name: "callback_url",
			nullable: false
		},
		city_id: {
			name: "city_id",
			type: "int",
			nullable: false
		}
	}
});

export default Webhooks;
