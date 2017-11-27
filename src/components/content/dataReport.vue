<template>
  <div id="content">
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 10px">
          <div class="ibox-content">
            <div id="car" style="width: 1070px; height: 340px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 10px">
          <div class="ibox-content">
            <div id="ticket" style="width: 1070px; height: 340px;"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-content">
            <div id="payment" style="width: 1070px; height: 240px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import axios from 'axios'

  var echarts = require('echarts')
  require('../../../static/js/theme/roma')
  require('../../../static/js/theme/vintage')
  export default {
    data () {
      return {}
    },
    mounted () {
      this.initCarChart(2017, 0)
      this.initTicketChart()
      this.initPaymentChart()
    },
    methods: {
      initCarChart (year, branch) {
        var ticketChart = echarts.init(document.getElementById('car'), 'vintage')
        ticketChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          title: {
            text: '车辆指标',
            x: 'center'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['车辆总数', '当月新增']
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '现有车辆',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '新增车辆',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '车辆总数',
              type: 'bar',
              data: []
            },
            {
              name: '每月新增',
              type: 'line',
              yAxisIndex: 1,
              data: []
            }

          ]

        })
        // 获取数据
        axios.get('/api/data_report/car.do', {
          params: {
            year: year,
            branch: branch
          }
        }).then((res) => {
          ticketChart.setOption({
            series: [
              {
                name: '车辆总数',
                data: res.data.data.total
              },
              {
                name: '当月新增',
                data: res.data.data.add
              }
            ]
          })
        })
      },
      initPaymentChart () {
        var paymentChart = echarts.init(document.getElementById('payment'), 'vintage')
        var labelTop = {
          normal: {
            label: {
              show: true,
              position: 'center',
              formatter: '{b}',
              textStyle: {
                baseline: 'bottom'
              }
            },
            labelLine: {
              show: false
            }
          }
        }
        var labelFromatter = {
          normal: {
            label: {
              formatter: function (params) {
                return 100 - params.value + '%'
              },
              textStyle: {
                baseline: 'top',
                color: 'rgb(254,67,101)'
              }
            }
          }
        }
        var labelBottom = {
          normal: {
            color: '#ccc',
            label: {
              show: true,
              position: 'center'
            },
            labelLine: {
              show: false
            }
          },
          emphasis: {
            color: 'rgba(0,0,0,0)'
          }
        }
        var radius = [40, 55]
        paymentChart.setOption({
          legend: {
            x: 'center',
            y: 'bottom',
            data: [
              '周还款率:金额', '周还款率:人数', '月还款率:金额', '月还款率:人数'
            ]
          },
          title: {
            text: '还款率',
            x: 'center'
          },
          series: [
            {
              type: 'pie',
              center: ['15%', '50%'],
              radius: radius,
              x: '0%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 46, itemStyle: labelBottom},
                {name: '周还款率:金额', value: 54, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['35%', '50%'],
              radius: radius,
              x: '20%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 56, itemStyle: labelBottom},
                {name: '周还款率:人数', value: 44, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['65%', '50%'],
              radius: radius,
              x: '40%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 65, itemStyle: labelBottom},
                {name: '月还款率:金额', value: 35, itemStyle: labelTop}
              ]
            },
            {
              type: 'pie',
              center: ['85%', '50%'],
              radius: radius,
              x: '60%', // for funnel
              itemStyle: labelFromatter,
              data: [
                {name: 'other', value: 40, itemStyle: labelBottom},
                {name: '月还款率:人数', value: 60, itemStyle: labelTop}
              ]
            }
          ]
        })
      },
      initTicketChart () {
        var ticketChart = echarts.init(document.getElementById('ticket'), 'vintage')
        ticketChart.setOption({
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              crossStyle: {
                color: '#999'
              }
            }
          },
          title: {
            text: '违章指数',
            x: 'center'
          },
          legend: {
            x: 'center',
            y: 'bottom',
            data: ['总计指数', '新增指数']
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: [],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              axisLabel: {
                formatter: '{value} 元'
              }
            },
            {
              type: 'value',
              name: '金额',
              axisLabel: {
                formatter: '{value} 元'
              }
            }
          ],
          series: [
            {
              name: '新增指数',
              type: 'line',
              yAxisIndex: 1,
              data: []
            },
            {
              name: '总计指数',
              type: 'bar',
              yAxisIndex: 0,
              data: []
            }

          ]
        })
        axios.get('/api/data_report/ticket.do').then((res) => {
          ticketChart.setOption({
            xAxis: {
              data: res.data.data.date
            },
            series: [
              {
                name: '总计指数',
                data: res.data.data.total
              },
              {
                name: '新增指数',
                data: res.data.data.add
              }
            ]
          })
        })
      }
    }
  }
</script>

<style>

</style>
