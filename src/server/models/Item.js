const mongoose = require('mongoose');

const Item = mongoose.Schema({
    itemId: String,
    status: String
},{ 
    _id : false 
});

Item.static('Status', {
    OUT_OF_RANGE : 'O',
    IN_RANGE : 'I'
});

module.exports = mongoose.model('Item', Item);