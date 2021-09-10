<template>
  <div class="content">
    <a-button class="editable-add-btn" @click="handleAdd">
      Add
    </a-button>
    <a-table :columns="columns" :data-source="data" bordered>
      <template
        v-for="col in [num,'is_fixed','is_occupied']"
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
import {getCar,parkfind,parksend,parkremove,parkadd} from '../../network/home'
export default {
    name:'parkmanage',
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
            a:''
        }
        
    },
    created(){
      parkfind().then(res=>{
        this.ju=[...res];
        for (let item of this.ju) {
          this.data.push({
            key: this.k.toString(),
            id_num: item.id_num,
            is_fixed: item.is_fixed,
            is_occupied: item.is_occupied,
            park_id: item.park_id,
          });
          this.cacheData.push({
            key: this.k.toString(),
            id_num: item.id_num,
            is_fixed: item.is_fixed,
            is_occupied: item.is_occupied,
            park_id: item.park_id,
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
          if(target.park_id==='') 
          {
            this.num='park_id',
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
        // console.log("this.cacheData",this.cacheData);
        // console.log("this.data",this.data);
        // console.log("newData",newData);
        // console.log('newCacheData',newCacheData);
        // console.log('target',target);
        // console.log('targetCache',targetCache);
        // console.log(key);
        // console.log('senddata',senddata);

        let senddata={};
        senddata.id_num=null
        senddata.is_fixed=target.is_fixed;
        senddata.is_occupied=target.is_occupied;
        senddata.park_id=target.park_id;
        console.log(typeof(senddata.is_occupied))
        if(senddata.is_fixed===""
          || senddata.is_occupied===""
          || senddata.park_id===""){
          alert("字段不能为空！")
          return;
        }

        if(senddata.is_fixed.toString()!=="true"&&senddata.is_fixed.toString()!=="false" 
          && senddata.is_occupied.toString()!=="true"&&senddata.is_occupied.toString()!=="false"){
          alert("is_fixed & is_occupied 应为 true/false ！")
          return;
        }

        
        console.log('senddata',senddata);
        let sd={
          where:{park_id:senddata.park_id},
          newFields:senddata
        }

        if(this.n===true) 
        {
          // console.log('wu');
          parkadd(senddata)
        }

        if (target && targetCache) {
          // 删除editable属性
          delete target.editable;
          this.data = newData;
          Object.assign(targetCache, target);
          this.cacheData = newCacheData;
          //  console.log("ok");
          console.log('sd',sd);
          parksend(sd)
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
        console.log(dataSource[key].park_id);
        // console.log(this.data[key]);
          parkremove({park_id:dataSource[key].park_id}).then(res => {
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
            is_fixed: '',
            is_occupied: '',
            park_id: '',
        })
        this.cacheData.push({
          key: this.k.toString(),
            id_num: '',
            is_fixed: '',
            is_occupied: '',
            park_id: '',
        })
        this.k++;
        // this.edit(this.k)
      },
    }
}

  const columns = [
    {
      title: '车位编号',
      dataIndex: 'park_id',
      width: '40%',
      scopedSlots: { customRender: 'park_id' },
    },
    {
      title: '车牌号',
      dataIndex: 'id_num',
      width: '25%',
      scopedSlots: { customRender: 'id_num' },
    },
    {
      title: '是否为专用车位',
      dataIndex: 'is_fixed',
      width: '15%',
      scopedSlots: { customRender: 'is_fixed' },
    },
    {
      title: '是否被占用',
      dataIndex: 'is_occupied',
      width: '40%',
      scopedSlots: { customRender: 'is_occupied' },
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