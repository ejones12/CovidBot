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
});