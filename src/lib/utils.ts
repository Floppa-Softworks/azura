import { readdir } from "fs/promises";
import { GATEWAY_EVENTS_DIR } from "./constants";
import { BaseDispatch } from "../client/gateway/dispatcher";
import { resolve } from "path";
import { RESTJSONErrorCodes } from "discord-api-types";

export class Utils {
	public static async getGatewayEvents() {
		const allImported: BaseDispatch[] = [];
		const dir = resolve(__dirname, GATEWAY_EVENTS_DIR);

		const files: string[] = (await readdir(dir)).filter((file) =>
			file.endsWith(".js"),
		);
		try {
			for (const file of files) {
				const Dispatcher: typeof BaseDispatch = (
					await import(`../gateway/dispatchers/${file}`)
				).default;
				allImported.push(new Dispatcher());
			}
			return allImported;
		} catch (err) {
			throw `[FATAL ERROR]: One of the Dispatcher files doesn't export a class! Please find the file and export a dispatcher.`;
		}
	}
}

export class AzuraError extends Error {
	public constructor(message: string) {
		super(message);
	}
}

export class AzuraDiscordAPIError extends Error {
	public constructor(message: string, code: RESTJSONErrorCodes | number) {
		super([`Code: ${code}`, `Message: ${message}`].join("\n"));
	}
}
