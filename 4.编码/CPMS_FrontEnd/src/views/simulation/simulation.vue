<template>
  <div class="content">
      
      <!-- <tabbar></tabbar> -->
    <!-- <router-view></router-view> -->
    <!-- <h2>1</h2> -->
    <input placeholder="车牌号" class="input" value="" id="pai"/>
    <div>
      <model class="btn" @jinClick="jinClick" @chuClick="chuClick"></model>
    </div>
    
    <list class="list" :pu="pu" :zhuan="zhuan"></list>

    <a-row :gutter="16" >
      <a-col :span="24" style="margin-top: 32px;">
        <a-statistic-countdown title="剩余缴费时间" :value="deadline" format="D 天 H 时 m 分 s 秒" />
      </a-col>
    </a-row>

  <div :class="{line:time}" class="fei" >
    <a-button size='large' :block='true' @click="btnClick">
      缴费
    </a-button>
  </div>
  
  </div>
</template>

<script>
import tabbar from '../../components/tabbar.vue'
import model from './model.vue'
import list from './list.vue'
import {getCar,parkfind,logenter,logleave} from '../../network/home'
export default {
    name:'simulation',
    components: {
    tabbar,
    model,
    list,
  },
  data(){
    return{
      zhuan:0,
      pu:0,
      pai:'',
      data1:[],
      data2:[],
      deadline: 0,
      time:true,
      reg: new RegExp("([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF])|(DF[0-9]{4})))|([京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1})")
    }
  },
  created(){
    parkfind({is_fixed: true, is_occupied: false}).then(res=>{
      this.zhuan = res.length;
    })
    parkfind({is_fixed: false, is_occupied: false}).then(res=>{
      this.pu = res.length;
    })
  },
  updated(){
    this.pai=document.getElementById('pai').value;
  },
  methods:{
    onFinish() {
      console.log('finished!');
    },
    jinClick(){
      // alert('jin');
      this.pai=document.getElementById('pai').value;
      if(this.reg.test(this.pai)){
        logenter({id_num:this.pai}).then(res => {
            
            if(res===undefined){
              alert("停车出错！")
            }else{
              console.log('res', res);
              alert("停车成功！")
            }
        }).catch(err => {
            console.log('err')
            alert("停车出错！")
        })
      }else{
        alert("车牌号格式错误！");
      }
      document.getElementById('pai').value="";
    },
    chuClick(){
      // alert('jin')
      // this.zhuan+=1
      // this.pu+=1
      // this.pai=document.getElementById('pai').value;
      // console.log((this.pai));
      this.pai=document.getElementById('pai').value;
      logleave({id_num:this.pai}).then(res => {
            console.log('res', res.bill);

            if(res===undefined){
              alert("出库出错！请检测该车是否在库！")
              return;
            }

            res.bill/=1000;

            let expense;
            if(res.bill <= 30*60){
              expense = 1;
            }else{
              expense = parseInt((res.bill/60-30)/60+2);
            }

            alert('请在5分钟之内缴费'+expense+'元')
            this.deadline=Date.now()+10000 * 30;

            this.time=false

        }).catch(err => {
            console.log('err')
            alert("出库出错！请检测该车是否在库！")
        })
      document.getElementById('pai').value="";
      
    },
    btnClick(){
      alert('缴费成功');
      this.time=true;
      this.deadline=0;
    }
  }
}
</script>

<style scoped>
    .content{
        position: absolute;
        left: 30%;
        top: 120px;
        float: right;
    }
    .input{
        left: 0;
        height: 50px;
        width: 500px;
    }
    .btn{
      float: left;
      padding-top: 100px;
      left: 0;
    }
    .list{
      padding-top: 200px;
    }
    .line{
      display: none;
    }
    .fei{
      font-size: 30px;
      height: 200px;
      width: 200px;
    }
</style>