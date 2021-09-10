<template>
  <div class="content">
      <a-form
    id="components-form-demo-normal-login"
    :form="form"
    class="login-form"
    @submit="handleSubmit"
  >
    <a-form-item>
      <a-input
        v-decorator="[
          'userName',
          { rules: [{ required: true, message: 'Please input your username!' }] },
        ]"
        placeholder="Username"
      >
        <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-input
        v-decorator="[
          'password',
          { rules: [{ required: true, message: 'Please input your Password!' }] },
        ]"
        type="password"
        placeholder="Password"
      >
        <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
      </a-input>
    </a-form-item>
    <a-form-item>
      <a-button type="primary" html-type="submit" class="login-form-button">
        Log in
      </a-button>
    </a-form-item>
  </a-form>
  </div>
</template>

<script>
import { send ,login} from '../../network/home';
export default {
    name:'login',
    beforeCreate() {
        this.form = this.$form.createForm(this, { name: 'normal_login' });
    },
    methods: {
        handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
            let data={
              username: '',
              password: ''
            }
            data.username=values.userName
            data.password=values.password
            console.log(data)
            login(data).then(res=>{
              if(res.message==="Login OK!"){
                this.$bus.$emit('open')
                this.$bus.$emit("login_dis")
                this.$router.replace("/simulation")
                alert("登陆成功！")
              }
            }).catch(
              err=>{
                alert("账号或密码错误！")
              }
            )
            }
        });
        },
    },
    created(){
        
    }
}
</script>

<style>
.content{
        position:relative;
        width: 50%;
    }
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>