const mongoose = require('../../db');
const model = require('./model');

/**
 * 查询文档
 * @param {object} where 
 */
function find(where){
    //console.log(where);
    return new Promise((resolve,reject) => {
        model.find(
            where
        ).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}
function findOne(where){
    //console.log(where);
    return new Promise((resolve,reject) => {
        model.findOne(
            where
        ).then(res=>{
            console.log(res);
            resolve(res);
        }).catch(err=>{
            console.log(err);
            reject(err);
        });
    })
}

module.exports = {
    find,
    findOne
};