//install packages
//npm install request
//npm install axios
//npm install cheerio

//require is a module loader. 
const axios = require('axios')

axios
	.get('https://www.reddit.com/r/programming.json')
	.then((response) => {
		console.log(response)
	})
	.catch((error) => {
		console.error(error)
	})

class Scrapper {
    //class body
    //define class fields (can also just make them in constructor)
    name

    //contructor. I believe this is called whenever the class is instantiated
    // instantiate class via const myScrapper = new Scrapper(); 
    //js classes can have only one constructor
    constructor(name) {
        //create a new field that is the name of the of the scrapper object. 
        //this is an instance field (on the class instance) (as opposed to class itself (static))
        this.name = name; 

        

    }
}
