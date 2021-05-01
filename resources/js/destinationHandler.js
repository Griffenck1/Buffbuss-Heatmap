//Class designed to hold and handle information regarding destinations queried for SQL database
class destinationHandler{
    constructor(label, count, lat, lng){
        this.label = label;
        this.count = count;
        this.lat = lat;
        this.lng = lng;
    }

    get label(){
        return this.label;
    }
    get count(){
        return this.count;
    }
    get lat(){
        return this.lat;
    }
    get lng(){
        return this.lng;
    }
}

module.exports = {destinationHandler}