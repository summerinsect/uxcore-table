/*
* @Author: dmyang
* @Date:   2016-05-23 09:18:28
* @Last Modified by:   wangyidong
* @Last Modified time: 2016-08-26 15:31:42
*/

'use strict'

let Validator = require('uxcore-validator');
let Button = require('uxcore-button');
let Select = require('uxcore-select2');
let {Option} = Select; 
let RadioGroup = require('uxcore-radiogroup');
let RadioItem = RadioGroup.Item;
let Table = require('../src');
let {Constants} = Table
let mockData = {
    "data": [
        {
            "id":"1",
            "name": "仿实木地板及PVC踢脚线安装",
            "category": "地面木工工程",
            "standard": "30*60cm",
            "unit":"m²",
            "price": "160.00",
            "costPrice": "60.00",
            "channel": "聚居",
            "info": "1.配套扫脚线和门压条均为配套的PVC材质",
            "sort": "1",
        },
        {
            "id":"1",
            "name": "仿实木地板及PVC踢脚线安装",
            "category": "地面木工工程",
            "standard": "30*60cm",
            "unit":"m²",
            "price": "160.00",
            "costPrice": "60.00",
            "channel": "聚居",
            "info": "1.配套扫脚线和门压条均为配套的PVC材质",
            "sort": "1",
        },
        {
            "id":"1",
            "name": "客餐厅包含项目",
            "data": [
              {
                "name": "仿实木地板及PVC踢脚线安装",
                "category": "地面木工工程",
                "standard": "30*60cm",
                "unit":"m²",
                "price": "160.00",
                "costPrice": "60.00",
                "channel": "聚居",
                "info": "1.配套扫脚线和门压条均为配套的PVC材质",
                "sort": "1",
              },
              {
                "name": "集合1",
                "data": [
                  {
                    "name": "仿实木地板及PVC踢脚线安装",
                    "category": "地面木工工程",
                    "standard": "30*60cm",
                    "unit":"m²",
                    "price": "160.00",
                    "costPrice": "60.00",
                    "channel": "聚居",
                    "info": "1.配套扫脚线和门压条均为配套的PVC材质",
                    "sort": "1",
                  }
                ]
              },
            ]
        }
    ]
}

class Demo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           data:mockData,
           showOtherColumn: false
        }
    }
    getTableValues() {
        console.log(this.refs.grid.getData());
        console.log(this.state.data);
    }
    handleTableChange(data, dataKey, pass) {
        console.log(data['data']);
    }

    render () {
        let me = this;
        let columns = [
            { dataKey: 'jsxid', title: 'jsxid', width: 120, hidden: false},
            { dataKey: 'id', title: "项目ID", width: 100},
            { dataKey: 'name', title: "项目名称", width: 150, type:"text"},
            { dataKey: 'category', title: "项目类别", width: 150, type:"text"},
            { dataKey: 'standard', title: "规格", width: 80, type:"text"},
            { dataKey: 'unit', title: "单位", width: 80, type:"text"},
            { dataKey: 'price', title: "报价", width: 80, type:"text", rules: {validator: Validator.isNum, errMsg: "格式错误"}},
            { dataKey: 'costPrice', title: "成本价", width: 80, type:"text", rules: {validator: Validator.isNum, errMsg: "格式错误"}},
            { dataKey: 'channel', title: "渠道", width: 80, type:"text"},
            { dataKey: 'info', title: "说明", width: 200, type:"text"},
            { dataKey: 'sort', title: "排序", width: 80},
            { dataKey: 'action1', title: '操作1', width:100, type:"action", actions: [
                    {
                        title: '编辑',
                        callback: (rowData) => {
                            me.refs.grid.editRow(rowData);
                        },
                        mode: Constants.MODE.VIEW
                    },
                    {
                        title: '保存',
                        callback: (rowData) => {
                            me.refs.grid.saveRow(rowData);
                        },
                        mode: Constants.MODE.EDIT
                    },
                    {
                        title: '删除',
                        callback: (rowData) => {
                            me.refs.grid.delRow(rowData);
                        },
                        mode: Constants.MODE.VIEW
                    },
                    {
                        title: '重置',
                        callback: (rowData) => {
                            me.refs.grid.resetRow(rowData);
                        },
                        mode: Constants.MODE.EDIT
                    }
                ]
            }
        ];


        let renderProps={
            width: 1000,
            showPager:false,
            fetchParams: {},
            jsxdata: me.state.data,
            renderModel: 'tree',
            actionBar: {
                '新增行': () => {
                    me.refs.grid.addEmptyRow();
                }
            },
            jsxcolumns:columns,
            beforeFetch: (sendData) => {sendData.id = 1; return sendData;},
            processData: (data) => {return data;},
            onChange: me.handleTableChange       
        };

        return (
            <div>
                <Table {...renderProps}  ref="grid"/>
                <Button onClick={me.getTableValues.bind(me)}>获取 Table 的值</Button>
            </div>
        );
      }
};

module.exports = Demo;
