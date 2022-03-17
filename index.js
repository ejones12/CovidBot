const Discord = require('discord.js');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const prefix = "-";

client.once('ready', () => {
    console.log('CovidBot is ready!')
});

client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'ping'){
        message.channel.send('pong!');
    } else if(command === 'youtube'){
        message.channel.send('https://www.youtube.com/codelyon');
    }else{
        message.channel.send('Sorry, this is not a command. Try again!');
    }
})


// need to keep this token hidden
client.login('OTQ4NDE4OTU3NDgyNzk1MDU4.Yh7h_A.kvW4TzMuLV3JxojSeoDRsVw9CRA');