<template>
  <div>
      <a-layout id="components-layout-demo-top-side">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['2']"
        :style="{ lineHeight: '64px' }"
      >
          <a-icon type="arrow-left" @click="mmClick1"/>
          <a-icon type="arrow-up" @click="mmClick2"/>
          <a-icon type="arrow-right" @click="mmClick3"/>
          第
          八
          组
        
        <a-button class="btn" @click="loginClick" id="btn_login" :disabled=login_is_dis><a-icon type="login" />login</a-button>
      </a-menu>
    </a-layout-header>
    
    <a-layout-content style="padding: 0 50px  height: 100vh">
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="20%" style="background: #fff">
          <tabbar ref="tabbar"></tabbar>
        </a-layout-sider>
        <a-layout-content :style="{  left:'30%'  ,   padding: '0 10px', minHeight: 'calc(100vh)' }">
          <div class="tab">
            <router-view/>
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center  ">
      Design  by GROUP 8
      <a-icon type="arrow-up" />
      <a-icon type="arrow-right" />
      <a-icon type="arrow-up" />
      <a-icon type="arrow-left" />
      <a-icon type="arrow-right" />
      <a-icon type="arrow-left" />
    </a-layout-footer>
  </a-layout>
  </div>
</template>

<script>
import tabbar from './tabbar.vue'
export default {
    name:'maintabbar',
    components:{
        tabbar
    },
    data(){
        return{
            mm:86,
            login_is_dis: false
        }
    },
    created(){
      this.$bus.$on('login_dis',()=>{
          this.login_is_dis=true
        });
    },
    methods:{
      loginClick(){
        this.$router.replace('/login');
        this.$refs.tabbar.login()
      },
      mmClick1(){
        if(this.mm==3||this.mm==35) this.mm=this.mm-3;
        if(this.mm==0) this.$bus.$emit('open')
      },
      mmClick2(){
        if(this.mm==86||this.mm==46) this.mm=this.mm-11;
        if(this.mm==0) this.$bus.$emit('open')
      },
      mmClick3(){
        if(this.mm==75||this.mm==32) this.mm=this.mm-29;
        if(this.mm==0) this.$bus.$emit('open')
      }
    }
}
</script>

<style>
    .tab{
    padding-top: 50px;
  }
  .btn{
    float: right;
    top: 20px;
    left: 20px;
  }
</style>