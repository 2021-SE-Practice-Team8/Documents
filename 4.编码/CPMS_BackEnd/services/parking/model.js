const mongoose = require('mongoose');

const parkingScheam = mongoose.Schema({
    park_id: {
        type: String,
        unique: true,
        required: true,
        index: true,
        default: "undefined"
    },
    is_fixed: {
        type: Boolean,
        default: false
    },
    is_occupied: {
        type: Boolean,
        default: true
    },
    id_num: {
        type: String,
        default: "undefined"
    }
});

module.exports = mongoose.model("ParkingModel",parkingScheam,"parking");