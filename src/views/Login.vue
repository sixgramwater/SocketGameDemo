<template>
  <mu-container class="login-container">
    <!-- <mu-paper class="login-container"> -->
      <!-- <div></div> -->
      <!-- <mu-paper :z-depth="4" class="login-paper"> -->
      <div class="title">
        <h1>登录</h1>
      </div>
      <div class="form-container">
      <mu-form ref="form" :model="validateForm" class="mu-demo-form" label-width="60" label-position="top">
        <mu-form-item label="用户名" prop="username" :rules="usernameRules">
          <mu-text-field v-model="validateForm.username" prop="username"></mu-text-field>
        </mu-form-item>
        <mu-form-item label="密码" prop="password" :rules="passwordRules">
            <mu-text-field type="password" v-model="validateForm.password" prop="password"></mu-text-field>
        </mu-form-item>
        <mu-form-item prop="isAgree" :rules="argeeRules">
          <mu-checkbox label="同意用户协议" v-model="validateForm.isAgree"></mu-checkbox>
        </mu-form-item>
        <mu-flex class="flex-wrapper" justify-content="center">
          <mu-form-item>
          
            <mu-button color="primary" @click="loginSubmit">提交</mu-button>
            <mu-button @click="clear">重置</mu-button>
          </mu-form-item>
          <!-- <mu-flex class="flex-demo" justify-content="center" >center</mu-flex> -->
        </mu-flex>
      </mu-form>
      </div>
      <!-- </mu-paper> -->
    <!-- </mu-paper> -->
    
  </mu-container>
</template>

<script>
import { login } from '@/api/api.js'

export default {
  data () {
    return {
      usernameRules: [
        { validate: (val) => !!val, message: '必须填写用户名'},
        { validate: (val) => val.length >= 3, message: '用户名长度大于3'}
      ],
      passwordRules: [
        { validate: (val) => !!val, message: '必须填写密码'},
        { validate: (val) => val.length >= 3 && val.length <= 10, message: '密码长度大于3小于10'}
      ],
      argeeRules: [{ validate: (val) => !!val, message: '必须同意用户协议'}],
      validateForm: {
        username: '',
        password: '',
        isAgree: false
      }
    }
  },
  methods: {
    loginSubmit(){
      this.$refs.form.validate().then((result) => {
        // console.log('form valid: ', result)
        if(!result) {
          return false;
        }
        else {
          let para = {
            userName: this.validateForm.username,
            password: this.validateForm.password,
          }
          login(para).then((res)=>{
            // console.log(res.data);
            if(res.data.code === 200){
              // this.$toast.success('登陆成功');
              this.$message({
                message: '登录成功',
                type: 'success'
              });
              this.$store.dispatch('user/setUser', res.data.data);
              sessionStorage.setItem('user', JSON.stringify(res.data.data));
              
              this.$router.replace(this.$route.query.redirect)
                .catch(err=>{console.log(err)})
              // this.$router.push(this.$route.query.redirect);
              // this.$store.dispatch('user/t')
            }
            else {
              // this.$toast.error(res.data.message);
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
            // else if(res.data.code == 401){
            //   this.$message({
            //     message: ,
            //     type: 'success'
            //   });
            // }
          })
        }
      });
    },
    clear () {
      this.$refs.form.clear();
      this.validateForm = {
        username: '',
        password: '',
        isAgree: false
      };
    }
  }
}
</script>

<style lang="scss">
// .login-container{
//   width: 600px;
// }
.login-container{
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;;
}
.form-container{
  width: 100%;
  max-width: 500px;
  padding: 30px 40px;
}
.title{
  width: 100%;
  display: inline-block;
  h1{
    text-align: center;
  }
}
// .mu-demo-form{
//   width: 100%;
//   max-width: 460px;
  
//   // padding: 30px 10px;
//   // margin: 0 auto;
// }
</style>