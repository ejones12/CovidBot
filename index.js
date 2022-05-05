/**
 * Main project runner - Creates a Discord Bot client on command and sets up necessary
 * data structres and commands for it to communicate with clients
 */

const Discord = require('discord.js');
const { setServers } = require('dns');
const fs = require('fs');
const cron = require('cron');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});
const prefix = '!'
client.commands = new Discord.Collection();

//
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

// Bot would probably need to keep a list of subscribed users for each category.
//Maps client objects to a discorb id
const subscribedUsers = new Map(); 

const categories = ['general', 'travel', 'vaccines', 'masks'];//

//Displays message in terminal once ready signal is sent from bot
client.once('ready', () => {
    console.log('CovidBot is ready!\n');
});

// Funconality to handle incoming messages from client
client.on('messageCreate', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    console.log(`Command: ${command}`);
    console.log(`Arguments: ${args}`);

    if(command === 'ping') {
        client.commands.get('ping').execute(message, args);
    } else if (command === 'alerts') {
        client.commands.get('alerts').execute(message, args, subscribedUsers, categories);
    } else if (command === 'unsubscribe') {
        client.commands.get('unsubscribe').execute(message, args, subscribedUsers, categories);
    } else if (command === 'help') {
        client.commands.get('help').execute(message, args);
    } else if(command === 'information') {
        client.commands.get('information').execute(message, args, subscribedUsers);
    } else {
        message.channel.send('Invalid command. Try !help.');
    }
});

// Creates CronJob that runs at 10:00AM everyday, scraps the CDC Twitter and sends notifications to
//currently subscribed clients based on their assigned topics
let scheduledMessage = new cron.CronJob('00 10 * * *', () => {
    
    // Specifing your guild (server) and your channel
    const guild = client.guilds.cache.get('943632194474242109');
    const channel = guild.channels.cache.get('947999201793568798');
    console.log('Running cron job for alerts');

    const { spawn } = require('child_process');
    const scrapingProg = spawn('python', ['./twitterScraper.py']);

    scrapingProg.on('exit', function(code) {
        console.log(`child process exited with code ${code}`);
        fs.readFile('./json_data/general_data.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                if (data.meta.result_count > 0) {
                    for (let [key, client] of subscribedUsers) {
                        if (client.isSubscribedTo('general')) {
                            client.sendDirectMessage(`General: ${data.data[0].text}`);
                        }
                    }
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err);
            }
        });
        fs.readFile('./json_data/masks_data.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                if (data.meta.result_count > 0) {
                    for (let [key, client] of subscribedUsers) {
                        if (client.isSubscribedTo('masks')) {
                            client.sendDirectMessage(`Masks: ${data.data[0].text}`);
                        }
                    }
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err);
            }
        });
        fs.readFile('./json_data/travel_data.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                if (data.meta.result_count > 0) {
                    for (let [key, client] of subscribedUsers) {
                        if (client.isSubscribedTo('travel')) {
                            client.sendDirectMessage(`Travel: ${data.data[0].text}`);
                        }
                    }
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err);
            }
        });
        fs.readFile('./json_data/vaccines_data.json', 'utf8', (err, jsonString) => {
            if (err) {
                console.log("Error reading file from disk:", err);
                return;
            }
            try {
                const data = JSON.parse(jsonString);
                if (data.meta.result_count > 0) {
                    for (let [key, client] of subscribedUsers) {
                        if (client.isSubscribedTo('vaccines')) {
                            client.sendDirectMessage(`Vaccines: ${data.data[0].text}`);
                        }
                    }
                }
            } catch(err) {
                console.log('Error parsing JSON string:', err);
            }
        });
    });
});
          
//  Starts CronJob
scheduledMessage.start()
    

// need to keep this token hidden
client.login(process.env.LOGIN_TOKEN); //process.env.LOGIN_TOKEN//OTQ4NDE4OTU3NDgyNzk1MDU4.Yh7h_A.kvW4TzMuLV3JxojSeoDRsVw9CRA'