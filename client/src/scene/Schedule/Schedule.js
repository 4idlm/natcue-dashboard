import React from 'react'
 import {connect} from 'react-redux'
 import * as action from '../../Store/Action'
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
 import {Modal,Table,Menu, Dropdown, Icon,Popconfirm } from 'antd';
 import moment from 'moment';
 import ScheduleForm from './ScheduleForm'
 import './Schedule.css'

class Schedule extends React.Component {
  constructor(props){
    super(props)
    this.state={
      
      schedule:{
        title:'',
        doctornames:[],
        scheduledate:moment(new Date()).add(1, 'day').format("YYYY-MM-DD"),
        officenames:[]
      },
      edit:false,
      visible:true,
      filteredInfo: null,
    sortedInfo: null,
    }
   this.baseState=this.state.schedule;
  }
  handleOk = (e) => {
  
    this.setState({visible: false,edit:false,schedule:this.baseState});

  }
  handleChange = (pagination, filters, sorter) => {
    console.log('Various parameters', pagination, filters, sorter);
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  }
handleCancel = (e) => {
  
    this.setState({visible: false,edit:false,schedule:this.baseState});

  }
  componentDidMount() {
   
      this.props.getDoctorNames();
     this.props.getOfficeNames();
     this.props.getSchedules();
  }
  
   editData = (obj) =>{
    
     let doctorsid=[];
     obj.doctors.map(item =>{
       doctorsid.push(
         item.id
       )
     })
      this.props.getSchedule(obj._id.id);
     this.setState({
       edit:true,
       visible:true,
       schedule:{
         title:obj._id.title,
         officenames:obj._id.office.id,
         doctornames:doctorsid,
         scheduledate:obj._id.scheduledate.substr(0,10)
       }
     })
   }
confirm=(obj)=>{
 
  this.props.cancelSchedule(obj);
  setTimeout(this.props.getSchedules,2000);
}
  
  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};
     const columns = [{
      title: 'Title',
      dataIndex: 'title',
       width: 150,
      //  defaultSortOrder: 'decend',
    }, {
      title: 'Office',
      dataIndex: 'office',
      // defaultSortOrder: 'decend',
       width: 150,
    }, {
      title: 'Doctors',
      dataIndex: 'doctors',
      width: 150,
    },
    {
      title: 'Schedule Date',
      dataIndex: 'date',
      key:'date',
      sorter: (a, b) => a.date - b.date,
       sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
      width: 150,
     },
    {
      title: 'Action',
      dataIndex: 'action',
      width: 150,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      width: 150,
    }]; 
  

    let data=[];
    this.props.schedules.map((item,i)=>{
console.log(item);
      const menu = (
        <Menu>
          <Menu.Item>
            <a  rel="noopener noreferrer" href="#" onClick={()=> this.editData(item)}>Edit</a>
          </Menu.Item>
          <Menu.Item>
          <Popconfirm title="Are you sure cancel this Schedule?" onConfirm={()=>this.confirm(item._id.id)} okText="Yes" cancelText="No">
    <a href="#">Cancel</a>
  </Popconfirm>
          </Menu.Item>
          <Menu.Item>
            <a  rel="noopener noreferrer" href="#more">More</a>
          </Menu.Item>
        </Menu>
      );
      data.push({
        
          key: i,
          title: <p>{item._id.title}<br/>({item._id.id})</p>,
          office: item._id.office.name,
         doctors:<ol className="tabledoctorlist">{item.doctors.map(doctor=>{
          //  console.log(doctor)
           return(
          <li key={doctor._id}> {doctor.name.toString()}</li>
           )
         })}
         </ol>,
          date:moment(item._id.scheduledate).format("DD/MMM/YYYY"),
          action: (item._id.scheduledate < moment(new Date()).format("YYYY-MM-DD" )
          ?<span className="inactive">expired</span>
          :<Dropdown overlay={menu} placement="bottomCenter">
          <Icon type="edit" />
        </Dropdown>
          ),
          status:(item._id.cancelled === false
            ? (item._id.scheduledate < moment(new Date()).format("YYYY-MM-DD" )
             ?<span className="active">Completed</span>
              :<span className='active'>Active</span>)
            : <span className='inactive'>Cancelled</span>)
        });
     
    })
  //  console.log(data)
    let form = (this.state.edit ===true
    ?<Modal className="scheduleModal" title="Manage schedule" visible={this.state.visible}
    onOk={this.handleOk} onCancel={this.handleCancel} footer={[null]}>
    <ScheduleForm doctornames={this.props.doctornames} scheduleData={this.props.schedule} data={this.state.schedule} officenames={this.props.officenames} edit={this.state.edit} getSchedules={this.props.getSchedules} updateSchedule={this.props.updateSchedule} handleOk={this.handleOk}/>
    </Modal>
    :<ScheduleForm doctornames={this.props.doctornames} scheduleData={this.props.schedule} officenames={this.props.officenames} data={this.state.schedule} edit={this.state.edit} addSchedule={this.props.addSchedule} getSchedules={this.props.getSchedules}/>


)
    return (
      
      <div className="content-wrapper">
                <div className="container-fluid">
                    <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Schedule" />
                    <div className="main-body">
            {form}
            <Table columns={columns} dataSource={data} pagination={{ pageSize: 4 }} scroll={{ y: 275}} size="middle" onChange={this.handleChange}/>
                    </div>
                    
                </div>
            </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    doctornames: state.office.doctorNames,
    officenames: state.office.officeNames,
    schedules:state.office.schedules,
    schedule:state.office.schedule
    }
}

const mapDispatchToProps = dispatch => {
  return {
    getOfficeNames: () => dispatch(action.getOfficeNames()),
    getDoctorNames: () => dispatch(action.getDoctorNames()),
    addSchedule:(data)=>dispatch(action.addSchedule(data)),
    getSchedules:()=>dispatch(action.getSchedules()),
    getSchedule:(id)=>dispatch(action.getSchedule(id)),
    updateSchedule:(data)=>dispatch(action.updateSchedule(data)),
    cancelSchedule:(id)=>dispatch(action.cancelSchedule(id))

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedule)
