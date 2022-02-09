import {
	GatewayIdentifyData,
	GatewayPresenceUpdateData,
	GatewayRequestGuildMembersData,
	GatewayResumeData,
	GatewayVoiceStateUpdateData,
	GatewayIntentBits,
} from 'discord-api-types/gateway';
import AzuraClient from '../client/client';

// Azura Client Constructor Options
export interface IAzuraClientConstructorOptions {
	token: string;
	intents: GatewayIntentBits[];
	debug?: boolean;
}

export interface IEvent {
	name: string;
	handle: (client: AzuraClient, data: GatewayPayload) => void;
}

export type GatewayPayload =
	| number
	| GatewayIdentifyData
	| GatewayPresenceUpdateData
	| GatewayVoiceStateUpdateData
	| GatewayResumeData
	| GatewayRequestGuildMembersData;
