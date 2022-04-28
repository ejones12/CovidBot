module.exports = {
    name: 'unsubscribe',
    description: "Allows the user to unsubscribe from alerts.",
    execute(message, args, subscriptions,categories) {
        console.log(message.author);

        if (args.length === 0) {
            message.channel.send('Please include a category to unsubscribe from: travel, vaccines, masks');
            return;
        }

        for (arg of args) {
            if (arg === 'all') {
                var currClient;
                if(subscriptions.has(message.author.id)){
                    currClient = subscriptions.get(message.author.id);
                    for(let key of categories){
                        if (currClient.getInfoMap().has(key)) {
                            currClient.getInfoMap().delete(key);
                        }
                    }
                }
                subscriptions.delete(message.author.id);
                message.channel.send("You have unsubscribed from all alerts.");
                break;
            } else if (arg === '-categories') {
                message.channel.send("Categories are: " + categories.toString());
            } else if (!categories.includes(arg)) {
                message.channel.send(`"${arg}" is not a category.`);
            } else if (!subscriptions.has(message.author.id)) {
                message.channel.send(`You are not currently subscribed to alerts.`);
            } else {
                if(!subscriptions.get(message.author.id).getInfoMap().has(arg)){
                    message.channel.send(`You are currently not subscribed to ${arg} alerts.`)
                }else {
                    message.channel.send(`You have unsubscribed from ${arg} alerts.`);
                    // remove user from set
                    subscriptions.delete(message.author.id);
                }
            }
        }
    }
}