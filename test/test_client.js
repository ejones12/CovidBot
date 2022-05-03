const Client = require("../client");
var assert = require('assert');

describe('Client Functionality Unit Tests', function () {
    let discordObj = "discordObj";
    let client = new Client(discordObj);
 it('should return number of subscriptions when a client is created,, should be 0', function () {
    
    assert.equal(client.getNumSubscriptions(),0)
    });

it('Adds scheduled alert to client list, should return number of subscriptions', function () {
        client.addSubscription("masks", "8:00AM");
        assert.equal(client.getNumSubscriptions(),1);
    });

    it('Checks to see which category client is subscribed to, should return true if subscribed', function () {
        var status = client.isSubscribedTo("masks");
        assert.equal(status,true);
        status = client.isSubscribedTo("vaccines")
        assert.equal(status, false);
    });

    it('Return subscription time,', function () {
        var status = client.isSubscribedTo("masks");
        assert.equal(status,true);
        var time = client.getSubscriptionTime("masks")
        assert.equal(time,"8:00AM");
    });

    it('Print client subscription', function () {
        var sub = client.printSubscriptions()
        assert.equal(sub, "masks: 8:00AM\n");
    });

    it('Removes subscription from client,', function () {
        var status = client.isSubscribedTo("masks");
        assert.equal(status,true);
        client.removeSubscription("masks")
        status = client.isSubscribedTo("masks")
        assert.equal(status, false);
    });


    


});