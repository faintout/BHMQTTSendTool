<template>
    <div>
        <header></header>
        <bro></bro>
        <!-- <mqtt-send-tool v-if='activeIndex==1'></mqtt-send-tool>
        <moving-info-show v-if='activeIndex==2'></moving-info-show> -->
        <router-view></router-view>
    </div>
</template>

<script>
import header from './header.vue'
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
        methods: {},
        mounted() {},
        created() {},
    }
</script>
<style lang="less" scoped>
</style>