<template>
    <div>
        <header></header>
        <!-- <mqtt-send-tool v-if='activeIndex==1'></mqtt-send-tool>
        <moving-info-show v-if='activeIndex==2'></moving-info-show> -->
        <router-view></router-view>
    </div>
</template>

<script>
import header from './header'
    export default {
        components: {
           header
        },
        data() {
            return {
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
</style>