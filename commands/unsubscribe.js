const Client = require('../client.js');

module.exports = {
    name: 'unsubscribe',
    description: "Allows the user to unsubscribe from alerts.",
    execute(message, args, subscriptions, categories) {
        console.log(message.author);

        if (args.length === 0) {
            message.channel.send('Please include a category to unsubscribe from: travel, vaccines, masks');
            return;
        }

        for (arg of args) {
            if (arg === '--categories') {
                message.channel.send("Categories: " + categories.toString());
            } else if (!subscriptions.has(message.author.id)) {
                message.channel.send(`You are not currently subscribed to alerts.`);
                break;
            } else if (arg === '--all') {
                var currClient;
                currClient = subscriptions.get(message.author.id);
                for (let category of categories){
                    if (currClient.isSubscribedTo(category)) {
                        currClient.removeSubscription(category);
                    }
                }
                subscriptions.delete(message.author.id);
                message.channel.send("You have unsubscribed from all alerts.");
                break;
            } else if (!categories.includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else {
                var currClient = subscriptions.get(message.author.id);
                if (!currClient.isSubscribedTo(arg)) {
                    message.channel.send(`You are not currently subscribed to ${arg} alerts.`);
                } else {
                    currClient.removeSubscription(arg);
                    if (currClient.getNumSubscriptions() === 0) {
                        subscriptions.delete(message.author.id);
                    }
                    message.channel.send(`You have unsubscribed from ${arg} alerts.`);
                }
            }
        }
    }
}