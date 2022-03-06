const Discord = require('discord.js');

const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES"]});


client.once('ready', () => {
    console.log('CovidBot is ready!')
})


// need to keep this token hidden
client.login('OTQ4NDE4OTU3NDgyNzk1MDU4.Yh7h_A.kvW4TzMuLV3JxojSeoDRsVw9CRA');