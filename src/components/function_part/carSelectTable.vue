<template>
  <div>
    <el-row :gutter="10" style="padding-bottom: 5px">
      <el-col :span="4"><el-select size="mini" clearable v-model="carStatus" placeholder="车辆状态">
        <el-option label="正常运营" value="1"></el-option>
        <el-option label="已过户" value="2"></el-option>
        <el-option label="库存中" value="0"></el-option>
      </el-select></el-col>
      <el-col :span="4"><el-input size="mini" v-model="plateNum" placeholder="车牌号码"></el-input></el-col>
      <el-col :span="4"><el-input size="mini" v-model="carName" placeholder="车辆型号"></el-input></el-col>
      <el-col :span="4"><el-select size="mini" clearable v-model="branch" placeholder="选择城市">
        <el-option label="成都" value="1"></el-option>
        <el-option label="昆明" value="2"></el-option>
      </el-select></el-col>
      <el-col :span="4"><el-button size="mini" icon="search" @click="query">查询</el-button></el-col>
    </el-row>
    <el-row :gutter="10">
  <el-table
    ref="singleTable"
    :data="tableData"
    border
    highlight-current-row
    @current-change="handleCurrentRowChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="100">
    </el-table-column>
    <el-table-column
      property="plateNum"
      width="150"
      label="车牌号">
    </el-table-column>
    <el-table-column
      property="carName"
      label="车辆型号"
      >
      <template scope="scope">
        <el-tag >{{ scope.row.carName }}</el-tag>
      </template>
    </el-table-column>
    <el-table-column
      label="车辆状态"
      width="100">
      <template scope="scope">
                  <span>
                    <el-tag v-if="scope.row.carStatus=='正常运营'" type="primary">{{scope.row.carStatus}}</el-tag>
                    <el-tag v-if="scope.row.carStatus=='已过户'" type="danger">{{scope.row.carStatus}}</el-tag>
                  </span>
      </template>
    </el-table-column>
    <el-table-column
      property="branch"
      label="城市"
      width="120">
    </el-table-column>
    <el-table-column
      label="已绑定司机"
      width="180">
      <template scope="scope">
                  <span v-for="item in scope.row.driverCarListVoList">
                  <el-tag v-if="item.driverStatus=='正常运营'" type="primary">{{ item.driverName }}</el-tag>
                  <el-tag v-if="item.driverStatus=='合作结束'" type="danger">{{ item.driverName }}</el-tag>
                  </span>
      </template>
    </el-table-column>
  </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageNum"
        :page-sizes="[10, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next"
        :total="total"
        class="pull-right" style="margin-top: 8px">
      </el-pagination>
    </el-row>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data () {
        return {
          plateNum: '',
          carName: '',
          branch: '',
          carStatus: '',
          tableData: [],
          currentRow: null,
          total: 0,
          pageNum: 1,
          pageSize: 10
        }
      },
      methods: {
        query () {
          this.pageNum = 1
          this.pageSize = 10
          this.fetchData()
        },
        handleCurrentRowChange (val) {
          this.$emit('currentRow', val)
        },
        handleSizeChange (val) {
          this.pageSize = val
          this.fetchData()
        },
        handleCurrentChange (val) {
          this.pageNum = val
          this.fetchData()
        },
        fetchData () {
          const _this = this
          this.isLoading = true
          axios.get('/api/manage/car/list.do',
            {
              params: {
                plateNum: this.plateNum,
                branch: this.branch,
                carName: this.carName,
                carStatus: this.carStatus,
                pageSize: this.pageSize,
                pageNum: this.pageNum
              }
            }).then(function (res) {
              _this.total = res.data.data.total
              _this.tableData = res.data.data.list
              _this.isLoading = false
            })
        }
      }
    }
</script>

<style>
  .el-table .current-row {
    background: #c9e5f5;
  }
</style>
