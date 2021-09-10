<template>
  <div>
    <a-statistic title="剩余专用车位" :value="zhuan" style="margin-right: 50px" />
    <a-statistic title="剩余普通车位" :value="pu" />
  </div>
</template>
<script>
export default {
  name:'list',
  props:{
    zhuan:{
      type:Number,
      default(){
        return
      }
    },
    pu:{
      type:Number,
      default(){
        return
      }
    }
  }
  }
</script>
