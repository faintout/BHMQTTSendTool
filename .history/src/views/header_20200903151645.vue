<template>
  <div>
              <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
            <el-menu-item index="1">MQTT批量下发工具</el-menu-item>
            <el-menu-item index="2">动环指标数据展示</el-menu-item>
        </el-menu>
  </div>
</template>

<script>
export default {
  components:{},
  data(){
    return {
    }
  },
  watch:{},
  computed:{},
  methods:{},
  mounted(){},
  created(){},
}
</script>
<style lang="less" scoped>
</style>