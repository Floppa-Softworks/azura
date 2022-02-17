import AzuraClient from "../../client";
import { BaseDispatch } from "../dispatcher";

export default class ReadyDispatcher extends BaseDispatch {
	public name = "READY";
	public handle(client: AzuraClient) {
		client.emit("ready");
	}
}
