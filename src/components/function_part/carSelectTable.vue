<template>
  <div>
  <el-table
    ref="singleTable"
    :data="tableData"
    border
    highlight-current-row
    @current-change="handleCurrentChange"
    style="width: 100%">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      property="name"
      label="商品名称">
    </el-table-column>
    <el-table-column
      property="price"
      label="价格"
      width="100">
    </el-table-column>
    <el-table-column
      property="categoryName"
      label="品牌名称"
      width="120">
    </el-table-column>
    <el-table-column
      property="stock"
      label="库存"
      width="100">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
    import axios from 'axios'
    export default {
      data () {
        return {
          tableData: [],
          currentRow: null
        }
      },
      methods: {
        handleCurrentChange (val) {
          this.$emit('currentRow', val)
        },
        getData () {
          var vm = this
          axios.get('/api/product/list.do', {
            params: {
              categoryId: 100001
            }
          }).then(function (response) {
            vm.tableData = response.data.data.list
          }).catch(function (error) {
            console.log(error)
          })
        }
      }
    }
</script>

<style>

</style>
