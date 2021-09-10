<template>
  <div class="content">
      <!-- <h2>3</h2> -->
      <h3>专用车位</h3>
            <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data1">
                <a-list-item slot="renderItem" slot-scope="item" >
                    <a-card :title="item.title"  :class="{occupy: item.occupy ,nonoccupy:!item.occupy}"  class="card">
                        {{item.state}} 
                    </a-card>
                </a-list-item>
            </a-list>
      <hr/>
      <h3>普通车位</h3>
            <a-list :grid="{ gutter: 16, column: 4 }" :data-source="data2" >
                <a-list-item slot="renderItem" slot-scope="item">
                    <a-card :title="item.title"  :class="{occupy: item.occupy ,nonoccupy:!item.occupy}" class="card">
                        {{item.state}} 
                    </a-card>
                </a-list-item>
            </a-list>
  </div>
</template>

<script>
import {getCar,parkfind,parksend,parkremove,parkadd} from '../../network/home'

export default {
    name:'status',
    data(){
        return{
            data1:[],
            data2:[]
        }
    },
    created(){
        parkfind().then(res=>{
        let ju=[...res];
        for (let item of ju) {
            if(item.is_fixed)
                this.data1.push({
                    occupy: item.is_occupied,
                    title:item.park_id,
                    state:item.id_num
                })
            else
                this.data2.push({
                    occupy: item.is_occupied,
                    title:item.park_id,
                    state:item.id_num
                })
            }
        })
        console.log("data1",this.data1);
        console.log("data2",this.data2);
    }
}
</script>

<style scoped>
    .content{
        position: absolute;
        left: 22%;
        top: 100px;
        float: right;
        width: 75%;
        font-size: 14px;
    }
    .card{
        height:120px
    }
    .occupy{
        background-color: #ffd740
    }
    .nonoccupy{
        background-color: #81c784
    }
</style>