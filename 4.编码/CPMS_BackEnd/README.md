# CPMS
Car parking management system

Team8

- 安装模块

  ```shell
  npm instal
  ```

  



- 启动程序

  ```shell
  node CPMS
  ```

## API:

> host待定～

### admin(管理员账户登陆)

- request:

  - url: POST http://host:8888/admin

  - Body: {

    ​	username: String

    ​	password: String	

    }

- response
  - 正常

    status: 200

    body: {

    ​	message: "Login OK!"

    }

  - 用户名或密码错误

    status: 403

    body: {

    ​	message: "Login error!"

    }

  - 异常

    status: 403

    body: {

    ​	message: "LoginFunc error!"

    }

### car（校内车集合）：

1. 增

   - request：
     - url：POST http://host:8888/car/create
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "findFunc error"

2. 删

   - request：
     - url：DELETE http://host:8888/car/remove
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "removeFunc error"

3. 改

   - request：

     - url：POST http://host:8888/car/updateOne

     - body：{

       ​	where: Object //查询条件

       ​	newFields: Object //更新后的字段

       } 

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "updateFunc error"

4. 查

   - request：
     - url：POST http://host:8888/car/find
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Array //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "findFunc error"

### parking（车位集合）：

1. 增

   - request：
     - url：POST http://host:8888/parking/create
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "findFunc error"

2. 删

   - request：
     - url：DELETE http://host:8888/parking/remove
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "removeFunc error"

3. 改

   - request：

     - url：POST http://host:8888/parking/updateOne

     - body：{

       ​	where: Object //查询条件

       ​	newFields: Object //更新后的字段

       } 

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "updateFunc error"

4. 查

   - request：
     - url：POST http://host:8888/parking/find
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Array //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "findFunc error"

### log（日志集合）：

1. 停车入库

   - request：
     - url：POST http://host:8888/log/enter
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object //结果信息

     - 车已入库

       status: 403

       body: {

       ​	message: "The car already has entered!"

       }

     - 无车位

       status: 403

       body: {

       ​	message: "No Parking Space!"

       }

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "enterFunc error"

2. 开车出库

   - request：
     - url：POST http://host:8888/log/leave
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Object {

       ​	bill: number //账单费用（两时间戳之差）

       } //结果信息

     - 车已离开

       status: 403

       body: {

       ​	message: "The Car has Leaved!"

       }

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "leaveFunc error"

3. 查

   - request：
     - url：POST http://host:8888/log/find
     - body：Object //查询条件

   - response：

     - 正常

       status: 200

       body: Array //结果信息

     - 异常

       status: 403

       body: Object //报错信息

       body.message: "findFunc error"
