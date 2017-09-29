const config = require('config'),
    dbConfig = config.get("db"),
    mongoose = require('mongoose'),
    DeviceData = require('./../models/DeviceData'),
    Item = require('./../models/Item');

mongoose.connect(dbConfig.main.connectionString);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { });

module.exports = exports = function(handler, msg, rinfo){
    const msgString = msg.toString();
    const [deviceId, timestamp, itemsPart] = msgString.split("|");
    var items = itemsPart.split(",");
    
    DeviceData
        .where({ deviceId })
        .sort({ timestamp : -1 })
        .findOne(function (err, deviceData) {
            if (err) return handleError(err);
            var itemsIds = [];
            if (deviceData) {
                itemsIds = deviceData.items
                    .filter( item => item.status !== Item.Status.OUT_OF_RANGE )
                    .map( item => item.itemId );
            }
            
            items = items
                .map( itemId => new Item({ itemId, status : Item.Status.IN_RANGE }) )
                .concat();

            // Save the new data
            (new DeviceData({ deviceId, timestamp, items }))
                .save(function (err, deviceData) {
                    if (err) return console.error(err);
                    console.log(`Saved data ${deviceData.deviceId} - ${deviceData.timestamp}`);
                });
        });

}