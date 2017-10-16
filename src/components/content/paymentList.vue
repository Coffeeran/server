<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            收款列表
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="10">
              <el-col :span="5">
                <el-date-picker
                  size="small"
                  range-separator=" 至 "
                  v-model="dateArray"
                  type="daterange"
                  placeholder="选择起止日期">
                </el-date-picker>              </el-col>
              <el-col :span="4"><el-input size="small" v-model="driverName" placeholder="司机姓名"></el-input></el-col>
              <el-col :span="4"><el-select size="small" clearable v-model="coModelType" placeholder="合作模式">
                <el-option label="租赁" value="20"></el-option>
                <el-option label="租购月供" value="30"></el-option>
                <el-option label="租购周供" value="40"></el-option>
                <el-option label="全款" value="10"></el-option>
              </el-select></el-col>

            </el-row>
            <el-row :gutter="10">
              <el-col :span="4">
                <el-input size="small" v-model="payer" placeholder="付款人"></el-input>
              </el-col>
              <el-col :span="5">
                <el-radio-group v-model="platformStatus" size="small">
                  <el-radio-button label="0">未确认</el-radio-button>
                  <el-radio-button label="1">正常</el-radio-button>
                  <el-radio-button label="2">逾期</el-radio-button>
                  <el-radio-button label="-1">作废</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
          <div class="ibox-footer">
            <el-button  icon="search" size="small" @click="query">查询</el-button>
            <el-button :plain="true" @click="reset" type="warning" icon="delete2" size="small">重置</el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane label="全部" name=""></el-tab-pane>
              <el-tab-pane label="支付宝" name="1"></el-tab-pane>
              <el-tab-pane label="银行" name="4"></el-tab-pane>
              <el-tab-pane label="微信" name="2"></el-tab-pane>
              <el-tab-pane label="现金" name="3"></el-tab-pane>
              <el-tab-pane label="POS机" name="5"></el-tab-pane>
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
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column
                label="款项状态"
                width="100">
                <template scope="scope">
                  <el-popover
                    placement="left"
                    width="160">
                    <div style="text-align: right; margin: 0">
                      <el-button type="primary" size="mini">正常</el-button>
                      <el-button type="warning" size="mini">逾期</el-button>
                      <el-button type="danger" size="mini">作废</el-button>
                    </div>
                    <el-button slot="reference" size="small">{{ scope.row.paymentStatus }}</el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                label="款项金额"
                width="100">
                <template scope="scope">
                  <span style="margin-left: 10px">{{ Number(scope.row.paymentAmount).toLocaleString() }}</span>
                </template>
              </el-table-column>
              <el-table-column label="付款人" width="100">
                <template scope="scope">
                  <small style="margin-left: 10px">{{ scope.row.payer }}</small>
                </template>
              </el-table-column>
              <el-table-column
                label="款项渠道"
                width="100">
                <template scope="scope">
                  <el-tag v-if="scope.row.paymentPlatform=='微信'" :hit="true" type="success" color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='支付宝'" :hit="true" type="primary" color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='现金'" :hit="true" type="gray"  color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='银行转账'" style="color: #fd6720; border-color: #fd6720;"   color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='POS机'" style="color: #E9CE46; border-color: #E9CE46;"   color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="司机姓名" width="100">
                <template scope="scope">
                  <small style="margin-left: 10px">{{ scope.row.driverName }}</small>
                </template>
              </el-table-column>

              <el-table-column
                label="备注"
                width="100">
                <template scope="scope">
                  <small>{{scope.row.comment}}</small>
                </template>
              </el-table-column>
              <el-table-column label="添加时间" width="180">
                <template scope="scope">
                  <el-tag>{{ scope.row.addTime }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="付款周期时间" width="120">
                <template scope="scope">
                  <el-tag>{{ scope.row.periodTime }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               width="80"
              fixed="right">
                <template scope="scope">
                  <el-button @click="toAddOrUpdateDriver(scope.row.driverId)" :plain="true" size="mini" type="info">修改</el-button>
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
        visible2: false,
        total: 5,
        pageNum: 1,
        pageSize: 10,
        activeName: '',
        paymentPlatform: '',
        dateArray: [new Date(new Date().getTime() - 60 * 60 * 24 * 1000 * 7), new Date()],
        payer: '',
        driverName: '',
        platformStatus: '0',
        coModelType: '',
        tableData: [],
        isLoading: false
      }
    },
    methods: {
      fetchData () {
        const _this = this
        this.isLoading = true
        axios.get('/api/manage/period_payment/payment_list.do',
          {
            params: {
              startTime: _this.dateArray[0].getTime(),
              endTime: _this.dateArray[1].getTime(),
              driverName: _this.driverName,
              coModelType: _this.coModelType,
              payer: _this.payer,
              platformStatus: _this.platformStatus,
              paymentPlatform: _this.paymentPlatform,
              pageSize: _this.pageSize,
              pageNum: _this.pageNum
            }
          }).then(function (res) {
            if (res.data.status === 0) {
              _this.total = res.data.data.total
              _this.tableData = res.data.data.list
              _this.isLoading = false
            } else if (res.data.status === 10) {
              _this.$router.push({name: 'login'})
            }
          })
      },
      toAddOrUpdateDriver (driverId) {
        this.$router.push({name: 'add-or-update-driver', params: {id: driverId}})
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
      reset () {
        this.driverName = ''
        this.phoneNum = ''
        this.driverStatus = ''
        this.coModelType = ''
        this.orderBy = ''
        this.plateNum = ''
      },
      handleClick (tab) {
        this.paymentPlatform = tab.name
        this.fetchData()
      }
    },
    mounted () {
      this.fetchData()
    }
  }
</script>
<style>
  .el-message{
    top: 20%;
  }

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
