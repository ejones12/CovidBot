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

## How to Run Program:

## How to Run Tests:

## Use Case #1: Sign Up for Scheduled Alerts

- Assume the bot is on the server and the bot is running. 
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

## Use Case Example #2:

## Use Case Example #3:
