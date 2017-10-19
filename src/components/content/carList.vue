<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            车辆列表
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="4"><el-input size="small" v-model="plateNum" placeholder="车牌号码"></el-input></el-col>
              <el-col :span="4"><el-input size="small" v-model="carName" placeholder="车辆型号"></el-input></el-col>
              <el-col :span="4"><el-select size="small" clearable v-model="carStatus" placeholder="车辆状态">
                <el-option label="正常运营" value="1"></el-option>
                <el-option label="已过户" value="2"></el-option>
                <el-option label="库存中" value="0"></el-option>
              </el-select></el-col>
              <el-col :span="4"><el-select size="small" clearable v-model="branch" placeholder="选择城市">
                <el-option label="成都" value="0"></el-option>
                <el-option label="昆明" value="1"></el-option>
              </el-select></el-col>
              <el-col :span="4"><el-select size="small" clearable v-model="orderBy" placeholder="排序方式">
                <el-option label="违章扣分" value="score"></el-option>
                <el-option label="违章罚金" value="money"></el-option>
                <el-option label="加入时间" value="pickDate"></el-option>

              </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :span="4">
                <el-autocomplete
                  class="inline-input"
                  v-model="driverName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="请输入司机姓名"
                  :trigger-on-focus="false"
                  size="small"
                ></el-autocomplete>

              </el-col>
            </el-row>
          </div>
          <div class="ibox-footer">
            <el-button  icon="search" size="small" @click="query">查询</el-button>
            <el-button :plain="true" @click="reset" type="warning" icon="delete2" size="small">重置</el-button>
            <el-button @click="toAddOrUpdateCar(0)" type="info" size="small" class="pull-right" >新增车辆<el-icon name="plus"></el-icon></el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            <el-tabs v-model="activeName">
              <el-tab-pane label="全部" name="first"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <el-table
              v-loading.body="isLoading"
              :data="tableData"
              border
              style="width: 100%"
              :stripe="true">
              <el-table-column
                label="车牌号"
                width="110"
                fixed>
                <template scope="scope">
                  <a @click="toDriverDetail(scope.row.driverCarListVoList[0].driverId)">{{ scope.row.plateNum }}</a>
                </template>
              </el-table-column>
              <el-table-column
                label="车辆型号"
                width="180"
                >
                <template scope="scope">
                  <el-tag >{{ scope.row.carName }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="车辆状态" width="100">
                <template scope="scope">
                  <span>
                    <el-tag v-if="scope.row.carStatus=='正常运营'" type="primary">{{scope.row.carStatus}}</el-tag>
                    <el-tag v-if="scope.row.carStatus=='已过户'" type="danger">{{scope.row.carStatus}}</el-tag>
                    <el-tag v-if="scope.row.carStatus=='库存中'" >{{scope.row.carStatus}}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column
                label="城市"
                width="80">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.branch }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="绑定司机"
                width="150"
                align="center">
                <template scope="scope">
                  <span v-for="item in scope.row.driverCarListVoList">
                  <el-tag v-if="item.driverStatus=='正常运营'" type="primary">{{ item.driverName }}</el-tag>
                  <el-tag v-if="item.driverStatus=='合作结束'" type="danger">{{ item.driverName }}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="提车日期" width="180">
                <template scope="scope">
                  <span>
                    {{scope.row.pickDate}}
                  </span>
              </template>
              </el-table-column>
              <el-table-column label="违章情况" width="100">
                <template scope="scope">
                  <small >{{ scope.row.ticket}}</small>
                </template>
              </el-table-column>
              <el-table-column label="赎回日期" width="180">
                <template scope="scope">
                  <span>
                    {{scope.row.redeemDate}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="过户日期" width="180">
                <template scope="scope">
                  <span>
                    {{scope.row.transferDate}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               fixed="right"
              width="80">
                <template scope="scope">
                  <el-button @click="toAddOrUpdateCar(scope.row.carId)" :plain="true" size="small" type="info">修改</el-button>
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    data () {
      return {
        total: 5,
        pageNum: 1,
        driverName: '',
        plateNum: '',
        pageSize: 10,
        activeName: 'first',
        carName: '',
        branch: '',
        carStatus: '',
        orderBy: '',
        tableData: [],
        isLoading: false
      }
    },
    methods: {
      fetchData () {
        const _this = this
        this.isLoading = true
        axios.get('/api/manage/car/list.do',
          {
            params: {
              plateNum: this.plateNum,
              branch: this.branch,
              carName: this.carName,
              driverName: this.driverName,
              carStatus: this.carStatus,
              orderBy: this.orderBy,
              pageSize: this.pageSize,
              pageNum: this.pageNum
            }
          }).then(function (res) {
            _this.total = res.data.data.total
            _this.tableData = res.data.data.list
            _this.isLoading = false
          })
      },
      toDriverDetail (driverId) {
        this.$router.push({name: 'driver-detail', params: {id: driverId}})
      },
      toAddOrUpdateCar (carId) {
        this.$router.push({name: 'add-or-update-car', params: {id: carId}})
      },
      query () {
        this.pageNum = 1
        this.pageSize = 10
        this.fetchData()
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.fetchData()
      },
      querySearchAsync (queryString, cb) {
        const _this = this
        axios.get('api/manage/driver/name_list.do', {
          params: {
            driverName: queryString
          }
        }).then(function (res) {
          var driverList = res.data.data
          var results = queryString ? driverList.filter(_this.createFilter(queryString)) : driverList
          // 调用 callback 返回建议列表的数据
          cb(results)
        })
      },
      createFilter (queryString) {
        return (driver) => {
          return (driver.value.indexOf(queryString.toLowerCase()) === 0)
        }
      },
      reset () {
        this.plateNum = ''
        this.carName = ''
        this.carStatus = ''
        this.branch = ''
        this.orderBy = ''
        this.driverName = ''
      }
    },
    created: async function () {
      this.fetchData()
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
