const mongoose = require('mongoose');
require('dotenv').config();

module.exports = {

    Disconnect: function () {
        mongoose.disconnect();
    },

    Connect: async function () {
        await mongoose.connect(process.env.DATABASE, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("bd has been loaded");
    }
};
