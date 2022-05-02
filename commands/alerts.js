const Client = require('../client.js');

module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args, subscriptions, categories) {
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
            if (arg === '--all') {
                var currClient;
                if (subscriptions.has(message.author.id)) {
                    console.log("IM ALREADY HERE");
                    currClient = subscriptions.get(message.author.id);
                    for (let category of categories) {
                        if (currClient.isSubscribedTo(category)) {
                            message.channel.send(`You are already subscribed to ${category} alerts.`);
                        } else {
                            currClient.addSubscription(category, "10:00AM");
                            message.channel.send(`You have subscribed to ${category} alerts. You will be notified at 10:00 AM each day.`);
                            message.author.send(`You have subscribed to ${category} alerts. To unsubscribe, enter the !unsubscribe command in the Discord channel.`);
                        }
                    }
                } else {
                    currClient = new Client(message.author);
                    for (let category of categories) {
                        currClient.addSubscription(category, "10:00AM");
                        message.channel.send(`You have subscribed to ${category} alerts. You will be notified at 10:00 AM each day.`);
                        message.author.send(`You have subscribed to ${category} alerts. To unsubscribe, enter the !unsubscribe command in the Discord channel.`);
                    }
                    subscriptions.set(message.author.id, currClient);
                }
                break;
            } else if (arg === '--categories') {
                message.channel.send("Categories: " + categories.toString());
            } else if (!categories.includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (subscriptions.has(message.author.id)) { 
                // need to check if the user is already subscribed
                let currClient = subscriptions.get(message.author.id);
                if (currClient.isSubscribedTo(arg)) {
                    let notifTime = currClient.getSubscriptionTime(arg);
                    message.channel.send(`Sorry, you are already subscribed to ${arg} alerts. You will receive notifications at ${notifTime}.`);
                } else {
                    currClient.addSubscription(arg, "10:00AM");
                    message.channel.send(`You have subscribed to ${arg} alerts. You will be notified at 10:00 AM each day.`);
                }
            } else {
                // need to set a default time for people to be notified or allow them to specify
                currClient = new Client(message.author);
                currClient.addSubscription(arg, "10:00AM");
                subscriptions.set(message.author.id, currClient);
                message.channel.send(`You have subscribed to ${arg} alerts. You will be notified at 10:00 AM each day.`);
                message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe, enter the !unsubscribe command in the Discord channel.`);
            }
        }
    }
}
