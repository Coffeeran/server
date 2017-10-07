<template>
  <div>

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
