import { APIMessage } from "discord-api-types";
import AzuraClient from "../../client";
import { Message } from "../../../structures/Message";
import { BaseDispatch } from "../dispatcher";

export default class MessageCreateDispatcher extends BaseDispatch {
	public name = "MESSAGE_CREATE";
	public handle(client: AzuraClient, data: APIMessage) {
		const message = new Message(client, data);
		client.emit("messageCreate", message);
	}
}
