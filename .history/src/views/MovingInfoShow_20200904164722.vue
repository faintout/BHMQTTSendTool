<template>
    <div class="content">
        <title></title>
        <!-- 按钮模块 -->
        <div class="content_title">
            定时刷新时间(MS),0为不刷新：<el-input style="display:inline-block;width:10%;margin-right:5%" size="small" v-model="timer"></el-input>
            <!-- <el-button type="success" size="small" @click="getAllMqttData">获取</el-button>
            <!-- <el-button size="mini" @click="batch(0)">批量主发送</el-button> -->
            <el-button size="mini" type="success" @click="getDeviceList">刷新</el-button>
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
        <el-table :data="tableData" v-if="tableData" :span-method="objectSpanMethods" style="width: 100%;margin-bottom: 20px;" row-key="id" border default-expand-all :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="deviceName" label="设备" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorName" label="指标名称" align='center'>
            </el-table-column>
            <el-table-column prop="indicatorValue" label="指标值" align='center'>
                <template slot-scope="scope">
                    <i v-if="scope.row.isValueMap&&scope.row.originValue==1" class="red_round"></i>
                    <i v-if="scope.row.isValueMap&&scope.row.originValue==0" class="green_round"></i>
                    {{scope.row.indicatorValue}}{{scope.row.indicatorUnit}}
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
                timer: 0,
                timers: null,
                localIp: '172.17.35.23:24699',
                tableData: [],
            }
        },
        watch: {
            timer(n, o) {
                if (n == 0 || o == 0) {
                    clearInterval(this.timers)
                }
                if (n > 0 && n < 1000) {
                    this.timer = 1000
                }
                if (o == 0 && n > 0) {
                    // if (n < )
                    this.getDeviceList()
                }
            }
        },
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
            flitterData(arr) {
                let spanOneArr = []
                let spanTwoArr = []
                let concatOne = 0
                let concatTwo = 0
                arr.forEach((item, index) => {
                    if (index === 0) {
                        spanOneArr.push(1);
                        spanTwoArr.push(1);
                    } else {
                        if (item.deviceName === arr[index - 1].deviceName) { //第一列需合并相同内容的判断条件
                            spanOneArr[concatOne] += 1;
                            spanOneArr.push(0);
                        } else {
                            spanOneArr.push(1);
                            concatOne = index;
                        };
                        if (item.code === arr[index - 1].code && item.deviceName === arr[index - 1].deviceName) { //第二列需合并相同内容的判断条件
                            spanTwoArr[concatTwo] += 1;
                            spanTwoArr.push(0);
                        } else {
                            spanTwoArr.push(1);
                            concatTwo = index;
                        };
                    }
                });
                return {
                    one: spanOneArr,
                    two: spanTwoArr,
                }
            },
            // 合并列
            objectSpanMethods({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    const _row = (this.flitterData(this.tableData).one)[rowIndex];
                    const _col = _row > 0 ? 1 : 0;
                    return {
                        rowspan: _row,
                        colspan: _col
                    };
                }
                // if (columnIndex === 1) {
                //     const _row = (this.flitterData(this.tableData).two)[rowIndex];
                //     const _col = _row > 0 ? 1 : 0;
                //     return {
                //         rowspan: _row,
                //         colspan: _col
                //     };
                // }
            },
            getDeviceList() {
                if (this.timers) {
                    clearInterval(this.timers)
                }
                let tableList = []
                // this.tableData = []
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
                                            let datas = data.data && (data.data.indicators.length ? data.data.indicators : []);
                                            // let datas = [];
                                            console.log(indicators, datas);
                                            for (let a in datas) {
                                                if (!datas.length) {
                                                    // this.deviceIndValueEmpty(indicators[c],i,c)
                                                    let ObjEmpty = {}
                                                    ObjEmpty.deviceName = deviceList[i].name
                                                    ObjEmpty.id = c
                                                    ObjEmpty.indicatorName = indicators[c].name
                                                    ObjEmpty.indicatorValue = indicators[c].value || ''
                                                    ObjEmpty.indicatorUnit = indicators[c].unit || ''
                                                    tableList.push(ObjEmpty)
                                                    tableList.sort()
                                                    continue
                                                }
                                                for (let c in indicators) {
                                                    if (indicators[c].id == datas[a].key) {
                                                        let ObjChildren = {}
                                                        let itemValueMap = indicators[c].indicatorValueMap
                                                        ObjChildren.deviceName = deviceList[i].name
                                                        ObjChildren.id = c
                                                        ObjChildren.indicatorName = indicators[c].name
                                                        ObjChildren.indicatorValue = itemValueMap != null ? JSON.parse(JSON.stringify(itemValueMap))[parseInt(datas[a].value)] : datas[a].value
                                                        ObjChildren.originValue = datas[a].value
                                                        ObjChildren.isValueMap = Boolean(itemValueMap != null)
                                                        ObjChildren.indicatorUnit = indicators[c].unit || ''
                                                        tableList.push(ObjChildren)
                                                        tableList.sort()
                                                    }
                                                }
                                            }
                                            
                                        },
                                        error() {}
                                    })
                                    // tableList.push(Obj)
                                }

                            },
                            error() {}
                        })
                    },
                    error() {

                    }
                });
                self.$nextTick(() => {
                     
                    self.tableData = tableList
                })
                console.log('tableList', self.tableData,self.tableData.length);
                if (self.timer == 0) { return }
                self.timers = setInterval(() => {
                    self.getDeviceList()
                }, self.timer)
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
    .red_round {
        transform: translate(0, 19%);
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: red;
    }

    .green_round {
        transform: translate(0, 19%);
        display: inline-block;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
        background-color: green;
    }

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
        // margin-right: 10%;
        // margin-bottom: 1%;
        margin: 0 10% 1% 0;
    }

    /deep/.el-message {
        top: 50px !important;
    }

    input {
        height: 20rem;
    }
</style>