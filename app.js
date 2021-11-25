require('dotenv').config();
const Ds = require('discord.js'),
intents =  new Ds.Intents(32767),
Client = new Ds.Client({ intents });

Client.cooldowns = new Set();
Client.timers = new Map();

Client.author = 330420816976281600;

Client.login(process.env.TOKEN);

Client.on('ready', require('./Data/Events/ready'));

Client.on('messageCreate', (msg) => require('./Data/Events/messageCreate')(Client, msg));