<template>
    <div>
        <header></header>
        <mqtt-send-tool v-if='activeIndex==1'></mqtt-send-tool>
        <moving-info-show v-if='activeIndex==2'></moving-info-show>
    </div>
</template>

<script>
    import MovingInfoShow from './MovingInfoShow.vue'
    import MqttSendTool from './MqttSendTool.vue'
    export default {
        components: {
            MovingInfoShow,
            MqttSendTool
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