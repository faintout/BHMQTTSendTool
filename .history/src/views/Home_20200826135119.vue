<template>
  <div class="content">
      <el-table
      :data="tableData"
       style="width: 50%;position: relative;left: calc(50% - 25%);">
      >
      <el-table-column
          prop="name"
          width="800"
        label="名称"
      >
      </el-table-column>
    <el-table-column
        label="切换源"
        width="200"

        >
        <template slot-scope="scope">
        <el-radio-group v-model="scope.row.enable">
            <el-radio :label="0" @click.native.prevent="changeItem('1')" >主</el-radio>
            <el-radio :label="1" 
            @click.native="changItemRadio(scope.row.enable)"
            >备</el-radio>
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
                enable:0,
                data:'333'
            },
            {
                id:2,
                name:'1232',
                enable:1,
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
  computed:{

  },
  methods:{
      changeItem(item){
          console.log('item',item);
      },
      changItemRadio(item){
          console.log('itemzhixng ');
      },
      //获取所有数据
      getAllMqttData(){

      },
      //数据处理
      dataProcessing(){

      }

  },
  mounted(){
      console.log(this.tableData);
  },
  created(){},
}
</script>
<style lang="less" scoped>
</style>