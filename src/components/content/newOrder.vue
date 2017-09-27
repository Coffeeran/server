<template>

      <div id="content">
        <div class="row" v-cloak>
          <div class="col-sm-12">

            <div class="ibox float-e-margins">

              <div class="ibox-content" style="padding-bottom: 0px;" v-loading="isLoading" element-loading-text="加载中">
                <form-wizard @on-complete="onComplete"
                             title="新建订单"
                             subtitle="请如实填写信息"
                             shape="tab"
                             back-button-text="上一步"
                             next-button-text="下一步"
                             finish-button-text="提交"
                             color="#1ab394">
                  <tab-content title="司机信息" :before-change="firstSwitch">
                  <driver-info ref="driverInfoRef" @driverInfo="showDriverInfo" driverName></driver-info>
                  </tab-content>
                  <tab-content title="车辆信息" :before-change="secondSwitch">
                    <car-select-table ref="carTableRef"  @currentRow="showCurrentShow"></car-select-table>
                  </tab-content>
                  <tab-content title="合作模式" :before-change="thirdSwitch">
                    <co-model ref="coModelRef" @coModel="showCoModel"></co-model>
                  </tab-content>
                </form-wizard>
              </div>
            </div>
          </div>


        </div>
      </div>
</template>

<script>
  import {FormWizard, TabContent} from 'vue-form-wizard'
  import 'vue-form-wizard/dist/vue-form-wizard.min.css'
  import driverInfo from '../function_part/driverInfo'
  import carSelectTable from '../function_part/carSelectTable'
  import coModel from '../function_part/coModel'
  import axios from 'axios'
  export default {
    components: {
      FormWizard,
      TabContent,
      'driver-info': driverInfo,
      carSelectTable,
      'co-model': coModel
    },
    data () {
      return {
        isLoading: false,
        testTableData: [],
        productId: '',
        driverId: '',
        carId: '',
        coModelId: '',
        driverInfo: {
          name: '',
          id: '',
          phone: ''
        },
        coModel: {
          modelType: '',
          totalAmount: '',
          downAmount: '',
          finalAmount: '',
          periodNum: '',
          periodPayment: '',
          comment: ''
        }
      }
    },
    methods: {
      login () {
        axios.post('/api/user/login.do', {
          username: 'admin',
          password: '123'
        })
      },
      onComplete: async function () {
        this.isLoading = true
        try {
          const carRes = await axios.get('/api/car/save.do', {
            params: {
              productId: this.productId
            }
          })
          this.carId = carRes.data.data
          const driverRes = await axios.get('/api/driver/save_driver.do', {
            params: {
              name: this.driverInfo.name,
              idNumber: this.driverInfo.id,
              personalPhone: this.driverInfo.phone,
              carId: this.carId
            }
          })
          if (driverRes.data.status !== 0) {
            alert(driverRes.data.msg)
            this.isLoading = false
            return
          }
          this.driverId = driverRes.data.data
          const coModelRes = await axios.get('/api/co_model/save.do', {
            params: {
              carId: this.carId,
              modelType: this.coModel.modelType,
              totalAmount: this.coModel.totalAmount,
              downAmount: this.coModel.downAmount,
              finalAmount: this.coModel.finalAmount,
              periodNum: this.coModel.periodNum,
              periodPayment: this.coModel.periodPayment,
              comment: this.coModel.comment
            }
          })
          this.coModelId = coModelRes.data.data
          const driverUpdateRes = await axios.get('/api/driver/save_driver.do', {
            params: {
              id: this.driverId,
              coModelId: this.coModelId
            }
          })
          if (driverUpdateRes.data.status !== 0) {
            alert(driverUpdateRes.data.msg)
            this.isLoading = false
            return
          }
          const cartRes = await axios.get('/api/cart/add.do', {
            params: {
              productId: this.productId,
              count: 1
            }
          })
          if (cartRes.data.status !== 0) {
            alert(cartRes.data.msg)
            this.isLoading = false
            return
          }
          const result = await axios.get('/api/order/create.do', {
            params: {
              driverId: this.driverId
            }
          })
          if (result.data.status === 0) {
            alert('添加司机成功,跳转至订单管理页面')
            this.$router.push({path: '/order/order_manager'})
          }
        } catch (e) {
          alert(e)
        }
      },
      firstSwitch: function () {
        return this.$refs.driverInfoRef.validate()
      },
      showCurrentShow (currentRow) {
        this.productId = currentRow.id
      },
      showDriverInfo (driverInfo) {
        this.driverInfo = driverInfo
      },
      showCoModel (coModel) {
        this.coModel = coModel
        this.coModel.periodPayment = (this.coModel.totalAmount - this.coModel.downAmount - this.coModel.finalAmount) / this.coModel.periodNum
      },
      secondSwitch () {
        if (this.productId === '') {
          alert('请选择车型')
          return false
        } else {
          return true
        }
      },
      thirdSwitch () {
        return this.$refs.coModelRef.validate()
      }
    },
    mounted () {
      this.$refs.carTableRef.getData()
      this.login()
    }
  }
</script>

<style>

</style>
