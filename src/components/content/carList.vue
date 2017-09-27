<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            订单管理
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="20">
              <el-col :span="6"><el-input v-model="input" placeholder="司机手机"></el-input></el-col>
              <el-col :span="6"><el-input v-model="input" placeholder="司机姓名"></el-input></el-col>
              <el-col :span="6"><el-input v-model="input" placeholder="商品名称"></el-input></el-col>
              <el-col :span="6"><el-input v-model="input" placeholder="合作模式"></el-input></el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :offset="19" :span="5">
                <el-button  icon="search" size="large">查询</el-button>
                <el-button :plain="true" type="warning" icon="delete2" size="large">重置</el-button>
              </el-col>
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
              <el-tab-pane label="全部订单" name="first"></el-tab-pane>
              <el-tab-pane label="未付款" name="second"></el-tab-pane>
              <el-tab-pane label="已付款" name="third"></el-tab-pane>
              <el-tab-pane label="已购买保险" name="fourth"></el-tab-pane>
              <el-tab-pane label="交易成功" name="fifth"></el-tab-pane>
              <el-tab-pane label="交易关闭" name="sixth"></el-tab-pane>
              <el-tab-pane label="已取消" name="seventh"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <car-table></car-table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import carTable from '../function_part/carTable.vue'
  export default {
    components: {
      carTable
    },
    data () {
      return {
        activeName: 'first'
      }
    }
  }
</script>
<style>
  .el-row {
    margin-bottom: 10px;
  &:last-child {
     margin-bottom: 0;
   }
  }
  .el-col {
    border-radius: 4px;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
