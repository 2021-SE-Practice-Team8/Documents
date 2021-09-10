const router = require('koa-router')();
const log = require('../services/log/index');
const parking = require('../services/parking');
const car = require('../services/car');

/**
 * 辅助函数 start
 */

/**
 * update log
 * @param {String} theCarID 
 */
async function editLog(theCarID) {
    let hasLog = await log.findFunc.findOne({ id_num: theCarID });
    if (hasLog) {
        hasLog.log_info.push({
            time_in: Date.now(),
            time_out: null
        });
        await log.updateFunc.updateOne(
            { id_num: theCarID },
            { log_info:  hasLog.log_info }
        );
    } else {
        await log.createFunc.create({
            id_num: theCarID,
            log_info: [{
                time_in: Date.now(),
                time_out: null
            }]
        });
    }
}

/**
 * parking on commone space
 * @param {Object} isFixed 
 * @returns Object
 */
async function CommonParking(idNum) {
    let hasCommonPaking = await parking.findFunc.find({
        is_fixed: false,
        is_occupied: false
    });
    if (hasCommonPaking!=false) {
        //有普通车位
        let index = getRandomInt(0,hasCommonPaking.length);
        console.log(`from 0 to ${hasCommonPaking.length-1}, choose ${index}`);
        await editLog(idNum);
        let body = await parking.updateFunc.updateOne(
            hasCommonPaking[index], {
            is_occupied: true,
            id_num: idNum
        })
        return {
            isOK: true,
            body
        }
    } else {
        //无任何车位
        return {
            isOK: false
        }
    }
}

/**
 * 
 * @param {Number} min 
 * @param {Number} max 
 * @returns 
 */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }

/**
 * 辅助函数 end
 */


const routers = router
    .post('/enter', async (ctx) => {
        // 查询车是否已经入库
        try {
            let isEntered = await parking.findFunc.find(ctx.request.body);
            if (isEntered.length) {
                // 车已入库
                ctx.body = {
                    message: "The car already has entered!"
                };
                ctx.status = 403;
                console.log(ctx.response);
            } else {
                // 车未入库
                // 查询是否为校内车辆
                let isFixed = await car.findFunc.findOne(ctx.request.body);
                if (isFixed) {
                    // 是校内车
                    // 判断是否有专用车位
                    let hasFixedParking = await parking.findFunc.find({
                        is_fixed: true,
                        is_occupied: false
                    });
                    if (hasFixedParking!=false) {
                        // 有专用车位
                        let index = getRandomInt(0,hasFixedParking.length);
                        console.log(`from 0 to ${hasFixedParking.length-1}, choose ${index}`);
                        await editLog(isFixed.id_num);
                        ctx.body = await parking.updateFunc.updateOne(
                            hasFixedParking[index], {
                            is_occupied: true,
                            id_num: isFixed.id_num
                        });
                        ctx.status = 200;
                        console.log(ctx.response);
                    } else {
                        // 无专用车位
                        let tempRes = await CommonParking(ctx.request.body.id_num);
                        if (tempRes.isOK) {
                            ctx.body = tempRes.body;
                            ctx.status = 200;
                            console.log(ctx.response);
                        } else {
                            ctx.status = 403;
                            ctx.body = {
                                message: "No Paking Space!"
                            };
                            console.log(ctx.response);
                        }
                    }
                } else {
                    // 是校外车
                    let tempRes = await CommonParking(ctx.request.body.id_num);
                    if (tempRes.isOK) {
                        ctx.body = tempRes.body;
                        ctx.status = 200;
                        console.log(ctx.response);
                    } else {
                        ctx.status = 403;
                        ctx.body = {
                            message: "No Paking Space!"
                        };
                        console.log(ctx.response);
                    }
                }
            }
        } catch (error) {
            ctx.body = {
                message: "enterFunc error",
                error
            };
            ctx.status = 403;
            console.log(ctx.response);
        }
    })
    .post('/leave', async (ctx) => {
        try {
            let isEntered = await parking.findFunc.findOne(ctx.request.body);
            if(!isEntered){
                ctx.body = {
                    message: "The Car has Leaved!"
                }
                ctx.status = 403;
                console.log(ctx.response);
                return;
            }else{
                await parking.updateFunc.updateOne(
                    ctx.request.body,
                    {
                        is_occupied: false,
                        id_num: null
                    }
                );
                let tempLogs = await log.findFunc.findOne(ctx.request.body);
                let lastLog = tempLogs.log_info[tempLogs.log_info.length-1];
                lastLog.time_out = Date.now();
                let bill = lastLog.time_out - lastLog.time_in;
                await log.updateFunc.updateOne(
                    ctx.request.body,
                    { log_info: tempLogs.log_info }
                );
                ctx.status=200;
                ctx.body={ bill };
                console.log(ctx.response);
            }
        } catch (error) {
            ctx.body = {
                message: "leaveFunc error",
                error
            };
            ctx.status = 403;
            console.log(ctx.response);
        }
    })
    .post('/find', async (ctx) => {
        try {
            ctx.body = await log.findFunc.find(ctx.request.body);
            ctx.status = 200;
            console.log(ctx.response);
        } catch (error) {
            ctx.body = {
                message: "findFunc error",
                error
            };
            ctx.status = 403;
            console.log(ctx.response);
        } 
    });

module.exports = routers;