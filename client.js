class Client {
    
    subscriptions;
    discordUserObj;
     
    constructor(discordObj){
        this.discordUserObj = discordObj;
        this.subscriptions = new Map();
    }

    sendDirectMessage(msg) {
        this.discordUserObj.send(msg);
    }

    isSubscribedTo(category) {
        return this.subscriptions.has(category);
    }

    getSubscriptionTime(category) {
        return this.subscriptions.get(category);
    }

    printSubscriptions() {
        let result = ''
        for (let [category, time] of this.subscriptions) {
            result += `${category}: ${time}\n`;
        }
        return result;
    }

    addSubscription(category, time) {
        if (category != null && time != null) {
            this.subscriptions.set(category, time);
        }
    }

    removeSubscription(category) {
        this.subscriptions.delete(category);
    }

    getNumSubscriptions() {
        return this.subscriptions.size;
    }
}

if (typeof module === 'object') module.exports = Client;