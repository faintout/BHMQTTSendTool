<template>
    <div>
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
            <!-- <el-menu-item index="1">处理中心</el-menu-item> -->
            <router-link to='/MqttSendTool'><el-menu-item index="1">MQTT批量下发工具</el-menu-item></router-link>
            <router-link to='/MovingInfoShow'><el-menu-item index="2">动环指标数据展示</el-menu-item></router-link>
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