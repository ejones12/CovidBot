module.exports = {
    name: 'information',
    description: "Allows the user to request immediate updates.",
    execute(message, args, subscriptions) {
        const { spawn } = require('child_process');
        const scrapingProg = spawn('python', ['../twitterScraper.py', 'travel']);
        console.log('Started child process for twitter scraping...')
        
        scrapingProg.stdout.on('data', function(data) {
            console.log('hey im here');
            console.log(data.toString());
        });
    }
}