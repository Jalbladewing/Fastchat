var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    author: String,
    messageText: String,
    createdOn: {
        type: Date,
        "default": Date.now
    }
});

var channelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    messages: [messageSchema]
});

//A todo el esquema creado anteriormente me crea una clase modelo para poder utilizarlo en mi aplicación, en este caso Location (así podré hacer Location.new).
mongoose.model('Channel', channelSchema);