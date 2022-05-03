const fs = require('fs')

/**
 * 
 * Functionality for information command. Allows user to request immediate information given a specific category
 * or general categories. Scrapes the CDC Twitter account and returns information to the user.
 * 
 */

module.exports = {
    name: 'information',
    description: "Allows the user to request immediate updates.",
    execute(message, args, subscriptions) {
        const { spawn } = require('child_process');
        const scrapingProg = spawn('python', ['./twitterScraper.py', 'general']);
        console.log('Started child process for twitter scraping...');

        scrapingProg.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        scrapingProg.stdout.on('data', function(data) {
            console.log(data.toString());
            //read from json?
            //need check for args to see if invalid
            //pass in as args to twitter script
            fs.readFile('./json_data/general_data.json', 'utf8', (err, jsonString) => {
                if (err) {
                    console.log("Error reading file from disk:", err)
                    return
                }
                try {
                    const data = JSON.parse(jsonString)
                    console.log(data.data[0].text);
                    //console.log("Customer address is:", customer.address) // => "Customer address is: Infinity Loop Drive"
                    message.channel.send(data.data[0].text);
                } catch(err) {
                    console.log('Error parsing JSON string:', err)
                }
            });
        });

        scrapingProg.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    }
}