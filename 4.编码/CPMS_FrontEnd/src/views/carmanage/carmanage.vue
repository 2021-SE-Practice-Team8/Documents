<template>
  <div class="content">
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table :columns="columns" :data-source="data" bordered>
      <template
        v-for="col in [num,'name', 'tel','apartment']"
        :slot="col"
        slot-scope="text, record"
      >
        <div :key="col">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.key, col)"
          />
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.key)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.key)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a :disabled="editingKey !== ''" @click="() => edit(record.key)">Edit</a>
            <a-popconfirm
              v-if="data.length"
              title="Sure to delete?"
              @confirm="() => onDelete(record.key)"
            >
              <a href="javascript:;" :disabled="editingKey !== ''">Delete</a>
            </a-popconfirm>
          </span>
        </div>
      </template>
    </a-table>


  </div>
</template>

<script>
import {getCar,carfind,carsend,carremove,caradd} from '../../network/home'
export default {
    name:'carmanage',
    components:{
    },
    mounted () {
      console.log(this.cacheData);
    },
    data(){
      this.cacheData = data.map(item => ({ ...item }));
        return{
            data:[],
            columns,
            editingKey: '',
            ju:[],
            k:0,
            num:'',
            n:false,
            carReg: new RegExp("([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})"),
            telReg: new RegExp("(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\\d{8}")
        }
        
    },
    created(){
      carfind().then(res=>{
        this.ju=[...res];
        for (let item of this.ju) {
          this.data.push({
            key: this.k.toString(),
            id_num: item.id_num,
            name: item.name,
            tel: item.tel,
            apartment: item.apartment,
          });
          this.cacheData.push({
            key: this.k.toString(),
            id_num: item.id_num,
            name: item.name,
            tel: item.tel,
            apartment: item.apartment,
          });
          this.k++;
        }
  })
      
    },
    methods:{
        handleChange(value, key, column) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        // console.log("target",target);
        if (target) {
          // target是对象引用，指向同一个对象，所以修改target，newData也随之修改，完成更新
          target[column] = value;
          this.data = newData;
          // console.log("change");
        }
      },
      edit(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = key;
        if (target) {
          target.editable = true;
          this.data = newData;
          // console.log("ok");
          if(target.id_num==='') 
          {
            this.num='id_num',
            this.n=true
          }
          else
          {
            this.num='',
            this.n=false
          }
        }
      },
      save(key) {

        const newData = [...this.data];
        const newCacheData = [...this.cacheData];
        const target = newData.filter(item => key === item.key)[0];
        const targetCache = newCacheData.filter(item => key === item.key)[0];
        let senddata={};
        senddata.id_num=target.id_num
        senddata.apartment=target.apartment;
        senddata.name=target.name;
        senddata.tel=target.tel;
        console.log('senddata',senddata);
        let sd={
          where:{id_num:senddata.id_num},
          newFields:senddata
        }

        let isEmpty = senddata.id_num=="" || senddata.apartment == "" || senddata.name =="" || senddata.tel == "";
        if(isEmpty){
          alert("有字段为空！");
          return
        }

        if(!this.carReg.test(senddata.id_num)){
          alert("车牌号格式错误！");
          return
        }
        if(!this.telReg.test(senddata.tel)){
          alert("手机号格式错误！");
          return
        }

        if(this.n===true) 
        {
          // console.log('wu');
          caradd(senddata)
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
        }
        else if( target && targetCache) {
          // 删除editable属性
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
          //  console.log("ok");
          console.log('sd',sd);
          carsend(sd)
        }

        this.editingKey = '';
        // console.log(this.data);
      },
      cancel(key) {
        const newData = [...this.data];
        const target = newData.filter(item => key === item.key)[0];
        this.editingKey = '';
        if (target) {
          Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
          delete target.editable;
          this.data = newData;

        }
      },
      onDelete(key) {
        //  console.log(this.data[key]);
        const dataSource = [...this.data];
        this.data = dataSource.filter(item => item.key !== key);
        console.log(dataSource[key].id_num);
        // console.log(this.data[key]);
          carremove({id_num:dataSource[key].id_num}).then(res => {
                console.log('res', res);
                }).catch(err => {
                    console.log('err')
                })
      },
      handleAdd() {
        console.log("添加");
        this.data.push({
          key: this.k.toString(),
            id_num: '',
            name: '',
            tel: '',
            apartment: '',
        })
        this.cacheData.push({
          key: this.k.toString(),
            id_num: '',
            name: '',
            tel: '',
            apartment: '',
        })
        this.k++;
        // this.edit(this.k)
      },
    }
}

  const columns = [
    {
      title: '车牌号',
      dataIndex: 'id_num',
      width: '25%',
      scopedSlots: { customRender: 'id_num' },
    },
    {
      title: '车主',
      dataIndex: 'name',
      width: '15%',
      scopedSlots: { customRender: 'name' },
    },
    {
      title: '车主电话',
      dataIndex: 'tel',
      width: '40%',
      scopedSlots: { customRender: 'tel' },
    },
    {
      title: '所属部门',
      dataIndex: 'apartment',
      width: '40%',
      scopedSlots: { customRender: 'apartment' },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      scopedSlots: { customRender: 'operation' },
    },
  ];

  const data = [
  ];
  
</script>

<style scoped>
    .content{
        position: absolute;
        left: 25%;
        right: 25%;
        top: 100px;
        float: right;
    }
    .editable-row-operations a {
    margin-right: 8px;
  }
</style>