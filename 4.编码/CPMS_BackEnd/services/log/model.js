const mongoose = require('mongoose');

const logScheam = mongoose.Schema({
    id_num: {
        type: String,
        unique: true,
        required: true,
        index: true,
        default: "undefined"
    },
    log_info: {
        type: Array,
        default: null
    }
});

module.exports = mongoose.model("LogModel",logScheam,"log");