import { RouteBases } from "discord-api-types/v9";

export const API_URL = RouteBases.api;
export const CDN_URL = RouteBases.cdn;

export const GATEWAY_EVENTS_DIR = "../gateway/dispatchers" as const;
export const GATEWAY_URL =
	"wss://gateway.discord.gg/?v=9&encoding=json" as const;

export const VALID_FILE_EXTENSIONS = [
	"jpeg",
	"gif",
	"webp",
	"jpg",
	"png",
] as const;
