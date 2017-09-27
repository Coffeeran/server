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
        <span class="m-r-sm text-muted welcome-message">壹栈在线管理平台</span>
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
        <a href="login.html">
          <i class="fa fa-sign-out"></i> 注销
        </a>
      </li>
    </ul>
  </nav>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
