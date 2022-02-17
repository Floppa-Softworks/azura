/* eslint-disable */

import AzuraClient from "../client";
export class BaseDispatch {
	public name: string | undefined;

	// @ts-ignore
	public handle(client: AzuraClient, data: unknown) {}
}
