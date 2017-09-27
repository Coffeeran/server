<template>
<div>
    <nav class="navbar-default navbar-static-side white-bg" role="navigation" style="margin-top:16px;margin-left:10px">
      <div class="sidebar-collapse">
        <ul class="nav metismenu" id="side-menu">

          <li>
            <router-link to="/basic/driver_list" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">司机列表</span><span class="label label-warning pull-right">13</span></router-link>
          </li>
          <li>
            <router-link to="/basic/car_list" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">车辆列表</span><span class="label label-warning pull-right">12</span></router-link>
          </li>
          <li>
            <router-link to="/basic/property_manage" role="button" v-cloak><i class="fa fa-diamond"></i> <span class="nav-label">资产管理</span><span class="label label-warning pull-right">12</span></router-link>
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
