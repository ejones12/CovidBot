const Client  = require('./client.js');

module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args, subscriptions,categories,discordClient) {
        // Should the Bot send the alerts to a specific Discord channel?
        // It seems like we wouldn't want every user's alerts to be sent to one
        // channel because users would have to search to find the alerts
        // they're interested in (defeats the purpose of personalized alerts).
        // It may be better to send alerts as direct messages to the users.
        console.log(message.author);
        // console.log(subscriptions);
        
        if (args.length === 0) {
            message.channel.send('Please include a category to subscribe to: travel, vaccines, masks');
            return;
        }
        //need to add check for current user if they are already subscribed
        for (arg of args) {
            if (arg === '-all') {
                var currClient;
                if(subscriptions.has(message.author.id)){
                    console.log("IM ALREADY HERE")
                    currClient = subscriptions.get(message.author.id);
                    for(let key of categories){
                        if(currClient.getInfoMap().has(key)){
                            message.channel.send(`You are already subscribed to ${key} alerts.`)
                        }else {
                            currClient.addCategory(key,"10:00AM");
                            message.channel.send(`You have subscribed to ${key} alerts.`);
                            message.author.send(`You have subscribed to ${key} alerts. To unsubscribe, enter the $unsubscribe command in the Discord channel.`);
               
                            message.channel.send('You will be notified at 10:00AM each day.');
                        }
                    }
                } else {
                    currClient = new Client(message.author);
                    for (key in categories){
                        currClient.addCategory(key,"10:00AM");
                        message.channel.send(`You have subscribed to ${arg} alerts.`);
                        message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe, enter the $unsubscribe command in the Discord channel.`);
           
                        message.channel.send('You will be notified at 10:00AM each day.');
                   
                    }
                    subscriptions.set(message.author.id, currClient);
                }
            
                message.channel.send("You have subscribed to all alerts.")
                break;
            } else if (arg === '-categories') {
                message.channel.send("Categories: " + categories.toString());
            } else if (!categories.includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (subscriptions.has(message.author.id)) { 
                // need to check if the user is already subscribed
                let currClient = subscriptions.get(message.author.id);
                let notifTime =  currClient.getInfoMap().get(arg);
                message.channel.send(`Sorry, you are already subscribed to ${arg} alerts. You will receive notifications at ${notifTime}`);
            } else {

                message.channel.send(`You have subscribed to ${arg} alerts.`);
                message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe, enter the $unsubscribe command in the Discord channel.`);
               
                 var curr;
                if(args.length > 2){
                    //TODO: Need to figure out how to get time from arguments

                    //curr = new Client(message.author,arg, args[arg]);
                   // message.channel.send('You will be notified at ' + )
                }else {
                    
                   curr = new Client(message.author);
                   curr.addCategory(arg,"10:00AM");
                   message.channel.send('You will be notified at 10:00AM each day.');
                }
                
             
                subscriptions.set(message.author.id, curr);
                
                 //need to set a default time for people to be notified or allow them to specify
            }
        }
    }


  

}
