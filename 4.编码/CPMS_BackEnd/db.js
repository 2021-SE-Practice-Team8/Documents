const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1/CPMS";

mongoose.connect(
    url
).then(res=>{
    console.log("connection success")
}).catch(res=>{
    console.log("connection error")
});

module.exports = mongoose;