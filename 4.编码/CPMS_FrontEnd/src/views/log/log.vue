<template>
  <div class="content">
    <a-table :columns="columns" :data-source="data" bordered>
    <template slot="name" slot-scope="text">
      <a>{{ text }}</a>
    </template>
  </a-table>



  </div>
</template>

<script>
import {logfind} from '../../network/home'
const renderContent = (value, row, index) => {
  const obj = {
    children: value,
    attrs: {},
  };
  return obj;
};
export default {
    name:'log',
    data() {
        const columns = [
        {
            title: '车牌号',
            dataIndex: 'id_num',
            customRender: renderContent
        },
        {
            title: '入库时间',
            dataIndex: 'time_in',
            customRender: renderContent
        },
        {
            title: '出库时间',
            dataIndex: 'time_out',
            customRender: renderContent,
        },
        ];
        return {
            data:[],
            cache:[],
            columns,
            k:0,
            ju:[]
        };
    },
    methods:{
        
    },
    created(){
        logfind().then(res=>{
        console.log('res',res);
        this.ju=[...res];
        let i=0;
        for (let item of this.ju) {
            console.log('ju',this.ju);
            console.log('item',item);
            console.log('item.log_info',item.log_info);
            for(let it of item.log_info)
            {
                console.log('it',it);
                // this.cache.push(it.time_in)
                // this.cache.push(it.time_out)
                this.data.push({
                    key: this.k.toString(),
                    id_num: item.id_num,
                    time_in:it.time_in,
                    time_out:it.time_out
                });

            }
          
          this.k++;
        }
        })
        console.log('data',this.data);
    }
}


</script>

<style scoped>
    .content{
        position: absolute;
        left: 25%;
        top: 100px;
        float: right;
    }
</style>