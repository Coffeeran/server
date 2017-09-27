<template>
  <div>
    <nav class="navbar-default navbar-static-side white-bg" role="navigation" style="margin-top:16px;margin-left:10px">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">
          <li>
            <router-link to="/order/new_order" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">新建订单</span><span class="label label-warning pull-right">13</span></router-link>
          </li>
          <li>
            <router-link to="/order/order_manager" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">订单管理</span><span class="label label-warning pull-right">13</span></router-link>
          </li>
          <li>
            <router-link to="/order/stock_manager" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">库存管理</span><span class="label label-warning pull-right">13</span></router-link>
          </li>
        </ul>
      </div>
    </nav>
    <div id="page-wrapper" class="gray-bg">
      <div class="wrapper wrapper-content animated fadeInRight" style="margin-left:10px">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
    export default {}
</script>

<style>

</style>
