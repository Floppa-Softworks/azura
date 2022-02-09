import { WebSocket } from 'ws';
import { GATEWAY_URL } from '../lib/constants';
import {
	GatewayHelloData,
	GatewayOpcodes as Opcodes,
	GatewayReceivePayload,
} from 'discord-api-types/gateway';
import { GatewayPayload } from '../lib/types';
import AzuraClient from '../client/client';

export default class AzuraSocket {
	public lastHeartbeat: number = Date.now();

	public client: AzuraClient;
	public ws: WebSocket;
	public heartbeatInterval: number;

	// private hasGottenAck = false;
	// private sessionId = '';

	public constructor(client: AzuraClient) {
		this.client = client;
	}

	private identify() {
		this.sendData(Opcodes.Identify, {
			token: this.client.token,
			intents: 513,
			properties: {
				$os: 'linux',
				$browser: 'iocord',
				$device: 'iocord',
			},
		});
		setInterval(() => {
			console.log('heartbeat');

			this.ws.send(
				JSON.stringify({
					op: Opcodes.Heartbeat,
					d: null,
				}),
			);
		}, this.heartbeatInterval);
	}

	private sendData(op: Opcodes | number, data: GatewayPayload) {
		this.ws.send(JSON.stringify({ op, d: data }));
	}

	public wsOnMessage(json: string) {
		const { op: opcode, d: data }: GatewayReceivePayload = JSON.parse(json);
		switch (opcode) {
			case Opcodes.Hello: {
				console.log('Hello!');
				this.heartbeatInterval = (
					data as GatewayHelloData
				).heartbeat_interval;
				this.identify();
				break;
			}
			case Opcodes.HeartbeatAck: {
				this.client.sendDebug('Heartbeat Acknowledged!');
				break;
			}
		}
	}

	public connect() {
		this.ws = new WebSocket(GATEWAY_URL);
		this.client.sendDebug('connecting...');

		this.ws.on('open', () => {
			this.client.sendDebug('Socket Opened');
		});
		this.ws.on('message', (msg) =>
			this.wsOnMessage(msg as unknown as string),
		);
		this.ws.on('error', (err) =>
			this.client.sendDebug(`An Error Occured At websocket.ts: ${err}`),
		);
		this.ws.on('close', (code, reason) =>
			this.client.sendDebug(
				`Websocket closed with code \`${code}\`, and with reason \`${reason.toString()}\``,
			),
		);
	}
}
