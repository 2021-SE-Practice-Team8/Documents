> 本系统使用mongodb

- 建立数据库，名为CPMS

  ```shell
  use CPMS
  ```

- 建立car集合，并导入数据

  ```shell
  db.createCollection("car")
  mongoexport -d CPMS -c car -o {$your_path}/cpms_car.json 
  ```

- 建立parking集合，并导入数据

  ```shell
  db.createCollection("parking")
  mongoexport -d CPMS -c parking -o {$your_path}/cpms_parking.json 
  ```

