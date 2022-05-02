class Client {
    
    subscriptions;
    discordUserObj;
     
    constructor(discordObj){
        this.discordUserObj = discordObj;
        this.subscriptions = new Map();
    }

    sendDirectMessage(msg) {
        this.discordUserObj.send(msg);
    };

    isSubscribedTo(category) {
        return this.subscriptions.has(category);
    }

    getSubscriptionTime(category) {
        return this.subscriptions.get(category);
    }

    printSubscriptions() {
        for (let [category, time] of this.subscriptions) {
            console.log(`${category}: ${time}`);
        }
    }

    //not sure if needed?
    getAlertTimes() {
        return this.alertTimes;
    }

    addSubscription(category, time) {
        //this.categories.push(category);
        if (category != null && time != null) {
            this.subscriptions.set(category, time);
        }
    }

    addAlertTime(time) {
        this.alertTimes.push(time);
    }

    removeCategory(category){
        /* var arrayLength = this.categories.length;
        for (var i = 0; i < arrayLength; i++) {
            if(category === this.categories[i]){
                delete this.categories[i];
            }
        } */
        for(let [key, value] of this.subscriptions){ //dont think i need a loop but whatevr
            if(category === key){
                this.subscriptions.delete(key);
            }
        }
    }

    removeAlertTime(time){
        for(let [key,value] of this.subscriptions){
            if(value === time){
                this.subscriptions.delete(key);
            }
        }
        /* var arrayLength = this.alertTimes.length;
        for (var i = 0; i < arrayLength; i++) {
            if(time === this.alertTimes[i]){
                delete this.alertTimes[i];
            }
        } */
    }
  }

  if (typeof module === 'object') module.exports = Client;