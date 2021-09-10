const mongoose = require('../../db');
const model = require('./model');

/**
 * 删除文档
 * @param {object} where 
 */
function remove(where){
    console.log(where);
    return new Promise((resolve,reject) => {
        model.remove(
            where
        ).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    });
}

module.exports = {remove};