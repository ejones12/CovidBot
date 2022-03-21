const Discord = require('discord.js');
const cron = require('cron');
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});

// We need to run it just one time and when the client is ready
    // Because then it will get undefined if the client isn't ready
    client.once("ready", () => {
        console.log(`Online as ${client.user.tag}`);
          
        let scheduledMessage = new cron.CronJob('00 15 12 * * *', () => {
        // This runs every day at 10:30:00, you can do anything you want
        // Specifing your guild (server) and your channel
           const guild = client.guilds.cache.get('id');
           const channel = guild.channels.cache.get('id');
           channel.send('Testing automated messages');
          });
              
          // When you want to start it, use:
          scheduledMessage.start()
      });