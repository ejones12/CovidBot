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

        });
    }
}