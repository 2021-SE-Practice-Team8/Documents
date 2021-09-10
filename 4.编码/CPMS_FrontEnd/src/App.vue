<template>
  <div id="app">
    <maintabbar></maintabbar>
  </div>
</template>
<script>
import maintabbar from './components/maintabbar.vue'
export default {
  name: 'App',
  components: {
    maintabbar
  },
  created(){
    // let isActive = document.getElementById("isActive");
    // console.login_dis(isActive)
    // if(isActive==false){
    //   this.$bus.$emit("open");
    //   this.$bus.$emit("login_dis");
    // }
  }
}
</script>
<style>
  
</style>
