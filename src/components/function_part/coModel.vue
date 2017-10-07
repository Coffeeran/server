<template>
  <el-form :model="coModelForm" :rules="coModelRules"  label-width="100px" class="demo-ruleForm">
    <el-form-item label="合作模式">
      <el-select :disabled="coModelDisable" size="small" v-model="coModelForm.modelType">
        <el-option label="全款" value="10"></el-option>
        <el-option label="租赁" value="20"></el-option>
        <el-option label="租购-月供" value="30"></el-option>
        <el-option label="租购-周供" value="40"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="合作起止时间">
      <el-date-picker
        :disabled="coModelDisable"
        size="small"
        range-separator=" 至 "
        v-model="coModelForm.periodDateArray"
        type="daterange"
        placeholder="选择合作起止日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="总计金额" prop="totalAmount">
      <el-col :span="8">
        <el-input :disabled="coModelDisable" size="small" value="number" v-model="coModelForm.totalAmount">
          <template slot="append">{{cTotalAmount}}</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="首付金额" prop="downAmount">
      <el-col :span="8">
        <el-input :disabled="coModelDisable" size="small" value="number" v-model="coModelForm.downAmount">
          <template slot="append">{{cDownAmount}}</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="尾款金额" prop="finalAmount">
      <el-col :span="8">
        <el-input :disabled="coModelDisable" size="small" value="number" v-model="coModelForm.finalAmount">
          <template slot="append">{{cFinalAmount}}</template>
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item v-if="coModelForm.modelType!='10'" label="付款月数" prop="periodNum">
      <el-col :span="10">
        <el-input-number :disabled="coModelDisable" size="small" :min="1" :max="36" v-model="coModelForm.periodNum"></el-input-number>
        <el-date-picker
          :disabled="coModelDisable"
          size="small"
          range-separator=" 至 "
          v-model="coModelForm.periodPlanStartDate"
          type="date"
          placeholder="还款起始日期">
        </el-date-picker>
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
          :disabled="coModelDisable"
          type="textarea"
          autosize
          placeholder="请输入内容"
          v-model="coModelForm.comment">
        </el-input>
      </el-col>
    </el-form-item>
  </el-form>
</template>

<script>
 export default {
   data () {
     return {
       coModelDisable: false,
       cDownAmount: '零元整',
       cTotalAmount: '零元整',
       coModelForm: {
         periodDateArray: '',
         modelType: '',
         totalAmount: '',
         downAmount: '',
         periodPlanStartDate: '',
         finalAmount: '',
         periodNum: '',
         comment: ''
       },
       options: [{
         value: 10,
         label: '全款'
       }, {
         value: 20,
         label: '租赁'
       }, {
         value: '',
         label: '以租代购'
       }
       ],
       zugou: [{
         value: 40,
         label: '租购周供'
       }, {
         value: 30,
         label: '租购月供'
       }
       ],
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
     }
   },
   computed: {
     periodPayment () {
       return (this.coModelForm.totalAmount - this.coModelForm.downAmount - this.coModelForm.finalAmount) / this.coModelForm.periodNum
     },
     cFinalAmount () {
       return this.getChineseAmount(this.coModelForm.finalAmount)
     }
   },
   watch: {
     'coModelForm.downAmount': function (val) {
       this.cDownAmount = this.getChineseAmount(val)
     },
     'coModelForm.totalAmount': function (val) {
       this.cTotalAmount = this.getChineseAmount(val)
     },
     'coModelForm': {
       handler (val) {
         this.$emit('coModel', val)
       },
       deep: true
     }
   }
 }
</script>

<style>

</style>
