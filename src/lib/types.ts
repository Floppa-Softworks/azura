import {
	GatewayIdentifyData,
	GatewayPresenceUpdateData,
	GatewayRequestGuildMembersData,
	GatewayResumeData,
	GatewayVoiceStateUpdateData,
	GatewayIntentBits,
} from "discord-api-types/gateway";
import AzuraClient from "../client/client";
import { Collection } from "collection-data";
import type {
	APIActionRowComponent,
	APIEmbed,
	APIUser,
	Snowflake,
} from "discord-api-types";
import { Message } from "../structures/Message";
import { EmbedBuilder } from "../structures/builders/embed/EmbedBuilder";

export type FileExtensions = "jpeg" | "gif" | "webp" | "jpg" | "png";
export type RawEmbedData = APIEmbed;

export type RequestMethod = "GET" | "PUT" | "PATCH" | "POST" | "DELETE";

export type Nullable<T> = T | null;
export type Noop = () => void;

export type GatewayPayload =
	| number
	| GatewayIdentifyData
	| GatewayPresenceUpdateData
	| GatewayVoiceStateUpdateData
	| GatewayResumeData
	| GatewayRequestGuildMembersData;

export interface MessageReplyOptions {
	content?: string;
	embeds?: EmbedBuilder | APIEmbed;
	components?: APIActionRowComponent[];
}

export interface IEvent {
	name: string;
	handle: (client: AzuraClient, data: GatewayPayload) => void;
}

export interface IAzuraCache {
	// placeholder APIUser until i implement an actual user structure
	users: Collection<Snowflake, APIUser>;
}

export interface ClientEvents {
	debug: (message: string) => void;
	messageCreate: (message: Message) => void;
	ready: Noop;
}

export interface IAzuraClientConstructorOptions {
	token: string;
	intents: GatewayIntentBits[];
	debug?: boolean;
}
