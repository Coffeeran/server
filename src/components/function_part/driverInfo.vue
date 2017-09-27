<template>
  <el-form :model="driverInfo" :rules="rules" ref="driverInfo" label-width="100px" class="demo-ruleForm">
    <el-form-item label="司机姓名" prop="name">
      <el-col :span="5">
        <el-input v-model="driverInfo.name">{{driverName}}</el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="身份证号" prop="id">
      <el-col :span="5">
        <el-input v-model="driverInfo.id" :maxlength="max1"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="手机号码" prop="phone">
      <el-col :span="5">
        <el-input v-model="driverInfo.phone" :maxlength="max2"></el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
      props: [
        'driverName'
      ],
      data () {
        return {
          isValid: false,
          max1: 18,
          max2: 11,
          driverInfo: {
            name: '',
            id: '',
            phone: ''
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
        }
      },
      watch: {
        driverInfo: {
          handler: function (val) {
            this.$emit('driverInfo', val)
          },
          deep: true
        }
      }
    }
</script>

<style>

</style>
