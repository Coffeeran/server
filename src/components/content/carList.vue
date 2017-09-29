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
              <el-col :span="4"><el-input v-model="plateNum" placeholder="车牌号码"></el-input></el-col>
              <el-col :span="4"><el-input v-model="carName" placeholder="车辆型号"></el-input></el-col>
              <el-col :span="4"><el-select clearable v-model="carStatus" placeholder="车辆状态">
                <el-option label="正常运营" value="1"></el-option>
                <el-option label="已过户" value="2"></el-option>
                <el-option label="库存中" value="0"></el-option>
              </el-select></el-col>
              <el-col :span="4"><el-select clearable v-model="branch" placeholder="选择分支">
                <el-option label="成都" value="1"></el-option>
                <el-option label="昆明" value="2"></el-option>
              </el-select></el-col>
              <el-col :span="4"><el-select clearable v-model="orderBy" placeholder="排序方式">
                <el-option label="违章扣分" value="score"></el-option>
                <el-option label="违章罚金" value="money"></el-option>
                <el-option label="加入时间" value="pickDate"></el-option>

              </el-select>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :offset="19" :span="5">
                <el-button  icon="search" size="large" @click="query">查询</el-button>
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
            <el-tabs v-model="activeName">
              <el-tab-pane label="全部" name="first"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <el-table
              v-loading.body="isLoading"
              :data="tableData"
              border
              style="width: 100%">
              <el-table-column
                label="车牌号"
                width="110">
                <template scope="scope">
                  <a @click="route(scope.row.carId)">{{ scope.row.plateNum }}</a>
                </template>
              </el-table-column>
              <el-table-column
                label="车辆型号"
                width="220">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.carName }}</span>
                </template>
              </el-table-column>
              <el-table-column label="车辆状态" width="100">
                <template scope="scope">
                  <span>
                    <el-tag v-if="scope.row.carStatus=='正常运营'" type="success">{{scope.row.carStatus}}</el-tag>
                    <el-tag v-if="scope.row.carStatus=='已过户'" type="warning">{{scope.row.carStatus}}</el-tag>
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
                width="150">
                <template scope="scope">
                  <span v-for="item in scope.row.driverCarListVoList">
                  <el-tag v-if="item.driverStatus=='正常运营'" type="primary">{{ item.driverName }}</el-tag>
                  <el-tag v-if="item.driverStatus=='合作结束'" type="danger">{{ item.driverName }}</el-tag>
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="提车日期" width="200">
                <template scope="scope">
                  <span>
                    {{scope.row.pickDate}}
                  </span>
              </template>
              </el-table-column>
              <el-table-column label="违章扣分" width="100">
                <template scope="scope">
                  <small >{{ scope.row.ticketScore}}</small>
                </template>
              </el-table-column>
              <el-table-column label="违章罚款">
                <template scope="scope">
                  <small style="margin-left: 10px">{{ scope.row.ticketMoney }}</small>
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
              branch: this.branch,
              carName: this.carName,
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
      login: async function () {
        return await axios.post('/api/user/login.do', {
          username: 'admin',
          password: '123'
        })
      },
      route (driverId) {
        this.$router.push({name: 'driver-detail', params: {id: driverId}})
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
      }
    },
    created: async function () {
      await this.login()
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
