<template>
  <el-form
    :model="driverInfo"
    :rules="rules"
    ref="driverInfo"
    label-width="100px"
    class="demo-form-inline">
    <el-form-item label="司机姓名" prop="name">
      <el-col :span="5">
        <el-input :disabled="editable" size="small" v-model="driverInfo.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="身份证号" prop="id">
      <el-col :span="5">
        <el-input :disabled="editable" size="small" v-model="driverInfo.idNum" :maxlength="max1"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-col :span="5">
        <el-input :disabled="editable" size="small" v-model="driverInfo.phone" :maxlength="max2"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="司机状态" prop="status">
      <el-col :span="5">
        <el-switch
          :disabled="editable"
          v-model="driverInfo.status"
          on-color="#13ce66"
          on-text="正常"
          off-text="结束"
          off-color="#ff4949"
          on-value="1"
          off-value="2"
        >
        </el-switch>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
import axios from 'axios'

export default {
  props: [
    'driverName'
  ],
  data () {
    return {
      editable: false,
      isValid: false,
      max1: 18,
      max2: 11,
      driverInfo: {
        driverId: '',
        name: '',
        idNum: '',
        phone: '',
        status: '1'
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
    validate () {
      var _this = this
      this.$refs['driverInfo'].validate(function (valid) {
        _this.isValid = valid
      })
      return _this.isValid
    },
    fetchDriverSummary (_driverId) {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/driver/summary.do', {
        params: {
          driverId: _driverId
        }
      }).then(function (res) {
        if (res.data.status === 0) {
          _this.driverInfo.driverId = res.data.data.driverId
          _this.driverInfo.name = res.data.data.driverName
          _this.driverInfo.idNum = res.data.data.idNum
          _this.driverInfo.phone = res.data.data.phoneNum
          _this.driverInfo.status = res.data.data.driverStatus
        }
      })
    }
  },
  watch: {
    driverInfo: {
      handler: function (val) {
        if (val.driverId !== '') {
          this.editable = true
        }
      },
      deep: true
    }
  }
}
</script>

<style>

</style>
