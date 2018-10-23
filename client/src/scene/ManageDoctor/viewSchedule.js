import React, { Component } from 'react'
import {Modal,Table} from 'antd';
import * as moment from 'moment'

import '../../../node_modules/antd/dist/antd.css'

class ViewSchedules extends Component {
    constructor(props) {
        super(props);
        this.state = {
            corporateSchedules:[{
                title:null,
                office:{name:null},
                scheduledate:null,
                cancelled:false}]
            
        }
        this.baseState = this.state.corporateSchedules;
      }
      componentWillReceiveProps(props){
        if(props.doctorSchedules.length>0){
            this.setState({
                corporateSchedules:props.doctorSchedules
            })
        }
        else{
            this.setState({
                corporateSchedules:this.baseState
            })    }
        }
          
  render() {
      
const columns = [{
    title: 'Title',
    dataIndex: 'title',
     width: 150,
  }, {
    title: 'Office',
    dataIndex: 'office',
     width: 150,
  }, {
    title: 'Schedule date',
    dataIndex: 'scheduledate',
    width: 150,
  },
  {
    title: 'Status',
    dataIndex: 'status',
    width: 150,
  }];
  var data=[];
  this.state.corporateSchedules.map((item,i)=>{
  if(item.title!==null){
    data.push({
      
        key: i,
        title: <a className="view">{item.title}</a>,
        office: item.office.name,
        scheduledate:moment(item.scheduledate).format("DD/MMM/YYYY"),
        status:(item.cancelled === false
            ? (item.scheduledate < moment(new Date()).format("YYYY-MM-DD" )
             ?<span className="active">Completed</span>
              :<span className='active'>Active</span>)
            : <span className='inactive'>Cancelled</span>)
      });
    }
  })

     return (
            <Modal
              visible={this.props.corporateSchedule}
              title="Corporate Schedules"
              onOk={this.props.handleOk}
              onCancel={this.props.handleCancel}
              width={"700px"}
              footer={[null]}>
    <Table columns={columns} dataSource={data} pagination={{ pageSize: 10 }} scroll={{ y: 310}} size="middle" />
            </Modal>
    )
  }
}


export default ViewSchedules
