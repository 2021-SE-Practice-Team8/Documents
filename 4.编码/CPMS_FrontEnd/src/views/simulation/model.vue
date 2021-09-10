<template>
  <div>
    <div>
      <a-radio-group default-value="a" button-style="solid">
        <a-radio-button value="a" @click='jinClick'>
          进
        </a-radio-button>
        <span class="block">
          
        </span>
        <a-radio-button value="b" @click='chuClick'>
          出
        </a-radio-button>
      </a-radio-group>
    </div>
    
  </div>
</template>
<script>
export default {
  name:'model',
  methods:{
    jinClick(){
      this.$emit('jinClick')
      // alert('sada')
    },
    chuClick(){
      this.$emit('chuClick')
      // alert('sada')
    }
  }
  }
  
</script>
<style scoped>
    .block{
      background-color: #fff;
      padding: 100px;
    }
</style>
