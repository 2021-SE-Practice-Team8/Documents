const mongoose = require('../../db');
const model = require('./model');

/**
 * 新增文档
 * @param {object} doc 
 */
function  create(doc){
    //console.log(doc);
    return new Promise((resolve,reject) => {
        model.create(doc)
        .then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}


module.exports = {create};