const koa = require('koa');
const cors = require('koa2-cors');
const bodyParser = require('koa-bodyparser');

const routers = require('./routers/index');

const app = new koa();

/**
 * 使用第三方中间件 start
 */
app.use(cors({}));
app.use(bodyParser());
/**
 * 使用第三方中间件 end
 */

app.use(routers.routes()).use(routers.allowedMethods());

 app.listen(8888, () => {
    console.log('server is starting at http://127.0.0.1:8888')
  });