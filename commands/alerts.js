module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args, subscriptions) {
        // Should the Bot send the alerts to a specific Discord channel?
        // It seems like we wouldn't want every user's alerts to be sent to one
        // channel because users would have to search to find the alerts
        // they're interested in (defeats the purpose of personalized alerts).
        // It may be better to send alerts as direct messages to the users.
        console.log(message.author);
        
        if (args.length === 0) {
            message.channel.send('Please include a category to subscribe to: travel, vaccines, masks');
            return;
        }

        for (arg of args) {
            if (arg === '-all') {
                message.channel.send("You have subscribed to all alerts.")
                subscriptions['travel'].add(message.author);
                subscriptions['vaccines'].add(message.author);
                subscriptions['masks'].add(message.author);
                break;
            } else if (arg === '-categories') {
                message.channel.send("travel\nvaccines\nmasks");
            } else if (!Object.keys(subscriptions).includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (subscriptions[arg].has(message.author)) {
                // need to check if the user is already subscribed
                message.channel.send(`You are already subscribed to ${arg} alerts.`);
            } else {
                message.channel.send(`You have subscribed to ${arg} alerts.`);
                message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe, enter the $unsubscribe command in the Discord channel.`);
                subscriptions[arg].add(message.author);
            }
        }
    }
}