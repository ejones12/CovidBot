const Discord = require('discord.js');
const { setServers } = require('dns');
const fs = require('fs');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = '$'
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Bot would probably need to keep a list of subscribed users for each category.
// Using sets to ensure we don't have duplicates.
const subscribedUsers = {
    'travel': new Set(),
    'vaccines': new Set(),
    'masks': new Set()
};

client.once('ready', () => {
    console.log('CovidBot is ready!')
});

// code from CodeLyon
client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`Command: ${command}`);
    console.log(`Arguments: ${args}`);

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'alerts') {
        client.commands.get('alerts').execute(message, args, subscribedUsers);
    }
});

// need to keep this token hidden
client.login('OTQ4NDE4OTU3NDgyNzk1MDU4.Yh7h_A.kvW4TzMuLV3JxojSeoDRsVw9CRA');