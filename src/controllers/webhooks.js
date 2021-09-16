import Webhooks from "../models/webhooks.js";
import { getRepository } from "typeorm";

const WebhookRepository = () => {
	return getRepository(Webhooks);
};

const webhookController = {
	async createWebhook(payload) {
		try {
			const webhook = await WebhookRepository().save(payload);

			return webhook;
		} catch (error) {
			return error;
		}
	},

	async findWebhooks(city_id) {
		try {
			const findWebhook = await WebhookRepository().find({
				where: { city_id }
			});

			return findWebhook;
		} catch (error) {
			return error;
		}
	},

	async deleteWebhook(id) {
		try {
			const deleted = await WebhookRepository().delete(id);

			return deleted;
		} catch (error) {
			return error;
		}
	}
};

export default webhookController;
