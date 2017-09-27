<template>

  <div id="wrapper">


    <top-nav></top-nav>



    <router-view></router-view>


  </div>


</template>

<script>
  import topNav from './topNav'
  export default {
    name: 'layout',
    components: {
      'top-nav': topNav
    },
    data () {
      return {
        enabled: false,
        isLoading: false
      }
    },
    methods: {
    },
    mounted () {
    }
  }

</script>

<style>
  .router-link-active{
    color: #FFFFFF !important;
    background-color: #18a689;
    font-weight: 900 !important;
  }

  .control-label {
    font-size: 14px;
  }

  .ibox-title{
    border-bottom: 2px solid #e7eaec;
  }
  #navbar-center{
    margin-left: 30%;
  }
</style>
