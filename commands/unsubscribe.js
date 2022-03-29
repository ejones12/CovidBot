module.exports = {
    name: 'unsubscribe',
    description: "Allows the user to unsubscribe from alerts.",
    execute(message, args, subscriptions) {
        console.log(message.author);

        if (args.length === 0) {
            message.channel.send('Please include a category to unsubscribe from: travel, vaccines, masks');
            return;
        }

        for (arg of args) {
            if (arg === 'all') {
                message.channel.send("You have unsubscribed from all alerts.")
                subscriptions['travel'].delete(message.author);
                subscriptions['vaccines'].delete(message.author);
                subscriptions['masks'].delete(message.author);
                break;
            } else if (!Object.keys(subscriptions).includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (!subscriptions[arg].has(message.author)) {
                message.channel.send(`You are not currently subscribed to ${arg} alerts.`);
            } else {
                message.channel.send(`You have unsubscribed from ${arg} alerts.`);
                // remove user from set
                subscriptions[arg].delete(message.author);
            }
        }
    }
}