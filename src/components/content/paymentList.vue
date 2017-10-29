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
              <el-col :span="4">

                <el-autocomplete
                  class="inline-input"
                  v-model="driverName"
                  :fetch-suggestions="querySearchAsync"
                  placeholder="司机姓名"
                  :trigger-on-focus="false"
                  size="small"
                >
                </el-autocomplete>
                </el-col>
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
            <el-button type="info" size="small" class="pull-right" @click="handleAddClick()" >新增收款<el-icon name="plus"></el-icon></el-button>
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
                <el-tab-pane  label="支付宝" name="1"></el-tab-pane>
                <el-tab-pane  label="微信" name="2"></el-tab-pane>
                <el-tab-pane  label="建设银行" name="3"></el-tab-pane>
                <el-tab-pane  label="平安银行" name="4"></el-tab-pane>
                <el-tab-pane  label="招商银行" name="5"></el-tab-pane>
                <el-tab-pane  label="POS机" name="6"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="ibox-content" element-loading-text="加载中" style="padding-bottom: 50px">
            <el-table
              ref="paymentList"
              @selection-change="handleSelectionChange"
              v-loading.body="isLoading"
              :data="tableData"
              border
              show-summary
              style="width: 100%"
              :stripe="true">
              <el-table-column
                type="selection"
                width="60">
              </el-table-column>
              <el-table-column
                label="款项状态"
                width="100">
                <template scope="scope">
                  <el-popover
                    placement="left"
                    width="230">
                    <div style="text-align: right; margin: 0">
                      <el-button @click="submit(0)" size="mini">取消确认</el-button>
                      <el-button @click="submit(1)" type="primary" size="mini">正常</el-button>
                      <el-button @click="submit(2)" type="warning" size="mini">逾期</el-button>
                      <el-button @click="submit(-1)" type="danger" size="mini">作废</el-button>
                    </div>
                    <el-button v-if="platformStatus == '0'" @click="toggleSelection(scope.row)" slot="reference" size="mini">{{ scope.row.paymentStatus }}</el-button>
                    <el-button v-if="platformStatus == '1'" @click="toggleSelection(scope.row)" slot="reference" size="mini" type="success">{{ scope.row.paymentStatus }}</el-button>
                    <el-button v-if="platformStatus == '2'" @click="toggleSelection(scope.row)" slot="reference" size="mini" type="warning">{{ scope.row.paymentStatus }}</el-button>
                    <el-button v-if="platformStatus == '-1'" @click="toggleSelection(scope.row)" slot="reference" size="mini" type="danger">{{ scope.row.paymentStatus }}</el-button>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column
                prop="paymentAmount"
                label="款项金额"
                width="100">
              </el-table-column>
              <el-table-column label="付款人" width="90">
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
                  <el-tag v-if="scope.row.paymentPlatform=='建设银行'" :hit="true" type="gray"  color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='平安银行'" style="color: #fd6720; border-color: #fd6720;"   color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
                  <el-tag v-if="scope.row.paymentPlatform=='招商银行'" style="color: #fd6720; border-color: #fd6720;"   color="#FFFFFF">{{ scope.row.paymentPlatform }}</el-tag>
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
                width="120">
                <template scope="scope">
                  <small>{{scope.row.comment}}</small>
                </template>
              </el-table-column>
              <el-table-column label="付款时间" width="180">
                <template scope="scope">
                  <el-tag>{{ scope.row.addTime }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="周期时间" width="120">
                <template scope="scope">
                  <el-tag>{{ scope.row.periodTime }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作"
                               width="80"
              fixed="right">
                <template scope="scope">
                  <el-button :disabled="disable" @click="handleAddClick(scope.row)" :plain="true" size="mini" type="info">修改</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-button @click="submit(0)" class="pull-left" size="mini" style="margin-top: 8px">取消确认</el-button>
            <el-button @click="submit(1)" class="pull-left" type="primary" size="mini" style="margin-top: 8px">正常</el-button>
            <el-button @click="submit(2)" class="pull-left" type="warning" size="mini" style="margin-top: 8px">逾期</el-button>
            <el-button @click="submit(-1)" class="pull-left" type="danger" size="mini" style="margin-top: 8px">作废</el-button>
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
            <el-dialog  :visible.sync="dialogFormVisible"
                        top="2%"
                        :modal="false">
              <el-form :model="form">
                <el-form-item label="付款人"  :label-width="formLabelWidth">
                  <el-input v-model="form.payer" size="small" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="司机姓名"  :label-width="formLabelWidth">
                  <el-autocomplete
                    class="inline-input"
                    v-model="form.driverName"
                    :fetch-suggestions="querySearchAsync"
                    placeholder="请输入司机姓名"
                    :trigger-on-focus="false"
                    size="small"
                    @select="handleSelect"
                  ></el-autocomplete>
                  {{idNum}}
                  <el-checkbox v-if="form.driverId !== ''" v-model="form.addToAccount" size="small">常用</el-checkbox>
                </el-form-item>
                <el-form-item label="款项金额"  :label-width="formLabelWidth">
                  <el-input v-model="form.payment" size="small" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="款项渠道" :label-width="formLabelWidth">
                  <el-select v-model="form.payMethod" placeholder="请选择付款方式">
                    <div v-for="item in payMethodList">
                      <el-option  :label="item.desc" :value="item.code"></el-option>
                    </div>
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
                <el-button type="primary" @click="handleAddPayment">确 定</el-button>
              </div>
            </el-dialog>
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
        dialogFormVisible: false,
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
        isLoading: false,
        selection: [],
        form: {
          id: '',
          addToAccount: false,
          driverName: '',
          driverId: '',
          payer: '',
          payTime: '',
          payMethod: '',
          platformNum: '',
          comment: ''
        },
        idNum: '',
        formLabelWidth: '120px',
        payMethodList: []
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
      handleAddClick (row) {
        this.dialogFormVisible = true
        this.form.driverId = row.driverId
        this.form.driverName = row.driverName
        this.form.paymentId = row.id
        this.form.payer = row.payer
        this.form.payment = row.paymentAmount
        this.form.payMethod = row.paymentPlatformCode
        this.form.platformNum = row.platformNum
        this.form.payTime = new Date(row.periodTime)
        this.form.comment = row.comment
      },
      handleAddPayment () {
        const _this = this
        axios.get('/api/manage/period_payment/add.do', {
          params: {
            addToAccount: _this.form.addToAccount,
            paymentId: _this.form.paymentId,
            driverId: _this.form.driverId,
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
            _this.$message({
              type: 'success',
              message: res.data.msg
            })
            _this.fetchData()
          }
          if (res.data.status === 1) {
            _this.$message({
              type: 'error',
              message: res.data.msg
            })
          }
          if (res.data.status === 10) {
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
      },
      handleSelectionChange (val) {
        this.selection = []
        for (var i = 0; i < val.length; i++) {
          this.selection[i] = val[i]
        }
      },
      toggleSelection (row) {
        this.$refs.paymentList.toggleRowSelection(row)
      },
      submit (status) {
        // 判断是否有勾选
        if (this.selection.length === 0) {
          this.$message({
            type: 'info',
            message: '请选择款项'
          })
        } else {
          var info = '确认修改 ['
          for (var i = 0; i < this.selection.length; i++) {
            info = info + this.selection[i].driverName + ':' + this.selection[i].paymentAmount + ' \r\n '
          }
          info = info + '] 的状态为 '
          switch (status) {
            case 0 :
              info = info + '--取消确认--'
              break
            case 1 :
              info = info + '--正常--'
              break
            case 2 :
              info = info + '--逾期--'
              break
            case -1 :
              info = info + '--作废--'
              break
          }

          this.$confirm(info, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //  如果点击确定,则组装id数组
            const paymentIds = []
            for (var i = 0; i < this.selection.length; i++) {
              paymentIds[i] = this.selection[i].id
            }
            console.log(paymentIds)
            //  提交数据
            axios.get('api/manage/period_payment/update_payment_status.do',
              {
                params: {
                  paymentIdArray: paymentIds,
                  paymentStatus: status
                }
              }).then((res) => {
              //  如果状态成功则消息提示,并重新提取数据
                if (res.data.status === 0) {
                  this.$message({
                    type: 'success',
                    message: '操作成功!'
                  })
                  this.fetchData()
                } else {
                  this.$message({
                    type: 'error',
                    message: res.data.msg
                  })
                }
              })
          }).catch(() => {
            this.$refs.paymentList.clearSelection()
            this.$message({
              type: 'info',
              message: '已取消修改'
            })
          })
        }
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
      handleSelect (item) {
        this.idNum = item.idNum
        this.form.driverId = item.driverId
      },
      queryPayMethodList () {
        axios.get('/api/manage/period_payment/payment_method.do').then((res) => {
          this.payMethodList = res.data.data
        })
      }
    },
    watch: {
      platformStatus () {
        this.query()
      },
      dialogFormVisible (val) {
        if (!val) {
          this.idNum = ''
          this.form.driverName = ''
          this.form.driverId = ''
        }
      }
    },
    computed: {
      disable () {
        if (this.platformStatus !== '0') {
          return true
        }
        return false
      }
    },
    created () {
      this.fetchData()
      this.queryPayMethodList()
    }
  }
</script>
<style>

  .el-message{
    top: 30%;
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
