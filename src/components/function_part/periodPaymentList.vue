<template>
  <div>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            资产管理
          </div>
          <div class="ibox-content" style="padding-bottom: 10px">
            <el-row :gutter="20">
              <el-col :span="5">
                <el-row :gutter="20">
                  <el-col :span="6">
                    <el-date-picker
                      v-model="startDate"
                      :type="dateType"
                      :format="dateFormat"
                      placeholder="选择起始周"
                      :clearable="false"
                      :picker-options="pickerOptions">
                    </el-date-picker>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6"><el-input v-model="driverName" placeholder="司机姓名"></el-input>
              </el-col>
              <el-col :span="6">
                <el-radio-group v-model="payStatus" @change="fetchData()">
                  <el-radio-button label="1">全部</el-radio-button>
                  <el-radio-button label="0">未缴清</el-radio-button>
                  <el-radio-button label="-1">未缴费</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-row>
          </div>
          <div class="ibox-footer">
                <el-button  icon="search" size="small" @click="query">查询</el-button>
                <el-button :plain="true" type="warning" icon="share" size="small" @click="exportCsv">导出数据</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <el-table
              v-loading.body="isLoading"
              :data="tableData"
              border
              style="width: 100%"
              ref="table">
              <el-table-column
                prop="driverName"
                label="司机姓名"
                width="100">
                <template scope="scope">
                  <a @click="route(scope.row.driverId)"><span style="margin-left: 10px">{{ scope.row.driverName }}</span></a>
                </template>
              </el-table-column>
              <el-table-column
                prop="phoneNum"
                label="司机手机号"
                width="150">
              </el-table-column>
              <el-table-column
                label="车牌号"
                width="120">
                <template scope="scope">
                  <span style="margin-left: 1px">{{ scope.row.plateNum }}</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="dueAmount"
                label="应收金额-日期" width="150"
                >
                <template scope="scope">
                  {{scope.row.dueAmount}}
                  <!--<small v-if="coModelType==30">&#45;&#45;{{scope.row.planDetailVo.planStartDate}}</small>-->
                </template>
              </el-table-column>
              <el-table-column
                label="已收金额">
                <template scope="scope">
                  <el-popover
                    placement="right"
                    width="200"
                    trigger="click"
                    >
                    <p v-for="item in paymentDetail">{{item.payment}}元 {{item.paymentPlatform}} {{item.comment}}   时间：{{item.updateTime}}</p>
                    <div slot="reference" class="name-warpper" @click="fetchPaymentDetail(scope.row.driverId)">
                      <el-tag v-if="scope.row.payment>0" color="#FFFFFF" type="success" size="mini">{{scope.row.payment}}</el-tag>
                      <strong v-if="scope.row.payment<=0">-</strong>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                label="付款状态">
                <template scope="scope">
                  <el-icon v-if="scope.row.dueAmount-scope.row.payment>0" name="close"></el-icon>
                  <el-icon v-if="scope.row.dueAmount-scope.row.payment<=0" name="check"></el-icon>
                </template>
              </el-table-column>
              <el-table-column
                label="操作" width="200">
                <template scope="scope">
                <el-button
                  size="small"
                  @click="handleAddClick(scope.row.driverId,scope.row.driverName)">添加记录</el-button>
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
            <el-dialog :title="addDriverName"
                       :visible.sync="dialogFormVisible"
                       :modal="false"
                        top="2%">
              <el-form :model="form">
                <el-form-item label="付款人"  :label-width="formLabelWidth">
                  <el-input v-model="form.payer" size="small" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="款项金额"  :label-width="formLabelWidth">
                  <el-input v-model="form.payment" size="small" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="款项渠道" :label-width="formLabelWidth">
                  <el-select v-model="form.payMethod" placeholder="请选择付款方式">
                    <el-option label="微信" value="2"></el-option>
                    <el-option label="支付宝" value="1"></el-option>
                    <el-option label="现金" value="3"></el-option>
                    <el-option label="银行转账" value="4"></el-option>
                    <el-option label="POS机" value="5"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="渠道流水号"  :label-width="formLabelWidth">
                  <el-input v-model="form.platformNum" size="small" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="还款周期" :label-width="formLabelWidth">
                  <el-date-picker
                    v-model="form.payTime"
                    type="date"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="备注"  :label-width="formLabelWidth">
                  <el-input v-model="form.comment" size="small" auto-complete="off"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="handleAddPayment()">确 定</el-button>
              </div>
            </el-dialog>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import CsvExport from '../../utils/CsvExport'

  export default {
    data () {
      return {
        dialogFormVisible: false,
        dateType: '',
        dateFormat: '',
        addDriverName: '',
        driverId: '',
        isLoading: false,
        pickerOptions: {
          firstDayOfWeek: 2,
          disabledDate (time) {
            return time >= new Date()
          }
        },
        tableData: [],
        startDate: '',
        coModelType: '',
        total: 5,
        driverName: '',
        payStatus: 1,
        pageNum: 1,
        pageSize: 10,
        form: {
          payer: '',
          payTime: '',
          payMethod: '',
          platformNum: '',
          comment: ''
        },
        paymentDetail: '',
        formLabelWidth: '120px'
      }
    },
    methods: {
      query () {
        this.pageNum = 1
        this.pageSize = 10
        this.form.payTime = this.startDate
        this.fetchData()
      },
      message (msg, success) {
        this.$notify({
          title: success ? '成功' : '错误',
          message: msg,
          offset: 100,
          type: success ? 'success' : 'warning'
        })
      },
      fetchData () {
        const _this = this
        this.isLoading = true
        axios.get('/api/manage/period_payment/list.do',
          {
            params: {
              date: this.startDate,
              driverName: this.driverName,
              coModelType: this.coModelType,
              payStatus: this.payStatus,
              pageSize: this.pageSize,
              pageNum: this.pageNum
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
      handleSizeChange (val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.fetchData()
      },
      handleAddPayment () {
        const _this = this
        axios.get('/api/manage/period_payment/add.do', {
          params: {

            driverId: _this.driverId,
            payment: _this.form.payment,
            payer: _this.form.payer,
            paymentPlatform: _this.form.payMethod,
            payTime: _this.form.payTime.getTime(),
            platformNum: _this.form.platformNum,
            comment: _this.form.comment
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.dialogFormVisible = false
            _this.message('成功添加数据,等待确认', true)
            _this.fetchData()
          }
          if (res.data.status === 1) {
            _this.message(res.data.msg, false)
          }
          if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          }
        })
      },
      handleAddClick (driverId, driverName) {
        this.addDriverName = driverName
        this.dialogFormVisible = true
        this.driverId = driverId
        this.form.payer = driverName
        this.form.payment = ''
        this.form.payMethod = ''
        this.form.comment = ''
        this.form.platformNum = ''
      },
      route (driverId) {
        this.$router.push({name: 'driver-detail', params: {id: driverId}})
      },
      fetchPaymentDetail (_driverId) {
        const _this = this
        axios.get('/api/manage/period_payment/current_payment_detail.do', {
          params: {
            driverId: _driverId,
            date: _this.startDate
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.paymentDetail = res.data.data
          } else if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          }
        })
      },
      exportCsv () {
        let columns = this.$refs.table.$children.filter(t => t.prop != null)
        const fields = columns.map(t => t.prop)
        const fieldNames = columns.map(t => t.label)
        CsvExport(this.tableData, fields, fieldNames, '列表')
      }
    },
    created: async function () {
      this.startDate = new Date(this.$route.params.date)
      this.form.payTime = new Date(this.$route.params.date)
      this.coModelType = this.$route.params.co_model_type
      //  todo list日期显示格式
      if (this.coModelType === '30') {
        this.dateType = 'month'
        this.dateFormat = 'yyyy - MM'
      } else if (this.coModelType === '40') {
        this.dateType = 'week'
        this.dateFormat = 'yyyy-MM-dd 第 WW 周'
      }
      this.dateType = 'month'
      this.dateFormat = 'yyyy-MM'
      this.fetchData()
    }
  }
</script>

<style scoped>


</style>
