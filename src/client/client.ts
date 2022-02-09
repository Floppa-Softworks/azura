import { EventEmitter } from 'events';
import AzuraSocket from '../gateway/websocket';
import { IAzuraClientConstructorOptions } from '../lib/types';

export default class AzuraClient extends EventEmitter {
	public ws: AzuraSocket;
	public token: string;
	protected debug = false;

	public constructor({ token, debug }: IAzuraClientConstructorOptions) {
		super();

		this.ws = new AzuraSocket(this);
		this.token = token;
		this.debug = debug ?? false;

		this.setupEventListeners();
	}

	private setupEventListeners() {
		this.on('debug', (msg) => {
			console.log(msg);
		});
	}

	public login() {
		this.ws.connect();
	}

	public sendDebug(...message: (string | number | boolean)[]) {
		if (this.debug) {
			this.emit(
				'debug',
				`[DEBUG (${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()})]: ${message.join(
					' ',
				)}`,
			);
		}
	}
}
