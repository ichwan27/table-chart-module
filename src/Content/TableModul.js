import React, { useState } from 'react'
import dataModuleLogs from '../Data/userModuleLogs.json';
import { Table } from 'antd';

function getModulValue(modulName, data){
    return data.filter(item => item.module_name === modulName).length;
}
function getDistinctModule(chartData){
  const result =  [] ;
  const map = new Map();
  for (const item of chartData){
    if(!map.has(item.module_name)){
      map.set(item.module_name, true);
      result.push({
        data:item
      });
    }
  }
  return result;
}
function countFreq(chartData) {
  const output = [];
  const AllModulesName = getDistinctModule(chartData);
  AllModulesName.map((module) =>(
      output.push({'data' : module.data, 'visit' : getModulValue(module.data.module_name, chartData)})
  ));
  return output;
}
function getTopTenModul(dataModuleFreq){
    const output = [];
    const sortData = dataModuleFreq.sort(function(a,b){return a.visit < b.visit ? 1 : -1;}).slice(0,10);
    sortData.map((module, index) => (
        output.push({'no' : index+1, 'module_id' : module.data.module_id, 'module_name' : module.data.module_name,   'visit' : module.visit})
    ));
    return output;
}
function TableModul() {
    const [data] = useState(dataModuleLogs.data.user_module_logs);
    const columns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Module Id',
          dataIndex: 'module_id',
          key: 'module_id',
        },
        {
          title: 'Module Name',
          dataIndex: 'module_name',
          key: 'module_name'
        },
        {
          title: 'Visit',
          dataIndex: 'visit',
          key: 'visit',
          sorter: (a,b) => a.frequency - b.frequency,
          sortDirections: ['ascend', 'descend'],
        },
        ]
    return (
        <div className="container">
            <Table
              columns={columns}
              dataSource={getTopTenModul(countFreq(data))}
              bordered
              title={() => <h1 align='center'>Table top 10 moduls used</h1>}
              sticky
              width={"50%"}
              />
        </div>
    )
}

export default TableModul