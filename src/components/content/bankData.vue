<template>
  <div id="content">
    <div class="row" v-cloak >
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px" v-loading="isLoading" :element-loading-text="loadingText">
          <div class="ibox-title">
            账户余额
            <el-radio-group v-model="branch" style="float:right;" :disabled="branchAble">
              <el-radio label="0" border>成都</el-radio>
              <el-radio label="1" border>昆明</el-radio>
            </el-radio-group>
            <el-button type="primary" size="small" @click="queryQueue(index)">批量刷新<i v-if="isRefreshing" class="el-icon-loading"></i></el-button>
            <el-button type="danger" size="small" @click="isTerminate=true">终止</el-button>
          </div>
          <div class="ibox-content" style="padding-bottom: 10px" >
            <el-row style="border-bottom: 1px solid #d3e3ef; margin-bottom: 10px;">
              <el-col :span="3" :offset="6">
                <span style="font-size: 10px;padding-right: 15px">绑定账号</span>
                <span style="font-size: 30px;color: #475669;">{{totalAccountNum}}</span>
              </el-col>
              <el-col :span="3" :offset="3">
                <span style="font-size: 10px;padding-right: 15px">扣款失败</span>
                <span style="font-size: 30px;color: #FF4949;">{{failAccountNum}}</span>
              </el-col>
              <el-col :span="6" :offset="3">
                <el-radio-group v-model="sortName">
                  <el-radio-button label="balance">余额</el-radio-button>
                  <el-radio-button label="amount">已扣额</el-radio-button>
                  <el-radio-button label="updateTime">更新时间</el-radio-button>
                </el-radio-group>
              </el-col>

            </el-row>
            <el-row :gutter="10" >
              <el-col :span="6" v-for="(balance,index) in balanceList"  style="margin-bottom: 10px">
                <el-card :body-style="{ padding: '0px' }" :style="balance.amount==0&&balance.balance<200?'background-color: #ffeaea;':balance.amount==0&&balance.balance>=200?'background-color: rgba(0, 196, 255, 0.19);':''">
                  <div style="padding: 14px;">
                    <span>{{balance.acctName}}</span><small class="pull-right" style="font-size: 15px;color:#878D99">{{balance.acctNo}}</small>
                    <div class="detail">

                      <p></p>
                      <span style="font-size: 18px;color:#67C23A"><small style="font-size: 10px;padding-right: 10px;color:#668b6d;">余额</small>{{balance.balance}}</span>
                      <span style="float:right;color:#878D99"><small style="font-size: 10px;padding-right: 5px;">本周已扣</small>{{balance.amount}}</span>
                    </div>
                    <div class="bottom clearfix">
                      <time class="time">{{balance.updateTime}}</time>
                      <el-button type="text" class="button" @click="refreshPinganBalance(index)">刷新</el-button>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
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
      loadingText: '正在后台获取银行数据,请耐心等待...',
      branch: '',
      branchAble: true,
      balanceList: [],
      totalAccountNum: '',
      failAccountNum: '',
      sortName: '',
      isTerminate: false,
      isRefreshing: false
    }
  },
  methods: {
    queryPinganBalanceList () {
      this.isLoading = true
      axios.get('/api/manage/bank_info/pingan_balance_list.do',
        {
          params: {
            branch: this.branch
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.balanceList = res.data.data.data
            this.totalAccountNum = res.data.data.totalAccountNum
            this.failAccountNum = res.data.data.failAccountNum
            this.isLoading = false
          } else if (res.data.status === 1) {
            this.loadingText = res.data.msg
          }
        })
    },
    refreshPinganBalance (index) {
//      this.$set(this.balanceList[index], 'isLoading', true)
      this.balanceList[index].balance = '更新中..'
      this.balanceList[index].updateTime = '更新中..'
      return axios.get('/api/manage/bank_info/refresh_pingan_balance.do',
        {
          params: {
            branch: this.branch,
            agreementNo: this.balanceList[index].agreementNo
          }
        }).then((res) => {
          if (res.data.status === 0) {
            this.balanceList[index].balance = res.data.data.balance
            this.balanceList[index].updateTime = res.data.data.updateTime
          } else if (res.data.status === 1) {
            this.balanceList[index].balance = this.balanceList[index].balance + '-更新失败'
          }
//          this.$set(this.balanceList[index], 'isLoading', false)
        })
    },
    sortList (name) {
      this.balanceList.sort(this.by(name))
    },
    queryQueue: async function () {
      this.isTerminate = false
      this.isRefreshing = true
      for (var i = 0; i < this.balanceList.length; i++) {
        if (this.balanceList[i].amount === 0) {
          if (this.isTerminate) {
            this.isRefreshing = false
            return
          }
          await this.refreshPinganBalance(i)
        }
      }
    }
  },
  watch: {
    sortName (val) {
      this.sortList(val)
    }
  },
  created () {
    if (this.userBranch === 0) {
      this.branch = '0'
      this.queryPinganBalanceList()
    } else if (this.userBranch === 1) {
      this.branch = '1'
      this.queryPinganBalanceList()
    } else if (this.userBranch === -1) {
      this.branchAble = false
    }
  }
}
</script>

<style scoped="scoped">

  .time {
    font-size: 10px;
    color: #999;
  }
  .el-card:hover {
    box-shadow: 0px 0px 7px black;
  }
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
</style>
