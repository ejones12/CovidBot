module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args, subscriptions) {
        // Do we need to store each user's subscriptions?
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
            if (!Object.keys(subscriptions).includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (subscriptions[arg].has(message.author)) {
                // need to check if the user is already subscribed
                message.channel.send(`You are already subscribed to ${arg} alerts.`);
            } else {
                message.channel.send(`You have subscribed to ${arg} alerts.`);
                // message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe ...`);
                subscriptions[arg].add(message.author);
            }
        }
    }
}