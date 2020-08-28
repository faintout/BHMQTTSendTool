<template>
  <div class="content">
      <el-table
      :data="tableData"
       style="width: 100%">
      >
    <el-table-column
        width="180"
        >
        <template slot-scope="scope">
        <el-radio-group v-model="scope.enable">
            <el-radio :label="0" @click="changdItem(scope)">主</el-radio>
            <el-radio :label="1">备</el-radio>
  </el-radio-group>
        </template>
      </el-table-column>

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
                name:'1231',
                enable:'1',
                data:'333'
            },
            {
                id:2,
                name:'1232',
                enable:'1',
                data:'333'
            },
            {
                id:3,
                name:'1233',
                enable:'1',
                data:'333'
            },
            {
                id:4,
                name:'1234',
                enable:'1',
                data:'333'
            },
            {
                id:5,
                name:'1235',
                enable:'1',
                data:'333'
            },
            {
                id:6,
                name:'1236',
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