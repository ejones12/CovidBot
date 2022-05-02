module.exports = {
    name: 'information',
    description: "Allows the user to request immediate updates.",
    execute(message, args, subscriptions) {
        const { spawn } = require('child_process');
        const scrapingProg = spawn('python', ['./twitterScraper.py', 'general']);
        // const scrapingProg = spawn('ls', []);
        console.log('Started child process for twitter scraping...');

        scrapingProg.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });
        scrapingProg.stdout.on('data', function(data) {
            console.log('anything');
            console.log(data.toString());
            //read from json?
            //need check for args to see if invalid
            //pass in as args to twitter script
        });

        scrapingProg.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}