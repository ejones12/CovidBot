
function readTextFile(file, callback) {
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

//usage:
// readTextFile("/Users/Documents/workspace/test.json", function(text){
//     var data = JSON.parse(text);
//     console.log(data);
// });


module.exports = {
    name: 'information',
    description: "Allows the user to request immediate updates.",
    execute(message, args, subscriptions) {
        const { spawn } = require('child_process');
        const scrapingProg = spawn('python', ['./twitterScraper.py', 'general']);
        console.log('Started child process for twitter scraping...')
        
        scrapingProg.stdout.on('data', function(data) {
            console.log(data.toString());
            //read from json?
            //need check for args to see if invalid
            //pass in as args to twitter script
            readTextFile("./general_data.json", function(text){
                var data = JSON.parse(text);
                //console.log(data);
                message.channel.send(data[0].text);
            });
        
        });
    }
}