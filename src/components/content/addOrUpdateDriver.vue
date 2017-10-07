<template>
  <div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            司机信息
            <el-switch class="pull-right" v-model="disableDriverInfo" on-color="#ff4949" on-text="编辑" off-text="关闭"></el-switch>
          </div>
          <div class="ibox-content" style="padding-bottom: 5px;" v-loading="isLoading" element-loading-text="加载中">
            <el-form
              :model="driverInfo"
              :rules="rules"
              ref="driverInfo"
              label-width="100px"
              class="demo-form-inline">
              <el-form-item label="司机姓名" prop="driverName">
                <el-col :span="5">
                  <el-input :disabled="disableDriverInfo" size="small" v-model="driverInfo.driverName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="身份证号" prop="idNum">
                <el-col :span="5">
                  <el-input :disabled="disableDriverInfo" size="small" v-model="driverInfo.idNum"
                            :maxlength="max1"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="手机号码" prop="phoneNum">
                <el-col :span="5">
                  <el-input :disabled="disableDriverInfo" size="small" v-model="driverInfo.phoneNum"
                            :maxlength="max2"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="司机状态" prop="status">
                <el-col :span="10">
                  <el-radio-group :disabled="disableDriverInfo" size="small" v-model="driverInfo.driverStatus">
                    <el-radio label="0">未绑定车辆</el-radio>
                    <el-radio label="1">正常运营</el-radio>
                    <el-radio label="2">合作结束</el-radio>
                  </el-radio-group>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
          <div class="ibox-footer">
            <el-button :disabled="disableDriverInfo" @click="addOrUpdateDriverInfo" size="small" type="primary">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            合作模式
            <el-switch class="pull-right" v-model="disableCoModel" on-color="#ff4949" on-text="编辑" off-text="关闭"></el-switch>
          </div>
          <div class="ibox-content" style="padding-bottom: 5px;" v-loading="isLoading" element-loading-text="加载中">
            <el-form :model="coModelForm" :rules="coModelRules"  label-width="100px" class="demo-ruleForm">
              <el-form-item label="合作模式">
                <el-select :disabled="disableCoModel" size="small" v-model="coModelForm.modelType">
                  <el-option label="全款" value="10"></el-option>
                  <el-option label="租赁" value="20"></el-option>
                  <el-option label="租购-月供" value="30"></el-option>
                  <el-option label="租购-周供" value="40"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="合作起止时间">
                <el-date-picker
                  :disabled="disableCoModel"
                  size="small"
                  range-separator=" 至 "
                  v-model="coModelForm.periodDateArray"
                  type="daterange"
                  placeholder="选择合作起止日期">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="总计金额" prop="totalAmount">
                <el-col :span="8">
                  <el-input :disabled="disableCoModel" size="small" value="number" v-model="coModelForm.totalAmount">
                    <template slot="append">{{cTotalAmount}}</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="首付金额" prop="downAmount">
                <el-col :span="8">
                  <el-input :disabled="disableCoModel" size="small" value="number" v-model="coModelForm.downAmount">
                    <template slot="append">{{cDownAmount}}</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="尾款金额" prop="finalAmount">
                <el-col :span="8">
                  <el-input :disabled="disableCoModel" size="small" value="number" v-model="coModelForm.finalAmount">
                    <template slot="append">{{cFinalAmount}}</template>
                  </el-input>
                </el-col>
              </el-form-item>
              <el-form-item v-if="coModelForm.modelType!='10'" label="付款月数" prop="periodNum">
                <el-col :span="10">
                  <el-input-number :disabled="disableCoModel" size="small" :min="0" :max="36" v-model="coModelForm.periodNum"></el-input-number>
                </el-col>
              </el-form-item>
              <el-form-item v-if="coModelForm.modelType!='10'" label="付款起始日期">
                <el-col :span="10">
                  <el-date-picker
                    @change="periodPlanStartTime"
                    :disabled="disableCoModel"
                    size="small"
                    v-model="coModelForm.periodPlanStartDate"
                    type="date"
                    placeholder="还款起始日期">
                  </el-date-picker>
                  <small v-if="coModelForm.modelType=='40'" class="text-danger">周供请选择星期二为起始日期!</small>
                </el-col>
              </el-form-item>
              <el-form-item v-if="coModelForm.modelType!='10'" label="每月金额">
                <el-col :span="5">
                  <el-input size="small" :disabled="true" v-model="periodPayment"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="备注">
                <el-col :span="5">
                  <el-input
                    :disabled="disableCoModel"
                    placeholder="请输入内容"
                    v-model="coModelForm.comment">
                  </el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
          <div class="ibox-footer">
            <el-button :disabled="!coModelButton" @click="addOrUpdateCoModel" size="small" type="primary">提交</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            绑定车辆
            <el-switch class="pull-right" v-model="disableCarInfo" on-color="#ff4949" on-text="编辑" off-text="关闭"></el-switch>
          </div>
          <div class="ibox-content" style="padding-bottom: 10px;" v-loading="carListIsLoading"
               element-loading-text="加载中">
            <el-row :gutter="10" style="padding-bottom: 5px">
              <el-col :span="4">
                <el-select size="mini" clearable v-model="carStatus" placeholder="车辆状态">
                  <el-option label="正常运营" value="1"></el-option>
                  <el-option label="已过户" value="2"></el-option>
                  <el-option label="库存中" value="0"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-input size="mini" v-model="plateNum" placeholder="车牌号码"></el-input>
              </el-col>
              <el-col :span="4">
                <el-input size="mini" v-model="carName" placeholder="车辆型号"></el-input>
              </el-col>
              <el-col :span="4">
                <el-select size="mini" clearable v-model="branch" placeholder="选择城市">
                  <el-option label="成都" value="1"></el-option>
                  <el-option label="昆明" value="2"></el-option>
                </el-select>
              </el-col>
              <el-col :span="4">
                <el-button :disabled="disableCarInfo" size="mini" icon="search" @click="query">查询</el-button>
              </el-col>
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
                    <el-tag>{{ scope.row.carName }}</el-tag>
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
          <div class="ibox-footer">
            <el-button :disabled="!carButton" @click="bind" size="small" type="primary">提交</el-button>
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
        isLoading: false,
        carListIsLoading: false,
        testTableData: [],
        driverId: '',
        carId: '',
        coModelId: '',
        disableDriverInfo: false,
        isValid: false,
        max1: 18,
        max2: 11,
        disableCarInfo: false,
        driverInfo: {
          coModelId: '',
          driverId: '',
          driverName: '',
          idNum: '',
          phoneNum: '',
          driverStatus: '1'
        },
        rules: {
          driverName: [
            { required: true, message: '请输入司机姓名', trigger: 'blur' },
            { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
          ],
          idNum: [
            { required: true, message: '请输入身份证号码', trigger: 'blur' },
            { min: 18, max: 18, message: '请输入正确的格式', trigger: 'blur' }
          ],
          phoneNum: [
            { required: true, message: '请输入手机号码', trigger: 'blur' },
            { min: 11, max: 11, message: '请输入正确的格式', trigger: 'blur' }
          ]
        },
        plateNum: '',
        carName: '',
        branch: '',
        carStatus: '',
        tableData: [],
        currentRow: null,
        total: 0,
        pageNum: 1,
        pageSize: 10,
        disableCoModel: false,
        cDownAmount: '零元整',
        cTotalAmount: '零元整',
        coModelForm: {
          periodDateArray: '',
          modelType: '',
          totalAmount: '0',
          downAmount: '0',
          periodPlanStartDate: '',
          finalAmount: '0',
          periodNum: '',
          comment: ''
        },
        coModelRules: {
          downAmount: [
            { required: true, message: '请输入首付金额', trigger: 'blur' }
          ],
          totalAmount: [
            { required: true, message: '请输入总计金额', trigger: 'blur' }
          ],
          finalAmount: [
            { required: true, message: '请输入尾款金额', trigger: 'blur' }
          ],
          periodNum: [
            { required: true, type: 'number', message: '请输入月数', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      fetchDriverSummary: async function (_driverId) {
        const _this = this
        this.isLoading = true
        await axios.get('/api/manage/driver/summary.do', {
          params: {
            driverId: _driverId
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.driverInfo.driverId = res.data.data.driverId
            _this.driverInfo.driverName = res.data.data.driverName
            _this.driverInfo.idNum = res.data.data.idNum
            _this.driverInfo.phoneNum = res.data.data.phoneNum
            _this.driverInfo.driverStatus = res.data.data.driverStatus
            _this.driverInfo.coModelId = res.data.data.coModelId
            _this.plateNum = res.data.data.plateNum
            _this.carId = res.data.data.carId
          } else if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          } else {
            _this.carStatus = '0'
          }
          _this.fetchCoModelInfo()
          _this.fetchCarList()
          _this.isLoading = false
        })
      },
      periodPlanStartTime (val) {
        this.coModelForm.periodPlanStartDate = val
      },
      query () {
        this.pageNum = 1
        this.pageSize = 10
        this.fetchCarList()
      },
      handleCurrentRowChange (val) {
        if (val.carId !== null) {
          this.carId = val.carId
        }
      },
      handleSizeChange (val) {
        this.pageSize = val
        this.fetchCarList()
      },
      handleCurrentChange (val) {
        this.pageNum = val
        this.fetchCarList()
      },
      fetchCarList () {
        const _this = this
        this.carListIsLoading = true
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
            if (res.data.status === 0) {
              _this.total = res.data.data.total
              _this.tableData = res.data.data.list
              _this.carListIsLoading = false
            } else if (res.data.status === 10) {
              _this.$router.push({name: 'login'})
            }
          })
      },
      fetchCoModelInfo () {
        const _this = this
        axios.get('/api/manage/co_model/summary.do', {
          params: {
            coModelId: this.driverInfo.coModelId
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.coModelForm.periodDateArray = [new Date(res.data.data.periodDateArray[0]), new Date(res.data.data.periodDateArray[1])]
            _this.coModelForm.modelType = res.data.data.modelType
            _this.coModelForm.totalAmount = res.data.data.totalAmount
            _this.coModelForm.downAmount = res.data.data.downAmount
            _this.coModelForm.finalAmount = res.data.data.finalAmount
            _this.coModelForm.periodNum = res.data.data.periodNum
            _this.coModelForm.periodPlanStartDate = res.data.data.periodPlanStartDate
            _this.coModelForm.comment = res.data.data.comment
          } else if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          }
        })
      },
      getChineseAmount (val) {
        var fraction = ['角', '分']
        var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
        var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']]
        var head = val < 0 ? '欠' : ''
        val = Math.abs(val)
        var s = ''
        for (var k = 0; k < fraction.length; k++) {
          s += (digit[Math.floor(val * 10 * Math.pow(10, k)) % 10] + fraction[k]).replace(/零./, '')
        }
        s = s || '整'
        val = Math.floor(val)

        for (var i = 0; i < unit[0].length && val > 0; i++) {
          var p = ''
          for (var j = 0; j < unit[1].length && val > 0; j++) {
            p = digit[val % 10] + unit[1][j] + p
            val = Math.floor(val / 10)
          }
          s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
        }
        return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整')
      },
      addOrUpdateDriverInfo () {
        const _this = this
        axios.get('/api/manage/driver/add_or_update.do', {
          params: {
            id: _this.driverInfo.driverId,
            carId: _this.carId,
            name: _this.driverInfo.driverName,
            idNumber: _this.driverInfo.idNum,
            personalPhone: _this.driverInfo.phoneNum,
            driverStatus: _this.driverInfo.driverStatus
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.driverInfo.driverId = res.data.data
            _this.message(res.data.msg, true)
          } else if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          }
        })
      },
      addOrUpdateCoModel () {
        const _this = this
        axios.get('/api/manage/co_model/add_or_update.do', {
          params: {
            driverId: _this.driverInfo.driverId,
            coModelId: _this.driverInfo.coModelId,
            periodStartDate: _this.coModelForm.periodDateArray[0].getTime(),
            periodEndDate: _this.coModelForm.periodDateArray[1].getTime(),
            modelType: _this.coModelForm.modelType,
            totalAmount: _this.coModelForm.totalAmount,
            downAmount: _this.coModelForm.downAmount,
            finalAmount: _this.coModelForm.finalAmount,
            periodPlanStartDate: _this.coModelForm.periodPlanStartDate,
            periodNum: _this.coModelForm.periodNum,
            comment: _this.coModelForm.comment
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.driverInfo.coModelId = res.data.data
            _this.message(res.data.msg, true)
          } else if (res.data.status === 10) {
            _this.$router.push({name: 'login'})
          }
        })
      },
      bind () {
        const _this = this
        axios.get('/api/manage/car/bind.do', {
          params: {
            driverId: _this.driverInfo.driverId,
            carId: _this.carId
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.message(res.data.msg, true)
          }
        })
      },
      message (msg, success) {
        this.$notify({
          title: success ? '成功' : '错误',
          message: msg,
          offset: 100,
          type: success ? 'success' : 'warning'
        })
      }
    },
    computed: {
      periodPayment () {
        return (this.coModelForm.totalAmount - this.coModelForm.downAmount - this.coModelForm.finalAmount) / this.coModelForm.periodNum
      },
      cFinalAmount () {
        return this.getChineseAmount(this.coModelForm.finalAmount)
      },
      coModelButton () {
        return this.driverInfo.driverId !== '' && !this.disableCoModel
      },
      carButton () {
        return this.driverInfo.coModelId !== '' && this.carId !== '' && !this.disableCarInfo
      }
    },
    mounted () {
      this.fetchDriverSummary(this.$route.params.id)
      if (this.$route.params.id !== 0) {
        this.disableDriverInfo = true
        this.disableCoModel = true
        this.disableCarInfo = true
      }
    },
    watch: {
      'coModelForm.downAmount': function (val) {
        this.cDownAmount = this.getChineseAmount(val)
      },
      'coModelForm.totalAmount': function (val) {
        this.cTotalAmount = this.getChineseAmount(val)
      }
    }
  }
</script>

<style>
  .el-table__body tr.current-row>td {
    background: #c9e5f5;
  }

  .el-input.is-disabled .el-input__inner {
    background-color: #f8f8f8;
    color: #555;
  }
</style>
