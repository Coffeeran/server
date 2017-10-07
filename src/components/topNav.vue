<template>
  <div id="top-nav" class="row border-bottom" >
  <nav class="navbar navbar-fixed-top" role="navigation" style="margin-bottom: 0;display:flex">
    <div class="navbar-header">
      <a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i class="fa fa-bars"></i> </a>
    </div>

    <ul class="nav navbar-top-links navbar-right" id="navbar-center">
      <li class="">
        <router-link to="/console" role="button" v-cloak>工作台</router-link>
      </li>
      <li class="">
        <router-link to="/basic" role="button" v-cloak>基本信息</router-link>
      </li>
      <li class="">
        <router-link to="/order" role="button" v-cloak>订单系统</router-link>
      </li>
      <li class="">
        <router-link to="/user" role="button" v-cloak>用户信息</router-link>
      </li>

    </ul>

    <ul class="nav navbar-top-links navbar-right" style="margin-left:10%">
      <li>
        <span class="m-r-sm text-muted welcome-message">{{name}}</span>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
          <i class="fa fa-envelope"></i>  <span class="label label-warning">16</span>
        </a>
        <ul class="dropdown-menu dropdown-messages">

        </ul>
      </li>
      <li class="dropdown">
        <a class="dropdown-toggle count-info" data-toggle="dropdown" href="#">
          <i class="fa fa-bell"></i>  <span class="label label-primary">8</span>
        </a>
        <ul class="dropdown-menu dropdown-alerts">

        </ul>
      </li>

      <li>
        <a @click="logout">
          <i class="fa fa-sign-out"></i> 注销
        </a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      name: ''
    }
  },
  methods: {
    getName () {
      const _this = this
      axios.post('/api/user/get_user_info.do').then(function (res) {
        _this.name = res.data.data.name
      })
    },
    logout () {
      axios.post('/api/user/logout.do')
      this.$router.push({name: 'login'})
    }
  },
  created () {
    this.getName()
  }
}
</script>

<style>

</style>
