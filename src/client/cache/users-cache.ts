import { APIUser, Snowflake } from "discord-api-types";
import AzuraClient from "../client";
import { BaseCache } from "./base";

export class UsersCache extends BaseCache<Snowflake, APIUser> {
	public client: AzuraClient;

	public constructor(client: AzuraClient) {
		super();
		this.client = client;
	}

	public fetch(userId: string) {
		return this.client.api.fetchUser(userId);
	}
}
