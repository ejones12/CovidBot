const Client = require('../client.js');
/**
 * Functionality for alerts command.Uses message sent by user to determine how to subscribe, unsubscribe and notify users. 
 * When a new user is found, they are added to a list of existing clients
 */
module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args, subscriptions, categories) {

        // It seems like we wouldn't want every user's alerts to be sent to one
        // channel because users would have to search to find the alerts
        // they're interested in (defeats the purpose of personalized alerts).
        // It may be better to send alerts as direct messages to the users.
        console.log(message.author);
        
        //Did not provide category to subscribe to
        if (args.length === 0) {
            message.channel.send('Please include a category to subscribe to: travel, vaccines, masks');
            return;
        }
       
        for (arg of args) {
            if (arg === '--all') { //if user wants to subscribe to all categories
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
            } else if (arg === '--categories') { //lists all existing categories
                message.channel.send("Categories: " + categories.toString());
                message.channel.send("Please type '!alerts [category]' to subscribe to alerts. Ex: '!alerts masks'")
            } else if (!categories.includes(arg)) { //determins if arguement is included in the category
                message.channel.send(`"${arg}" is not a category.`);
            } else if (subscriptions.has(message.author.id)) { // need to check if the user is already subscribed
                let currClient = subscriptions.get(message.author.id);
                if (currClient.isSubscribedTo(arg)) {
                    let notifTime = currClient.getSubscriptionTime(arg);
                    message.channel.send(`Sorry, you are already subscribed to ${arg} alerts. You will receive notifications at ${notifTime}.`);
                } else {
                    currClient.addSubscription(arg, "10:00AM");
                    message.channel.send(`You have subscribed to ${arg} alerts. You will be notified at 10:00 AM each day.`);
                }
            } else { //creates new client object and adds new subscription
                currClient = new Client(message.author);
                currClient.addSubscription(arg, "10:00AM");
                subscriptions.set(message.author.id, currClient);
                message.channel.send(`You have subscribed to ${arg} alerts. You will be notified at 10:00 AM each day.`);
                message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe, enter the !unsubscribe command in the Discord channel.`);
            }
        }
    }
}
