<template>
  <div id="content">
    <div class="row" v-cloak>
      <div class="col-sm-12">
        <div class="ibox float-e-margins" style="margin-bottom: 0px">
          <div class="ibox-title">
            违章指数
          </div>
          <div class="ibox-content">
            <div id="ticket" style="width: 1070px; height: 340px;"></div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  var echarts = require('echarts')
  export default {
    mounted () {
      this.initTicketChart()
    },
    methods: {
      initTicketChart () {
        var ticketChart = echarts.init(document.getElementById('ticket'))
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
          legend: {
            data: ['个人现有', '个人新增', '总计指数', '平均指数']
          },
          grid: {
            left: '1%',
            right: '1%',
            bottom: '1%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: ['11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日'],
              axisPointer: {
                type: 'shadow'
              }
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 20000,
              interval: 4000,
              axisLabel: {
                formatter: '{value} 元'
              }
            },
            {
              type: 'value',
              name: '金额',
              min: 0,
              max: 20000,
              interval: 4000,
              axisLabel: {
                formatter: '{value} 元'
              }
            }
          ],
          series: [
            {
              name: '个人现有',
              type: 'bar',
              data: [2, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
            },
            {
              name: '个人新增',
              type: 'bar',
              data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
            },
            {
              name: '平均指数',
              type: 'line',
              yAxisIndex: 1,
              data: [2.3, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            },
            {
              name: '总计指数',
              type: 'line',
              yAxisIndex: 1,
              data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 21.3, 23.4, 23.0, 16.5, 12.0, 6.2]
            }

          ]
        })
      }
    }
  }
</script>

<style>

</style>
