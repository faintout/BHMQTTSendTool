<template>
    <div class="content">
        <title></title>
        <!-- 按钮模块 -->
        <div style="position: relative;left: calc(50% - 6%);width: 50%;">
            <el-button size="mini" @click="batch(0)">批量主</el-button>
            <el-button size="mini" @click="batch(1)">批量备</el-button>
            <el-button type="success" size="small" @click="sendData">发送</el-button>
        </div>
        <el-table v-loading="tableLoading" :data="tableData" style="width: 50%;position: relative;left: calc(50% - 25%);">
            >
            <el-table-column prop="name" min-width="4" label="名称">
            </el-table-column>
            <el-table-column label="切换源" min-width="1">
                <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.switchStatus">
                        <el-radio :label="0" @click="scope.row.switchStatus = 0">主</el-radio>
                        <el-radio :label="1" @click="scope.row.switchStatus = 1">备</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>

        </el-table>
    </div>

</template>

<script>
    export default {
        components: {},
        data() {
            return {
                //表格框加载
                tableLoading: false,
                tableData: [{
                        id: 1,
                        name: "波导开关1",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 2,
                        name: "复用器",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 3,
                        name: "编码器",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 4,
                        name: "SDI倒换器",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 5,
                        name: "调制器主",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 6,
                        name: "调制器备1",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 7,
                        name: "12米天线接收器",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                    {
                        id: 8,
                        name: "波导开关1",
                        switchStatus: 0,
                        masterData: "",
                        savleData: ""
                    },
                ]
            }
        },
        watch: {},
        computed: {

        },
        methods: {
            changeItem(item) {
                console.log('item', item);
            },
            changItemRadio(item) {
                console.log('itemzhixng ');
            },
            //获取所有数据
            getAllMqttData() {

            },
            //数据处理
            dataProcessing() {

            },
            //批量设置
            /**
             * @type 0 主 1 备 
             * @Date 2020-08-26 14:13:24
             */
            batch(type) {
                this.tableData.forEach(item => {
                    item.switchStatus = type ? 1 : 0
                })
            },
            //发送数据
            sendData() {
                this.tableLoading = true
                setTimeout(() => {
                    this.tableLoading = false
                    this.$message({
                        message: '数据发送成功',
                        type: 'success',
                        duration:1000
                    });
                }, 3000)
            }

        },
        mounted() {
            console.log(this.tableData);
        },
        created() {},
    }
</script>
<style lang="less" scoped>
</style>