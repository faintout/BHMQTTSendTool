<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
            <el-menu-item index="1"><router-link to='/MqttSendTool'>MQTT批量下发工具</router-link></el-menu-item>
            <el-menu-item index="2">动环指标数据展示</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        components: {
        },
        data() {
            return {
                activeIndex: '1',
            }
        },
        watch: {},
        computed: {},
        methods: {
            handleSelect(key, keyPath) {
                this.activeIndex = key
            }
        },
        mounted() {},
        created() {},
    }
</script>
<style lang="less" scoped>
    .el-menu-demo {
        padding-left: 30%;
    }
</style>