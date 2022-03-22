module.exports = {
    name: 'alerts',
    description: "Allows the user to subsribe to alerts.",
    execute(message, args) {
        const categories = ['travel', 'vaccines', 'masks'];
        
        // Do we need to store each user's subscriptions?
        // Should the Bot send the alerts to a specific Discord channel?
        // It seems like we wouldn't want every user's alerts to be sent to one
        // channel because users would have to search to find the alerts
        // they're interested in (defeats the purpose of personalized alerts).
        // It may be better to send alerts as direct messages to the users.

        // Bot would probably need to keep a list of subscribed users for each category.
        const subscribedUsers = {
            'travel': [],
            'vaccines': [],
            'masks': []
        };

        if (args.length === 0) {
            message.channel.send('Please include a category to subscribe to: travel, vaccines, masks');
            return;
        }

        for (arg of args) {
            if (!categories.includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else {
                message.channel.send(`You have subscribed to ${arg} alerts.`);
                console.log(message.author);
                // message.author.send(`You have subscribed to ${arg} alerts. To unsubscribe ...`);
                // need to check if the user is already subscribed
                subscribedUsers[arg].push(message.author);
                console.log(subscribedUsers);
            }
        }
    }
}