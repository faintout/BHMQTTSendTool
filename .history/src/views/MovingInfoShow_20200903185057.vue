<template>
    <div class="content">
        <title></title>
        <!-- 按钮模块 -->
        <div class="content_title">
            <!-- 定时刷新时间：<el-input style="display:inline-block;width:10%;" size="small" v-model="timer"></el-input> -->
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
        <el-table :data="tableData" :span-method="objectSpanMethod" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="deviceName" label="设备" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorName" label="指标名称" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorValue" label="值" align='center'>
            </el-table-column>
        </el-table>

    </div>
</template>

<script>
    export default {
        components: {},
        data() {
            return {
                localIp: '172.17.35.23:24699',
                tableData: [{
                    id: 1,
                    deviceName: '温湿度',
                    indicatorName: '',
                    indicatorValue: ''
                }, {
                    id: 2,
                    deviceName: '温湿度',
                    indicatorName: '王小虎',
                    indicatorValue: '上海市普陀区金沙江路 1517 弄'
                }, {
                    id: 3,
                    deviceName: '温湿度',
                    indicatorName: '',
                    indicatorValue: '',
                    children: [{
                        id: 31,
                        deviceName: '温湿度',
                        indicatorName: '王小虎',
                        indicatorValue: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        id: 32,
                        deviceName: '温湿度',
                        indicatorName: '王小虎',
                        indicatorValue: '上海市普陀区金沙江路 1519 弄'
                    }]
                }, {
                    id: 4,
                    deviceName: '温湿度',
                    indicatorName: '',
                    indicatorValue: ''
                }],
            }
        },
        watch: {},
        computed: {},
        methods: {
            // deviceIndValueEmpty(indicatorCurr, i, c) {
            //     let Obj = {}
            //     Obj.indicatorName = indicatorCurr.name;
            //     Obj.indicatorValue = '';
            //     Obj.unit = indicatorCurr.unit || ''
            //     Obj.id = i + c
            //     $scope.moduleList[indicatorCurr.id] = Obj
            // },
            //获取设备
            getListTotla(){

            },
            objectSpanMethod(row, column, rowIndex, columnIndex) {
                console.log('row, column, rowIndex, columnIndex',row, column, rowIndex, columnIndex);
                if (columnIndex === 0) {
                    if (rowIndex % 2 === 0) {
                        return {
                            rowspan: 2,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }

            },
            getDeviceList() {
                let tableList = []
                let self = this
                $.ajax({
                    type: "POST",
                    url: 'http://' + self.localIp + '/testData/getPowerDeviceMsg',
                    success(deviceData) {
                        let deviceList = deviceData.data
                        //获取设备指标名称
                        $.ajax({
                            type: 'POST',
                            url: 'http://' + self.localIp + '/testData/getPeDeviceIndicator',
                            success(indicatorName) {
                                let indicators = indicatorName.data
                                for (let i in deviceList) {
                                    var Obj = []
                                    // Obj.deviceName = deviceList[i].name
                                    // Obj.id = deviceList[i].id
                                    // Obj.children = []

                                    $.ajax({
                                        type: 'POST',
                                        url: 'http://' + self.localIp + '/testData/getPeDeviceIndicatorData',
                                        // url: 'http://' + self.localIp + '/testData/getPeDeviceIndicator',
                                        data: { deviceId: deviceList[i].id },
                                        success(data) {
                                            console.log(data.);
                                            let datas = data && (data.length ? data.data.indicators : []);
                                            // let datas = [];
                                                console.log(datas);
                                            for (let a in datas) {
                                                if (!datas.length) {
                                                    // this.deviceIndValueEmpty(indicators[c],i,c)
                                                    let ObjEmpty = {}
                                                    ObjEmpty.deviceName = deviceList[i].name
                                                    ObjEmpty.id = i + c
                                                    ObjEmpty.indicatorName = indicators[c].name
                                                    ObjEmpty.indicatorValue = indicators[c].Value || '' + indicators[c].unit || ''
                                                    tableList.push(ObjEmpty)
                                                    continue
                                                }
                                                for (let c in indicators) {
                                                    if (indicators[c].id == datas[a].key) {
                                                        let ObjChildren = {}
                                                        ObjChildren.deviceName = deviceList[i].name
                                                        ObjChildren.id = i + c
                                                        ObjChildren.indicatorName = indicators[c].name
                                                        ObjChildren.indicatorValue = datas[a].value
                                                        tableList.push(ObjChildren)
                                                    }
                                                }
                                            }
                                        },
                                        error() {}
                                    })
                                    // tableList.push(Obj)
                                }
                                self.tableData = tableList
                                console.log('tableList', tableList);
                            },
                            error() {}
                        })
                    },
                    error() {

                    }
                });
            },
            getDeviceIndicator() {

            }
        },
        mounted() {
            this.getDeviceList()
        },
        created() {

        },
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