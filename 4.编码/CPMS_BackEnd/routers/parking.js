const router = require('koa-router')();
const parking = require('../services/parking/index');

const routers = router
    .post('/find', async (ctx)=>{
        try {
            ctx.body = await parking.findFunc.find(ctx.request.body);
            console.log(ctx.response);
            ctx.status = 200;
        } catch (error) {
            ctx.body = {
                message: "findFunc error",
                error
            };
            ctx.body = error;
            ctx.status = 403;
        }
    })
    .post('/updateOne', async (ctx)=>{
        try {
            ctx.body = await parking.updateFunc.updateOne(ctx.request.body.where, ctx.request.body.newFields);
            console.log(ctx.response);
            ctx.status = 200;
        } catch (error) {
            ctx.body = {
                message: "updateFunc error",
                error
            };
            ctx.status = 403;
        }
    })
    .post('/create', async (ctx)=>{
        try {
            ctx.body = await parking.createFunc.create(ctx.request.body);
            console.log(ctx.response);
            ctx.status = 200;
        } catch (error) {
            ctx.body = {
                message: "createFunc error",
                error
            };
            ctx.status = 403;
        }
    })
    .delete('/remove', async (ctx)=>{
        try {
            ctx.body = await parking.removeFunc.remove(ctx.request.body)
            console.log(ctx.response);
            ctx.status = 200;
        } catch (error) {
            ctx.body = {
                message: "removeFunc error",
                error
            };
            ctx.status = 403;
        }
    });

module.exports = routers; 