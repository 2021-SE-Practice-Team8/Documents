const router = require('koa-router')();

const routers = router
    .post('/', async (ctx) => {
        try {
            if (ctx.request.body.username == "admin"
                &&
                ctx.request.body.password == "admin") 
            {
                ctx.status = 200;
                ctx.body = {
                    message: "Login OK!"
                };
                console.log("Login OK!");
            }else{
                ctx.status = 403;
                ctx.body = {
                    message: "Login error!"
                };
                console.log("Login error!");
            }
        } catch (error) {
            ctx.status = 403;
            ctx.body = {
                message: "LoginFunc error!",
                error
            };
            console.log("LoginFunc error!");
        }
    });

module.exports = routers;