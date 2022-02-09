import AzuraClient from './client/client';

const client = new AzuraClient({
	token: 'ODgwMTc1NzQ2MzU2NzQwMTc3.YSadig.8Ptkz9kQEOrn1kXOWZks6RaSpJw',
	intents: [],
	debug: true,
});

client.login();
