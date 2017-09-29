const mongoose = require('mongoose'),
    Item = require('./Item');

var DeviceData = mongoose.Schema({
    deviceId: String,
    timestamp: Date,
    items: [Item.schema]
});

module.exports = mongoose.model('DeviceData', DeviceData);