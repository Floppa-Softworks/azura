// The Base Structure, all Structures extend this.

import { Snowflake } from "discord-api-types";

export abstract class BaseStruct {
	public id: Snowflake;

	public constructor(id: Snowflake) {
		this.id = id;
	}

	get createdAt() {
		const epoch = 1420070400000;
		let binary = "";
		const snowflake = this.id.toString();

		// Thanks to whoever made this on stack overflow (i forgor 💀)
		try {
			let high = parseInt(snowflake.slice(0, -10));
			let low = parseInt(snowflake.slice(-10));

			while (high > 0 || low > 0) {
				binary = String(low & 1) + binary;
				low = Math.floor(low / 2);
				if (high > 0) {
					low += 5000000000 * (high % 2);
					high = Math.floor(high / 2);
				}
			}

			binary = (binary as unknown as Buffer)
				.toString("binary")
				.padStart(64, "0");
			const unix = parseInt(binary.substring(0, 42), 2) + epoch;
			return new Date(unix);
		} catch {
			return false;
		}
	}
}
