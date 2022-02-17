import {
	APIUser,
	RESTPostAPIChannelMessageJSONBody,
	Routes,
} from "discord-api-types/v9";
import { RestManager } from "./rest-manager";

export class APIRequester {
	public rest: RestManager;

	public constructor(token: string) {
		this.rest = new RestManager(token);
	}

	// Request Methods
	public async fetchUser(userId: string) {
		return await this.rest.get<APIUser>(Routes.user(userId));
	}

	public async sendMessage(
		channelId: string,
		options: RESTPostAPIChannelMessageJSONBody,
	) {
		return await this.rest.post(Routes.channelMessages(channelId), options);
	}
}
