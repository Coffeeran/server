<template>
  <div class="middle-box text-center loginscreen animated fadeInDown" >
    <div>
      <div>

        <h1 class="logo-name">壹栈</h1>

      </div>
      <p>         </p>
      <h3>欢迎登陆壹栈平台</h3>
      <form class="m-t" role="form" id="login">
        <div class="form-group" >
          <input type="text"  v-model="username" class="form-control" placeholder="用户名" required="">
        </div>
        <div class="form-group" >
          <input type="password" @keyup.enter="login" v-model="password" class="form-control" placeholder="密码" required="">
        </div>
        <button type="button"  @click="login" class="ladda-button ladda-button-demo btn btn-primary block full-width m-b" data-style="zoom-in">登录</button>

        <a href="#"><small>忘记密码?</small></a>
      </form>
      <p class="m-t"> <small>壹栈网络管理平台版权所有 &copy; 2017</small> </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login () {
      const _this = this
      axios.post('/api/user/login.do', {
        username: _this.username,
        password: _this.password
      }).then(function (res) {
        if (res.data.status === 0) {
          _this.$router.push({name: 'driver-list'})
          _this.showMessage(res.data.msg, 'success')
        } else {
          _this.showMessage(res.data.msg, 'error')
        }
      })
    },
    showMessage (msg, type) {
      this.$message({
        message: msg,
        type: type
      })
    }
  }
}
</script>

<style>

</style>
