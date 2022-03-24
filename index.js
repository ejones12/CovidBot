const Discord = require('discord.js');
const cron = require('cron');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

const prefix = "-";

client.once('ready', () => {
    console.log('CovidBot is ready!');
  
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

    
});

//console.log(`Online as ${client.user.tag}`);
          
let scheduledMessage = new cron.CronJob('00 00 08 * * *', () => {
// This runs every day at 10:30:00, you can do anything you want
// Specifing your guild (server) and your channel
   const guild = client.guilds.cache.get('943632194474242109');
   const channel = guild.channels.cache.get('947999201793568798');
   channel.send('Automated update every day at 1:05pm');
  });
      
  // When you want to start it, use:
  scheduledMessage.start()


// need to keep this token hidden
client.login('OTQ4NDE4OTU3NDgyNzk1MDU4.Yh7h_A.kvW4TzMuLV3JxojSeoDRsVw9CRA');