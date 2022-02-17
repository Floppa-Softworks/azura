import { APIEmbed, APIMessage, APIActionRowComponent } from "discord-api-types";
import AzuraClient from "../client/client";
import { BaseStruct } from "./BaseStruct";

export class Message extends BaseStruct {
	public client: AzuraClient;

	public embeds: APIEmbed[];
	public components: APIActionRowComponent[];
	public content: string;

	public applicationId?: string;
	public channelId: string;

	public constructor(client: AzuraClient, data: APIMessage) {
		super(data.id);
		this.client = client;

		this.content = data.content;
		this.components = data.components ?? [];
		this.applicationId = data.application_id;
		this.embeds = data.embeds;
		this.channelId = data.channel_id;
	}
}
