/* eslint-disable @typescript-eslint/no-explicit-any */
import { Routes } from "discord-api-types";
import { API_URL } from "../../lib/constants";

import fetch from "node-fetch";
import { AzuraDiscordAPIError } from "../../lib/utils";

export class RestManager {
	private token: string;

	public constructor(token: string) {
		this.token = token;
	}

	private checkIfErrored(body: { [key: string]: any }): never | void {
		if (Boolean(body.code) && Boolean(body.message)) {
			throw new AzuraDiscordAPIError(body.message, body.code);
		}
	}

	public async get<T>(endpoint: string | typeof Routes): Promise<T> {
		const res = await fetch(API_URL + endpoint, {
			method: "GET",
			headers: {
				Authorization: `Bot ${this.token}`,
				"User-Agent": "Bot",
				"Content-Type": "application/json",
			},
		});
		const json = await res.json();
		this.checkIfErrored(json);
		return json as T;
	}

	public async post<T, J>(
		endpoint: string | typeof Routes,
		body: J,
	): Promise<T> {
		const res = await fetch(API_URL + endpoint, {
			method: "POST",
			headers: {
				Authorization: `Bot ${this.token}`,
				"User-Agent": "DiscordBot (azura)",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const json = await res.json();
		this.checkIfErrored(json);
		return json as T;
	}

	public async patch<T, J>(
		endpoint: string | typeof Routes,
		body: J,
	): Promise<T> {
		const res = await fetch(API_URL + endpoint, {
			method: "PATCH",
			headers: {
				Authorization: `Bot ${this.token}`,
				"User-Agent": "DiscordBot (azura)",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(body),
		});
		const json = await res.json();
		this.checkIfErrored(json);
		return json as T;
	}
}
