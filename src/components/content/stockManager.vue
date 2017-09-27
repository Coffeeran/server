<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            库存管理
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="20">
              <el-col :span="3"><el-button  icon="plus">添加产品</el-button></el-col>
              <el-col :offset="10" :span="6"><el-input v-model="input" placeholder="商品名称"></el-input></el-col>
              <el-col :span="5"> <el-button  icon="search">查询</el-button>
                <el-button :plain="true" type="warning" icon="delete2">重置</el-button></el-col>
            </el-row>


          </div>
        </div>
      </div>
    </div>

    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name="first"></el-tab-pane>
              <el-tab-pane label="已上架" name="second"></el-tab-pane>
              <el-tab-pane label="已下架" name="third"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <stock-table></stock-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import stockTable from '../function_part/stockTable.vue'
  export default {
    components: {
      stockTable
    },
    data () {
      return {
        activeName: 'first'
      }
    }
  }
</script>
<style>

</style>
