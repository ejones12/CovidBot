module.exports = {
    name: 'help',
    description: "Gives the user a list of commands.",
    execute(message, args) {
        message.channel.send("alerts: subscribe to Covid-19 alerts\n"
        + "\t-all: subscribe to all categories\n"
        + "\t-categories: get list of categories\n" 
        + "unsubscribe: unsubscribe from Covid-19 alerts\n"
        + "\t-all: unsubscribe from all categories\n"
        + "\t-categories: get list of categories\n"
        + "information: request immediate information");
    }
}