const mongoose = require('mongoose');

const carScheam = mongoose.Schema({
    id_num: {
        type: String,
        unique: true,
        required: true,
        index: true,
        default: "undefined"
    },
    name: {
        type: String,
        default: "default_name"
    },
    tel: {
        type: String,
        default: "000000000000"
    },
    apartment: {
        type: String,
        default: "default_apart"
    }
});

module.exports = mongoose.model("CarModel",carScheam,"car");