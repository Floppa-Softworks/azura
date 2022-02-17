import AzuraSocket from "./gateway/websocket";
import { ClientEvents, IAzuraClientConstructorOptions } from "../lib/types";
import { APIRequester } from "./rest/api";
import { TypedEmitter } from "tiny-typed-emitter";
import { UsersCache } from "./cache/users-cache";

export default class AzuraClient extends TypedEmitter<ClientEvents> {
	public ws: AzuraSocket;
	public api: APIRequester;

	public users: UsersCache;

	public token: string;

	protected debug = false;

	public constructor({ token, debug }: IAzuraClientConstructorOptions) {
		super();

		this.ws = new AzuraSocket(this);
		this.users = new UsersCache(this);
		this.api = new APIRequester(token);

		this.token = token;
		this.debug = debug ?? false;

		this.setupEventListeners();
	}

	private setupEventListeners() {
		this.on("debug", (msg) => {
			console.log(msg);
		});
	}

	public login() {
		this.ws.connect();
	}

	public sendDebug(...message: (string | number | boolean)[]) {
		if (this.debug) {
			this.emit(
				"debug",
				`[DEBUG (${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()})]: ${message.join(
					" ",
				)}`,
			);
		}
	}
}
