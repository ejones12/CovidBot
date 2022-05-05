/**
 * 
 * Client class - Object representation of each subscribed user. Holds a users discord account information
 * and a Map of their subscriptions for alerts. Able to send direct message to a discourd client based on given message.
 * 
 */
class Client {
    
    subscriptions; //mapping of client subscription information
    discordUserObj;// Discord client information
     
    constructor(discordObj){
        this.discordUserObj = discordObj;
        this.subscriptions = new Map();
    }

    /**
     * Sends given message to the client based on their given information
     * @param {*} msg 
     */
    sendDirectMessage(msg) {
        this.discordUserObj.send(msg);
    }

    /**
     * Checks if client is subscribed to specific category, returnstrue or false
     * @param {*} category 
     * @returns True if subscribed, False if not
     */
    isSubscribedTo(category) {
        return this.subscriptions.has(category);
    }

    /**
     * Returns time for a clients subscription
     * @param {*} category 
     * @returns String of time
     */
    getSubscriptionTime(category) {
        return this.subscriptions.get(category);
    }

    /**
     * 
     * @returns Prints content of clients subscription mapping
     * including the categories and times
     */
    printSubscriptions() {
        let result = ''
        for (let [category, time] of this.subscriptions) {
            result += `${category}: ${time}\n`;
        }
        return result;
    }

    /**
     * Adds a given category and time to map of client subscriptions
     * @param {String} category 
     * @param {String} time 
     */
    addSubscription(category, time) {
        if (category != null && time != null) {
            this.subscriptions.set(category, time);
        }
    }

    /**
     * Removes specified cateogy from client subscriptions
     * @param {*} category 
     */
    removeSubscription(category) {
        this.subscriptions.delete(category);
    }

    /**
     * eturns number of client subscriptions
     * @returns Integer
     */
    getNumSubscriptions() {
        return this.subscriptions.size;
    }
}

if (typeof module === 'object') module.exports = Client;