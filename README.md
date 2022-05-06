# TroubleshooterBot

Team: Troubleshooters

Team members:  
Eles Jones (ejones12)  
Ryan Maxey (ryanmaxey6)  
Camila Arbaiza (camilaarb)  
Elise Dirkse (esdirkse)

## Description:

Our CS5704 Project is to make a Discord Bot to communicate information about the Covid-19 pandemic in a uniform manner to SE teams. We are using this to "Troubleshoot" communication problems that occur during the pandemic and affect software engineers. The bot can be added to a Discord server. When the bot is on a server, users can send commands to the bot that will allow them to request immediate updates about the pandemic, request daily scheduled alerts about the pandemic relating to masks, travel, and/or vaccines, and unsubscribe from receiving alerts. The back end functionality scrapes the CDC's Twitter for the relevant information at the correct times. This allows software engineering teams to receive unified updates about the pandemic.

## Commands: 

All commands to the bot begin with an '!'. The following are the commands that the bot understands.

!help: gives a list of commands the bot understands  
!alerts: subscribe to Covid-19 alerts  
--all: subscribe to all categories  
--categories: get list of categories  
!unsubscribe: unsubscribe from Covid-19 alerts  
--all: unsubscribe from all categories  
--categories: get list of categories  
!information: request immediate information

## Requirements
1. 

## How to Set Up GitHub Repo
1. Navigate to our githib repo and clone in your preferred terminal (git clone https://github.com/esdirkse/TroubleshooterBot.git)
2. In the root directory (TroubleshooterBot), type "npm install" into terminal to install required dependences
3. Enter "pip install -r requirements.txt" into terminal to install all python requirements

## How to Run Program:

The bot will be already be deployed and be hosted 24/7 for the next week and a half. Once you navigate to our discordvserver, you can use any of our listed commands to use the bot. To list the commands, type !help into any channel.

For alerts, notifications are sent at 10:00AM each day. You can subscribe and unsubscribe from notifications at any time.

## How to Run Tests:

Javascript tests
- For our implementation, we created a Client class that contains the information of each individual user,
and a mapping of their subscription requests and times for subscriptions. In this test class, we test the helper functions used.
- Testing Client.js

- To run tests:
    - Navigate to root directory (troubleshooterbot)
    - Type command "npm test" into terminal
    - Output will show results of Client class unit test

Python Tests

- The twitter scraper script was unit tested using "Pytest" which is Python's framework for testing. In the twitterScraperTest.py file we created unit tests for each category of search and verified that the correct json file for each category was created. Additionally, we checked that the files were not empty given that it is not possible to determine the exact data inside them since the tweets returned could be different every time a query is performed.

- To run tests:
    - Navigate to root directory (troubleshooterbot)
    - Type command "python -m pytest ./twitterScraperTest.py" into the terminal 
    - Output will show the number of unit tests passed


Additional Testing
- We were not able to add additional unit testing for some of our additional classes due to the difficulty of working with
the Discord API and mimicking the ability send messages back and forth between the client and the bot. This kind if testing is done in our acceptance testing/use cases, showing the functionality of our bot.


## Use Case #1: Sign Up for Scheduled Alerts

- Precondition: The bot is on the server and the bot is running. 
- Flow 1: signing up for just mask updates
    -How to Run: Type '!alerts masks' to sign up for daily scheduled alerts about masks  
    -Expected Output: 
        -Bot reponds with 'You have subscribed to masks alerts. You will be notified at 10:00AM each day.'
        -At 10:00AM every day you will receive a message from the bot with information from the CDC's Twitter about mask updates. 
    -Alternate Flow Expected Output: 
        -If you are already subscribed to masks alerts, the bot will respond with 'Sorry, you are already subscrubed to masks alerts. You will receive notifications at 10:00AM.' 
        -At 10:00AM every day you will receive a message from the bot with information from the CDC's Twitter about mask updates.
 - Flow 2: signing up for just travel updates
    -How to Run: Type '!alerts travel' to sign up for daily scheduled alerts about travel  
    -Expected Output/Alternate Expected Output: 
        -these are the same as Flow 1, but 'mask' is replaced with 'travel'
- Flow 3: signing up for just vaccine updates
    -How to Run: Type '!alerts vaccines' to sign up for daily scheduled alerts about masks  
    -Expected Output: 
        -these are the same as Flow 1, but 'mask' is replaced with 'vaccine'
- Flow 4: signing up for just general updates
    -How to Run: Type '!alerts general' to sign up for daily scheduled alerts about masks  
    -Expected Output: 
        -these are the same as Flow 1, but 'mask' is replaced with 'vaccine'
- Flow 5: signing up for all alerts
    -How to Run: Type '!alerts --all' to sign up for daily scheduled alerts about masks  
    -Expected Output: 
        -There will be four lines of output. For general, masks, travel, and vaccines. Each output will be the text from either the Expected Output or Alternate Expected Output based on if the user is already subscribed. 

## Use Case #2: 

- Precondition: the bot is on the server and the bot is running. 
- How to run: The user will type '!information category' where 'category' is either 'masks', 'vaccines', 'travel', 'general', or '--all'.
- Expected Output: If '!information masks' is entered, the bot will message the user a reply containing a list of up to ten recent tweets from the CDC twitter relating to masking. The tweets will display as a thumbnail that contains the first part of the tweet with any image included in the tweet. The tweet will also be in the form of a hyperlink that the user can click that will take the user to the CDC twitter where they can see the tweet. If '!information vaccines' is entered, the same output is expected, but the tweets will relate to vaccines. If '!information travel' is entered, the same output is expected, but tweets returned by the bot will relate to travel updates. If '!information general', the same output is expected, but the tweets will relate to general updates about the pandemic. 
- Alternate Expected Output: If there have been no new tweets by the CDC twitter since the last time !information was called, the same tweet will be returned again. 
- Alternate Expected Output: If there have been no tweets at all by the CDC twitter in the last ten days, no tweets will be returned. 

## Use Case Example #3:

- Precondition: The bot is on the server and the bot is running. 
- How to run: The user will type '!unsubscribe category' where 'category' is either 'masks', 'vaccines', 'travel', 'general', or '--all'. 
- Expected output: If '!unsubscribe masks' is entered and the user is subscribed to mask updates, the user will no longer receive regularly scheduled updates relating to masks. They will receive a message from the bot 'You have unsubscrubed from mask alerts.' If a different category is entered, the user will be unsubscribed from that category.  
- Alternate work flow: If the user types '!unsubscribe category' and the user is not subscribed to the category, the user will simply be met with a message 'You are not currently subscribed to alerts'. They will still not receive the regularly scheduled daily updates. 