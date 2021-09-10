const mongoose = require('../../db');
const model = require('./model');

/**
 * 更新一条记录
 * @param {object} where 
 * @param {object} newFileds 
 */
function updateOne(where, newFields){
    //console.log(id);
    //console.log(newFields);
    return new Promise((resolve,reject) => {
        model.updateOne(
            where,
            newFields
        ).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {updateOne};