<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        label="商品名称"
        width="380">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.productName }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="品牌名称"
        width="150">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.subtitle }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="商品分类"
        width="150">
        <template scope="scope">
          <span><el-tag type="success">{{scope.row.categoryType}}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template scope="scope">
          <span style="margin-left: 10px"><el-tag :type="statusResult(scope.row.status)">{{ scope.row.status }}</el-tag></span>
        </template>
      </el-table-column>
      <el-table-column label="库存" width="100">
        <template scope="scope">
          <span style="margin-left: 10px">{{ scope.row.stock }}</span>
        </template>
      </el-table-column>
      <el-table-column label="参考价格">
        <template scope="scope">
          <span style="margin-left: 10px">{{ Number(scope.row.price).toLocaleString() }}</span>
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
          productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
          subtitle: '起亚-福瑞迪',
          categoryType: '可售车型',
          status: '在售',
          stock: '10',
          price: '130000'
        }, {
          productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
          subtitle: '起亚-福瑞迪',
          categoryType: '可售车型',
          status: '在售',
          stock: '10',
          price: '130000'
        }, {
          productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
          subtitle: '起亚-福瑞迪',
          categoryType: '可售车型',
          status: '下架',
          stock: '10',
          price: '130000'
        }, {
          productName: '东风悦达-起亚-福瑞迪-手动原厂CNG-2016-手动',
          subtitle: '起亚-福瑞迪',
          categoryType: '可售车型',
          status: '在售',
          stock: '10',
          price: '130000'
        }]
      }
    },
    methods: {
      statusResult (status) {
        return status === '下架' ? 'danger' : 'success'
      },
      login () {
        axios.post('/api/user/login.do', {
          username: 'admin',
          password: '123'
        })
      },
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
      this.login()
      this.fetchData()
    }
  }
</script>

<style>

</style>
