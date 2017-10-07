<template>
  <div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-title">
            车辆信息
            <el-switch class="pull-right" v-model="disabled" on-color="#ff4949" on-text="编辑" off-text="关闭"></el-switch>
          </div>
          <div class="ibox-content" style="padding-bottom: 5px;" v-loading="isLoading" element-loading-text="加载中">
            <el-form :model="carForm" :rules="rules"  label-width="100px" class="demo-ruleForm">
              <el-form-item label="车辆所在城市">
                <el-select :disabled="disabled" size="small" v-model="carForm.branch">
                  <el-option label="成都" value="0"></el-option>
                  <el-option label="昆明" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="车辆状态">
                <el-radio-group :disabled="disabled" size="small" v-model="carForm.carStatus">
                  <el-radio label="1">正常运营</el-radio>
                  <el-radio label="0">库存中</el-radio>
                  <el-radio label="3">已赎回</el-radio>
                  <el-radio label="2">已过户</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="车辆型号">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.carName"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="车牌号码">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.plateNum"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="发动机号">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.engineNum"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="车辆识别号">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.vin"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="提车时间">
                <el-date-picker
                  v-model="carForm.pickDate"
                  @change="pickTime"
                  :disabled="disabled"
                  size="small"
                  type="date"
                  placeholder="选择提车时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="赎回时间">
                <el-date-picker
                  :disabled="disabled"
                  @change="redeemTime"
                  size="small"
                  v-model="carForm.redeemDate"
                  type="date"
                  placeholder="选择赎回时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="过户时间">
                <el-date-picker
                  @change="transferTime"
                  :disabled="disabled"
                  size="small"
                  v-model="carForm.transferDate"
                  type="date"
                  placeholder="选择过户时间">
                </el-date-picker>
              </el-form-item>
              <el-form-item label="GPS串号">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.gpsNum"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="GPS手机号">
                <el-col :span="5">
                  <el-input :disabled="disabled" size="small" v-model="carForm.gpsPhoneNum"></el-input>
                </el-col>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins">
          <div class="ibox-content" style="padding-bottom: 10px;" element-loading-text="加载中">
          <el-button :disabled="disabled" @click="addOrUpdate"  size="large" type="primary">提交</el-button>
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
      disabled: false,
      carForm: {
        carId: '',
        branch: '',
        carStatus: '0',
        carName: '',
        plateNum: '',
        engineNum: '',
        vin: '',
        pickDate: '',
        transferDate: '',
        redeemDate: '',
        gpsNum: '',
        gpsPhoneNum: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入司机姓名', trigger: 'blur' },
          { min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur' }
        ],
        id: [
          { required: true, message: '请输入身份证号码', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确的格式', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { min: 11, max: 11, message: '请输入正确的格式', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    pickTime (val) {
      this.carForm.pickDate = val
    },
    transferTime (val) {
      this.carForm.transferDate = val
    },
    redeemTime (val) {
      this.carForm.redeemDate = val
    },
    fetchCarSummary (carId) {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/car/summary.do',
        {
          params: {
            carId: carId
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.carForm = res.data.data
          }
          _this.isLoading = false
        })
    },
    addOrUpdate () {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/car/add_or_update.do',
        {
          params: {
            id: _this.carForm.carId,
            branch: _this.carForm.branch,
            carStatus: _this.carForm.carStatus,
            name: _this.carForm.carName,
            plateNumber: _this.carForm.plateNum,
            engineNumber: _this.carForm.engineNum,
            vin: _this.carForm.vin,
            pickDate: _this.carForm.pickDate,
            transferDate: _this.carForm.transferDate,
            redeemDate: _this.carForm.redeemDate,
            gpsNumber: _this.carForm.gpsNum,
            gpsPhone: _this.carForm.gpsPhoneNum
          }
        }).then(function (res) {
          if (res.data.status === 0) {
            _this.message('操作成功', true)
          } else if (res.data.status === 1) {
            _this.message(res.data.msg, false)
          }
          _this.isLoading = false
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
  mounted () {
    this.fetchCarSummary(this.$route.params.id)
    if (this.$route.params.id !== 0) {
      this.disabled = true
    }
  }
}
</script>

<style>
</style>
