<template>
    <div class="content">
        <title></title>
        <!-- 按钮模块 -->
        <div style="position: relative;left: calc(50% - 13%);width: 50%;">
            <el-input style="display:inline-block;width:20%;right: 5%;" size="small" v-model="localIP"></el-input>
            <el-button type="success" size="small" @click="getAllMqttData">获取</el-button>
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
    //设置本地储存方法
    window.local = (key, value, type) => {
        if (type == get) {

        }
        switch (type) {
            case get: {
                return localStorage.getItem(key)
            }
            case set: {
                return localStorage.setItem(key, value)
            }
            default: {
                return "类型值错误"
            }
        }
    }

    export default {
        components: {},
        data() {
            return {
                //本地IP
                localIP: '',
                //表格框加载
                tableLoading: false,
                tableData: []
            }
        },
        watch: {
            localIP(n, o) {
                localStorage.setItem('localIP', n)
            }
        },
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
                $.ajax({
                    type: 'POST',
                    url: 'http://'+this.localIP+'/testData/applySwitch',
                    success: (data) => {
                        if(data.data==[]){
                            this.$message.errot("获取数据为空！")
                            return
                        }
                        this.tableData = data.data
                    },
                    error: () => {
                        this.$message.error("数据获取错误，请检查IP地址！")
                    }
                })
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
                        duration: 1000
                    });
                }, 3000)
            },
            //读取本地localIP
            getLocalIP() {
                this.localIP = localStorage.getItem('localIP') != null ? localStorage.getItem('localIP') : window.location.host
                localStorage.getItem('localIP') == null && localStorage.setItem('localIP', window.location.host)
            }

        },
        mounted() {
            console.log(localStorage.getItem('localIP'),);
            //读取本地IP
            this.getLocalIP()
            this.getAllMqttData()

        },
        created() {},
    }
</script>
<style lang="less" scoped>
    .content {
        margin: 5% 0 0 0;
    }
</style>