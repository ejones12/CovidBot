class Client {
    
    infoMap;
    discordInfo;

   
     
    constructor(discordObj){
        this.discordInfo = discordObj;
        this.infoMap = new Map();
    }

    getInfoMap(){
        return this.infoMap;
    }

    //not sure if needed?
    getAlertTimes(){
        return this.alertTimes;
    }

    addCategory(category, time){
        //this.categories.push(category);
        if(category != null && time != null){
            this.infoMap.set(category,time);
        }
    }
    addAlertTime(time){
        this.alertTimes.push(time);
    }
    removeCategory(category){
        /* var arrayLength = this.categories.length;
        for (var i = 0; i < arrayLength; i++) {
            if(category === this.categories[i]){
                delete this.categories[i];
            }
        } */
        for(let [key,value] of this.infoMap){ //dont think i need a loop but whatevr
            if(category === key){
                this.infoMap.delete(key);
            }
        }
    }
    removeAlertTime(time){
        for(let [key,value] of this.infoMap){
            if(value === time){
                this.infoMap.delete(key);
            }
        }
        /* var arrayLength = this.alertTimes.length;
        for (var i = 0; i < arrayLength; i++) {
            if(time === this.alertTimes[i]){
                delete this.alertTimes[i];
            }
        } */
    }
  }

  if (typeof module === 'object') module.exports = Client;