<template>
  <div class="content">
      <el-table
      :data="tableData"
       style="width: 100%">
      >
    

      </el-table>
  </div>
</template>

<script>

export default {
  components:{},
  data(){
    return {
        tableData:[
            {
                id:1,
                name:'12333',
                enable:'1',
                data:'333'

            }
        ]
    }
  },
  watch:{},
  computed:{},
  methods:{
      //
      getters
  },
  mounted(){
  },
  created(){},
}
</script>
<style lang="less" scoped>
</style>