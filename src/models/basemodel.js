import EntitySchemaColumnOptions from "typeorm";

export const BaseColumnsSchemaPart = {
	id: {
		type: "int",
		primary: true,
		generated: true,
		generationStrategy: 1
	},

	createdAt: {
		name: "created_at",
		type: "timestamp",
		createDate: true
	},

	updatedAt: {
		name: "updated_at",
		type: "timestamp",
		updateDate: true
	}
};

EntitySchemaColumnOptions.BaseColumnsSchemaPart = BaseColumnsSchemaPart;
