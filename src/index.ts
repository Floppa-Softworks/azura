import AzuraClient from "./client/client";
import { EmbedBuilder } from "./structures/builders/embed/EmbedBuilder";

// Create the client
const client = new AzuraClient({
	token: "",
	intents: [],
	debug: true,
});

// Setup the event listeners
client.on("ready", () => {
	console.log("TEST: CLIENT READY!");
});

client.on("messageCreate", async (message) => {
	if (message.content === "!hello") {
		const response = await client.api.sendMessage(message.channelId, {
			content: "fuck balls",
		});
		console.log(response);
	}
});

const embed = new EmbedBuilder();
embed.setTitle("hello".repeat(300));

// Login
client.login();
