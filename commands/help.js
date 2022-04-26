module.exports = {
    name: 'help',
    description: "Gives the user a list of commands.",
    execute(message, args) {
        message.channel.send("alerts: subscribe to Covid-19 alerts\n" 
        + "unsubscribe: unsubscribe from Covid-19 alerts");
    }
}