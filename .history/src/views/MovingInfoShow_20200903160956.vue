<template>
    <div class="content">
        <title></title>
        <!-- 按钮模块 -->
        <div class="content_title">
            定时刷新时间：<el-input style="display:inline-block;width:10%;" size="small" v-model="timer"></el-input>
            <!-- <el-button type="success" size="small" @click="getAllMqttData">获取</el-button>
            <el-button size="mini" @click="batch(0)">批量主发送</el-button>
            <el-button size="mini" @click="batch(1)">批量备发送</el-button> -->
            <!-- <el-button type="success" size="small" @click="sendData()">发送</el-button> -->
        </div>
        <!-- <el-table v-loading="tableLoading" :data="tableData" class="el_table">
            >
            <el-table-column prop="name" label="名称" align='center'>
            </el-table-column>
            <el-table-column label="切换源" align='center'>
                <template slot-scope="scope">
                    <el-radio-group v-model="scope.row.switchStatus">
                        <el-radio :label="0" @click="scope.row.switchStatus = 0">主</el-radio>
                        <el-radio :label="1" @click="scope.row.switchStatus = 1">备</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label="操作" align='center'>
                <template slot-scope="scope">
                    <el-button type="success" size="small" @click="changeData(scope.row)">编辑</el-button>
                    <el-button type="success" size="small" @click="sendData(scope.row)">发送</el-button>
                </template>
            </el-table-column>
        </el-table> -->
        <!-- 树形表格 -->
        <el-table :data="tableData" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="deviceName" label="日期" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorName" label="姓名" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorValue" label="地址" align='center'>
            </el-table-column>
        </el-table>
        <!-- 弹框 -->
        <el-dialog title="编辑" :visible.sync="dialogVisible" width="30%" :close-on-click-modal=false>
            <el-input type="textarea" :rows="25" class="el_input" v-model="editTable"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                localIp:'172.17.35.23:24699',
                tableData: [{
                    id: 1,
                    deviceName: '水浸传感器',
                    indicatorName: '',
                    indicatorValue: '',
                    children: [{
                        id: 11,
                        deviceName: '',
                        indicatorName: '湿度',
                        indicatorValue: '10'
                    }, {
                        id: 12,
                        deviceName: '',
                        indicatorName: '饱和度',
                        indicatorValue: '10'
                    }]
                }, {
                    id: 2,
                    deviceName: '温湿度传感器',
                    indicatorName: '',
                    indicatorValue: '',
                    children: [{
                        id: 21,
                        deviceName: '',
                        indicatorName: '湿度',
                        indicatorValue: '10'
                    }, {
                        id: 22,
                        deviceName: '',
                        indicatorName: '饱和度',
                        indicatorValue: '10'
                    }]
                }, {
                    id: 3,
                    deviceName: 'CO2传感器',
                    indicatorName: '',
                    indicatorValue: '',
                    children: [{
                        id: 31,
                        deviceName: '',
                        indicatorName: '湿度',
                        indicatorValue: '10'
                    }, {
                        id: 32,
                        deviceName: '',
                        indicatorName: '饱和度',
                        indicatorValue: '10'
                    }]
                }, ],
            }
        },
        watch: {},
        computed: {},
        methods: {
            //获取设备
            getDeviceList(){
                $.ajax({
                    type: "POST",
                    url: 'http://'+this.localIp+'/testData/getPowerDeviceMsg',
                    success(data) {
                        let deviceList = data.data
                        $.ajax({
                            type:'post',
                            url:'http://'+this.localIp+'/testData/getPowerDeviceMsg'
                        })
                        for(let i in deviceList){
                            
                        }
                    },
                    error(){

                    }
                });
            },
            getDeviceIndicator(){

            }
        },
        mounted() {
            this.getDeviceList()
        },
        created() {},
    }
</script>
<style lang="less" scoped>
    .content {
        width: 60%;
        margin: 2% auto;
        margin-bottom: 0;
    }

    .el_table {
        width: 100%;
        position: relative;

    }

    .content_title {
        text-align: right;
        margin-right: 10%;
    }

    /deep/.el-message {
        top: 50px !important;
    }

    input {
        height: 20rem;
    }
</style>