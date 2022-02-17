import { WebSocket } from "ws";
import { GATEWAY_URL } from "../../lib/constants";
import {
	GatewayCloseCodes,
	GatewayHelloData,
	GatewayOpcodes as Opcodes,
	GatewayReceivePayload,
} from "discord-api-types/gateway";
import { GatewayPayload } from "../../lib/types";
import AzuraClient from "../client";
import { AzuraError } from "../../lib/utils";
import { Utils } from "../../lib/utils";

export default class AzuraSocket {
	public lastHeartbeat: number = Date.now();

	public client: AzuraClient;
	public ws!: WebSocket;
	public heartbeatInterval!: number;

	public constructor(client: AzuraClient) {
		this.client = client;
		this.heartbeatInterval = 0;
	}

	private identify() {
		this.sendData(Opcodes.Identify, {
			token: this.client.token,
			intents: 513,
			properties: {
				$os: "linux",
				$browser: "iocord",
				$device: "iocord",
			},
		});
		this.heartbeat(this.heartbeatInterval);
	}

	public heartbeat(interval: number) {
		setInterval(() => {
			this.ws.send(
				JSON.stringify({
					op: Opcodes.Heartbeat,
					d: null,
				}),
			);
			this.client.sendDebug("Sending a heartbeat...");
		}, interval);
	}

	private sendData(op: Opcodes | number, data: GatewayPayload) {
		this.ws.send(JSON.stringify({ op, d: data }));
	}

	public async wsOnMessage(json: string) {
		const {
			op: opcode,
			d: data,
			t: event,
		}: GatewayReceivePayload = JSON.parse(json);
		switch (opcode) {
			case Opcodes.Hello: {
				this.client.sendDebug("Got Hello Opcode!");
				this.heartbeatInterval = (
					data as GatewayHelloData
				).heartbeat_interval;
				this.identify();
				break;
			}
			case Opcodes.HeartbeatAck: {
				this.client.sendDebug("Heartbeat Acknowledged!");
				break;
			}
			case Opcodes.Dispatch: {
				const dispatchers = await Utils.getGatewayEvents();
				const dispatcher = dispatchers.find(
					(dispatcher) => dispatcher.name === event,
				);
				if (dispatcher) {
					dispatcher.handle(this.client, data);
				}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.client.sendDebug(event!);
			}
		}
	}

	public connect() {
		this.ws = new WebSocket(GATEWAY_URL);
		this.client.sendDebug("Connecting to gateway...");

		this.ws.on("open", () => {
			this.client.sendDebug("Socket Opened!");
		});
		this.ws.on("message", (msg) =>
			this.wsOnMessage(msg as unknown as string),
		);
		this.ws.on("error", (err) =>
			this.client.sendDebug(`An Error Occured At websocket.ts: ${err}`),
		);
		this.ws.on("close", (code, reason) => {
			if (code == GatewayCloseCodes.AuthenticationFailed) {
				throw new AzuraError("Token provided with client is invalid!");
			}
			this.client.sendDebug(
				`Websocket closed with code \`${code}\`, and with reason \`${reason.toString()}\``,
			);
		});
	}
}
