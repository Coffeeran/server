<template>
  <transition name="el-fade-in">
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-content" v-loading.body="isLoading">
            <div class="row">
              <div class="col-lg-12">
                <div class="m-b-md">
                  <el-button type="primary" size="mini" class="pull-right" :plain="true" @click="fetchAccountList">账户资料</el-button>
                  <el-dialog  :visible.sync="dialogTableVisible" :modal="false" top="1%">
                    <div slot="title">
                      账户信息
                      <el-button style="margin-right: 10px;" @click="showForm = !showForm" type="primary" size="mini">添加</el-button>
                    </div>
                    <table class="table table-striped">
                      <thead>
                      <tr>
                        <th>序号</th>
                        <th>账号类型</th>
                        <th>账号</th>
                        <th>添加时间</th>
                      </tr>
                      </thead>
                      <tbody>
                      <tr v-for="(item,index) in accountList">
                        <td>{{index+1}}</td>
                        <td>{{item.platform}}</td>
                        <td>{{item.account}}</td>
                        <td>{{item.createTime}}</td>
                      </tr>
                      </tbody>
                    </table>
                    <el-form :model="form" v-if="showForm">
                      <el-form-item label="账户类型" :label-width="formLabelWidth">
                        <el-select v-model="form.platform" placeholder="请选择账户类型" size="small">
                          <el-option label="支付宝" value="1"></el-option>
                          <el-option label="银行卡" value="4"></el-option>
                        </el-select>
                      </el-form-item>
                      <el-form-item label="账号" :label-width="formLabelWidth">
                        <el-input v-model="form.account" auto-complete="off" size="small"></el-input>
                      </el-form-item>
                    </el-form>
                    <div slot="footer" class="dialog-footer" v-if="showForm">
                      <el-button @click="dialogFormVisible = false">取 消</el-button>
                      <el-button type="primary" @click="addAccount()">确 定</el-button>
                    </div>
                  </el-dialog>

                  <h2>司机信息-{{driverInfo.driverName}}</h2>
                </div>
                <dl class="dl-horizontal">
                  <dt>状态:</dt> <dd><el-tag type="success">{{driverInfo.operationStatus}}</el-tag></dd>
                </dl>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-5">
                <dl class="dl-horizontal">
                  <dt>司机姓名:</dt> <dd><p>{{driverInfo.driverName}}</p></dd>
                  <dt>手机号:</dt> <dd><p class="text-success">{{driverInfo.phoneNum}}</p></dd>
                  <dt>身份证号:</dt> <dd><p>{{driverInfo.idNum}}</p></dd>
                  <dt>车牌号:</dt> <dd>{{driverInfo.plateNum}}</dd>
                </dl>
              </div>
              <div class="col-lg-7" id="cluster_info">
                <dl class="dl-horizontal">

                  <dt>车型:</dt> <dd><p>{{driverInfo.carName}}</p></dd>
                  <dt>开始日期:</dt> <dd><p>{{driverInfo.startDate}}</p></dd>
                  <dt>结束日期:</dt> <dd><p>{{driverInfo.endDate}}</p></dd>
                  <dt>合作模式:</dt>
                  <dd><p class="text-warning">
                    {{driverInfo.coModelType}}
                  </p>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-10">
                <dl class="dl-horizontal">
                  <dt>资金完成度:</dt>
                  <dd>
                    <div class="progress progress-striped active m-b-sm">
                      <div :style="{width: driverInfo.periodPercentage}" class="progress-bar">{{driverInfo.periodPercentage}}</div>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-10">
                  <ul class="report-form">
                    <li>
                      <span>总价（元）</span>
                      <strong>{{Number(driverInfo.totalAmount).toLocaleString()}}</strong>
                    </li>
                    <li>
                      <span>首付（元）</span>
                      <strong>{{Number(driverInfo.downAmount).toLocaleString()}}</strong>
                    </li>
                    <li>
                      <span>欠款金额（元）</span>
                      <strong>{{Number(driverInfo.overdueAmount).toLocaleString()}}</strong>
                    </li>
                    <li>
                      <span>余款（元）</span>
                      <strong>{{Number(driverInfo.balance).toLocaleString()}}</strong>
                    </li>

                    <li>
                      <span>违章扣分</span>
                      <strong>{{driverInfo.ticketScore}}</strong>

                    </li>
                    <li>
                      <span>违章罚金</span>
                      <strong>{{driverInfo.ticketMoney}}</strong>
                    </li>
                  </ul>
              </div>
            </div>
            <div class="row m-t-sm">
              <div class="col-lg-12">
                <div class="panel blank-panel">
                  <div class="panel-heading">
                    <div class="panel-options">
                      <ul class="nav nav-tabs">
                        <li class="active"><a href="#tab-1" data-toggle="tab">缴费总览</a></li>
                        <li class=""><a href="#tab-2" data-toggle="tab">违章总览</a></li>
                      </ul>
                    </div>
                  </div>

                  <div class="panel-body">
                    <div class="tab-content">
                      </div>
                      <div class="tab-pane active" id="tab-1">

                        <table class="table table-striped">
                          <thead>
                          <tr>
                            <th>序号</th>
                            <th>日期</th>
                            <th>状态</th>
                            <th>应收金额</th>
                            <th>已收金额</th>
                            <th>备注</th>
                            <th>操作</th>
                          </tr>
                          </thead>
                          <tbody v-for="(item1,index1) in totalPayment">
                          <tr v-for="(item2,index2) in item1.paymentDetailVoList">
                            <td>
                              第{{index1+1}}周期
                            </td>
                            <td>
                              {{item1.dueDate}}
                            </td>
                            <td>
                              <el-tag type="success" v-if="item2.payment>0">{{item2.payment}}</el-tag>
                              <el-tag type="danger" v-if="item2.payment==0">-</el-tag>
                            </td>
                            <td>
                              {{item2.updateTime}}
                            </td>
                            <td>
                              {{item2.paymentPlatform}}
                            </td>
                            <td>
                              {{item2.comment}}
                            </td>
                            <td>
                              <el-button type="primary" size="small">修改</el-button>
                            </td>
                          </tr>
                          </tbody>

                        </table>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      driverInfo: '',
      isLoading: false,
      totalPayment: '',
      dialogTableVisible: false,
      showForm: false,
      accountList: '',
      form: {
        platform: '',
        account: ''
      },
      formLabelWidth: '50px'
    }
  },
  methods: {
    login: async function () {
      return await axios.post('/api/user/login.do', {
        username: 'admin',
        password: '123'
      })
    },
    fetchDriverInfo () {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/driver/detail.do', {
        params: {
          driverId: _this.$route.params.id
        }
      }).then(function (res) {
        _this.driverInfo = res.data.data
        _this.isLoading = false
      })
    },
    fetchDriverTotalPayment () {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/period_payment/driver_total_payment.do', {
        params: {
          driverId: _this.$route.params.id
        }
      }).then(function (res) {
        _this.totalPayment = res.data.data
        _this.isLoading = false
      })
    },
    fetchAccountList () {
      const _this = this
      this.isLoading = true
      this.dialogTableVisible = true
      axios.get('/api/manage/driver/get_account_list.do', {
        params: {
          driverId: _this.$route.params.id
        }
      }).then(function (res) {
        _this.accountList = res.data.data
        _this.isLoading = false
      })
    },
    addAccount () {
      const _this = this
      this.isLoading = true
      axios.get('/api/manage/driver/add_account.do', {
        params: {
          driverId: _this.$route.params.id,
          platformCode: _this.form.platform,
          account: _this.form.account
        }
      }).then(function (res) {
        _this.fetchAccountList()
        _this.isLoading = false
      })
    }
  },
  created: async function () {
    await this.login()
    this.fetchDriverInfo()
    this.fetchDriverTotalPayment()
  }
}
</script>

<style>
  .report-form {
    margin-left: 50px;
    overflow: hidden;
    zoom: 1;
    padding: 0 0;
    list-style: none;
    box-sizing: border-box;
  }
  .report-form li{
    float: left;
    width: 16.5%;
    border-right: 1px solid #e5e5e5;
    text-align: center;
  }

  .report-form li span{
    color: #999;
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
  }

  .report-form li strong{
    font-size: 15px;
    font-weight: bold;
  }
  dt {
    color: #999;
  }


</style>
