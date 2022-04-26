class Client {
    constructor(discordObj, categories, alertTimes) {
      this.discordObj = discordObj;
      this.categories = categories;
      this.alertTimes = alertTimes;
    }
    getCategories(){
        return this.categories;
    }
    getAlertTimes(){
        return this.alertTimes;
    }
    addCategory(category){
        this.categories.push(category);
    }
    addAlertTime(time){
        this.alertTimes.push(time);
    }
    removeCategory(category){
        var arrayLength = this.categories.length;
        for (var i = 0; i < arrayLength; i++) {
            if(category === this.categories[i]){
                delete this.categories[i];
            }
        }
    }
    removeAlertTime(time){
        var arrayLength = this.alertTimes.length;
        for (var i = 0; i < arrayLength; i++) {
            if(time === this.alertTimes[i]){
                delete this.alertTimes[i];
            }
        }
    }
  }