<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            订单管理
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="4"><el-input v-model="driverName" placeholder="司机姓名"></el-input></el-col>
              <el-col :span="4"><el-input v-model="phoneNum" placeholder="司机手机"></el-input></el-col>
              <el-col :span="4"><el-select clearable v-model="driverStatus" placeholder="司机状态">
                <el-option label="正常运营" value="2"></el-option>
                <el-option label="解除合作" value="3"></el-option>
              </el-select></el-col>
              <el-col :span="4"><el-select clearable v-model="coModelType" placeholder="合作模式">
                <el-option label="租赁" value="20"></el-option>
                <el-option label="租购月供" value="30"></el-option>
                <el-option label="租购周供" value="40"></el-option>
              </el-select></el-col>
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
                label="司机姓名"
                width="100">
                <template scope="scope">
                  <a @click="route(scope.row.driverId)">{{ scope.row.driverName }}</a>
                </template>
              </el-table-column>
              <el-table-column
                label="司机手机号"
                width="150">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.phoneNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="合作模式"
                width="150">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.coModelType }}</span>
                </template>
              </el-table-column>
              <el-table-column
                label="运营状态"
                width="100">
                <template scope="scope">
                  <span><el-tag type="success">{{scope.row.driverStatus}}</el-tag></span>
                </template>
              </el-table-column>
              <el-table-column label="车牌号-车型" width="250">
                <template scope="scope">
                  <span style="margin-left: 10px"><el-tag>{{ scope.row.plateNum }}-{{scope.row.carName}}</el-tag></span>
                </template>
              </el-table-column>
              <el-table-column label="加入时间" width="150">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.periodStartDate }}</span>
                </template>
              </el-table-column>
              <el-table-column label="违章扣分">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.ticketScore}}</span>
                </template>
              </el-table-column>
              <el-table-column label="违章罚款">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ scope.row.ticketMoney }}</span>
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
      pageSize: 10,
      activeName: 'first',
      driverName: '',
      phoneNum: '',
      driverStatus: '',
      coModelType: '',
      tableData: [],
      isLoading: false
    }
  },
  methods: {
    fetchData () {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/driver/list.do',
        {
          params: {
            driverName: this.driverName,
            phoneNum: this.phoneNum,
            driverStatus: this.driverStatus,
            coModelType: this.coModelType,
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
