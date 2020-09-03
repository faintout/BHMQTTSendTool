<template>
    <div>
        <!-- <header-info></header-info> -->
        <!-- <mqtt-send-tool v-if='activeIndex==1'></mqtt-send-tool>
        <moving-info-show v-if='activeIndex==2'></moving-info-show> -->
        <router-view></router-view>
    </div>
</template>

<script>
import headerInfo from './header.vue'
    export default {
        components: {
           headerInfo
        },
        data() {
            return {
            }
        },
        watch: {},
        computed: {},
        methods: {},
        mounted() {},
        created() {},
    }
</script>
<style lang="less" scoped>
</style>