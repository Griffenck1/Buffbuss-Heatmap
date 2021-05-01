//Class designed to hold and handle information regarding destinations queried for SQL database
class destinationHandler{
    constructor(label, count, lat, lng){
        this.label = label;
        this.count = count;
        this.lat = lat;
        this.lng = lng;
    }
}

module.exports = {destinationHandler}