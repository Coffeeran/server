<template>
  <div>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      label="姓名"
      width="130">
      <template scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>姓名: {{ scope.row.name }}</p>
          <p>电话: {{ scope.row.phoneNum }}</p>
          <div slot="reference" class="name-wrapper">
            <el-tag type="primary" style="margin-top: 10px">{{ scope.row.name }}</el-tag>
            <p>{{ scope.row.phoneNum }}</p>
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      label="订单状态"
      width="130">
      <template scope="scope">
        <el-icon name="time"></el-icon>
        <span style="margin-left: 10px">{{ scope.row.orderStatus }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="商品名称"
      width="380">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.productName }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="合作模式"
      width="120">
      <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.coModelType }}</span>
      </template>
    </el-table-column>
    <el-table-column
      label="金额(首付/总额)"
      width="150">
      <template scope="scope">
        <span><el-tag :type="scope.row.pay">{{ Number(scope.row.downAmount).toLocaleString() }}</el-tag>/{{Number(scope.row.totalAmount).toLocaleString()}}</span>
      </template>
    </el-table-column>
    <el-table-column label="销售人员">
      <template scope="scope">
        <span style="margin-left: 10px">{{ scope.row.saleMan }}</span>
      </template>
    </el-table-column>
  </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next"
      :total="400"
    class="pull-right" style="margin-top: 8px">
    </el-pagination>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data () {
        return {
          tableData: [{
            orderStatus: '未付款',
            name: '王小虎',
            pay: 'succes   s',
            phoneNum: '13980443396',
            productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
            coModelType: '以租代购',
            downAmount: '20000',
            totalAmount: '130000',
            saleMan: '李大龙'
          }, {
            orderStatus: '未付款',
            name: '王小虎',
            pay: 'succes   s',
            phoneNum: '13980443396',
            productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
            coModelType: '以租代购',
            downAmount: '20000',
            totalAmount: '130000',
            saleMan: '李大龙'
          }, {
            orderStatus: '未付款',
            name: '王小虎',
            pay: 'succes   s',
            phoneNum: '13980443396',
            productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
            coModelType: '以租代购',
            downAmount: '20000',
            totalAmount: '130000',
            saleMan: '李大龙'
          }, {
            orderStatus: '未付款',
            name: '王小虎',
            pay: 'succes   s',
            phoneNum: '13980443396',
            productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
            coModelType: '以租代购',
            downAmount: '20000',
            totalAmount: '130000',
            saleMan: '李大龙'
          }]
        }
      },
      methods: {
        fetchData () {
          axios.get('/api/order/list.do')
        },
        handleEdit (index, row) {
          console.log(index, row)
        },
        handleDelete (index, row) {
          console.log(index, row)
        },
        handleSizeChange (val) {
          console.log(`每页 ${val} 条`)
        },
        handleCurrentChange (val) {
          console.log(`当前页: ${val}`)
        }
      },
      mounted () {
        this.fetchData()
      }
    }
</script>

<style>

</style>
