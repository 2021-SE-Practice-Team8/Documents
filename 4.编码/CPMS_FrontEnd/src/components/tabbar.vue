<template>
  <div class="content">
    <a-menu mode="inline" :open-keys="openKeys" @openChange="onOpenChange" class="menu" >
      <a-sub-menu key="sub1" @titleClick="itemClick('sub1')">
        <span slot="title"><a-icon type="alert" /><span >模拟</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub2" @titleClick="itemClick('sub2')" :disabled=isActive>
        <span slot="title"><a-icon type="car" /><span>校内车管理</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub3" @titleClick="itemClick('sub3')" :disabled=isActive>
        <span slot="title"><a-icon type="compass" /><span>停车现状</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub4" @titleClick="itemClick('sub4')" :disabled=isActive>
        <span slot="title"><a-icon type="file" /><span>日志</span></span>
      </a-sub-menu>
      <a-sub-menu key="sub5" @titleClick="itemClick('sub5')" :disabled=isActive>
        <span slot="title"><a-icon type="environment" /><span>车位管理</span></span>
      </a-sub-menu>
    </a-menu>
  </div>
</template>
<script>

export default {
    name:'tabbar',
    props:{
      
    },
  data() {
    return {
      rootSubmenuKeys: ['sub1', 'sub2', 'sub3','sub4'],
      openKeys: ['sub1'],


      path:{
          "sub1":'/simulation',
          "sub2":'/carmanage',
          "sub3":'/status',
          "sub4":'/log',
          "sub5":'/parkmanage',
      },
      now:'/login',
      isActive:true
    }
  },
  created(){
    this.$bus.$on('open',()=>{
          this.isActive=false
          //  this.$router.replace
          //sessionStorage.setItem('isActive', false);          
        });
  },
  methods: {
    
    itemClick(key,item){
      // this.$router.replace(this.path[key])
      if(this.now!==this.path[key]) 
      {
        this.$router.replace(this.path[key])
      }
        
      //   // console.log(this.path[key])
        this.now=this.path[key]  
    },
    login(){
      this.now='/login'
    },

  onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(key => this.openKeys.indexOf(key) === -1);
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
  },
};

</script>
<style  scoped>
   .content{
     width: 100%;
   }
</style>
