import React, {Component} from 'react'
import {connect} from 'react-redux';
import * as action from '../../Store/Action';
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import DoctorForm from './doctorForm'
import {Modal,Table,Menu, Dropdown, Icon} from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import './doctor.css'
import * as moment from 'moment'
import Tab from '../../components/tab/tab'
import ViewSchedules from './viewSchedule'
let viewData;//global variable for user view data

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {

        user: {
      name: null,
      phone: null,
      email: null,
      professionstarted: null,
      treatment: null,
      fee: null,
      netFee: null,
      gender: null,
      isactive: false,
      registrationno:null,
      onlycorporate:false,
      location:{ address: '',city:'',pincode:''},
      city: null,
      pincode: null,
      qualification: [null,null],
      service: [],
      refpharmacyid:null,
      isdr:true,
      lang: null,
      // id:null,
    },
   data: {
                "morning": [
                    {
                        "time": "08:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "08:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "08:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:20",
                        "status": true,
                        "appointmentid":""
                    }
                ],
                "afternoon": [
                    {
                        "time": "12:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "12:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "12:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:40",
                        "status": true,
                        "appointmentid":""
                    }
                ],
                "evening": [
                    {
                        "time": "16:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "16:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "16:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:40",
                        "status": true,
                        "appointmentid":""
                    }
                
                ]
              
            }
             ,
    
  

      visible: false,//modal show hide handle
      formName: '',
      edit: false,
      viewUser:false,//handle view user data on name click
      corporateSchedule:false,
   
    };
    this.addDoctor = this.addDoctor.bind(this);
    this.editData = this.editData.bind(this);

  }

  componentDidMount() {
    console.log(this.state);
    console.log(this.props)
    this.props.getDoctorList()//get all doctor list
  }

  editData=(obj)=> {
    let day = moment().format("DD/MM/YYYY");
    this.props.getDoctor(obj.id)
    this.props.getDoctorAvailableTime(obj.id,day)
   
    
    this.setState({
      ...this.state,
      formName: 'Edit Doctor',
      visible: true,
      viewUser:false,
      edit: true
    })
   

   }

  addDoctor() {
 //add doctor form open
    this.setState({
      ...this.state,
      formName: 'Add Doctor',
      viewUser:false,
      visible: true,
      edit: false
    });

  }
  handleOk = (e) => {
    this.setState({visible: false,edit:false,corporateSchedule:false});
  }
  handleCancel = (e) => {
    this.setState({visible: false,edit:false,corporateSchedule:false});
  }
  
  viewUser=(obj)=>{
    //get user's data in "obj"
    this.setState({
      viewUser:true,
      formName:null,
      visible: true})
    viewData=(
      <div className="row">
      <div className="col-md-12 user-view">
      <h4><i className="fa fa-user-circle-o"></i> {obj.name}-({obj.treatment} Specialist)</h4>
      <div>
      <p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Id  :</span><span style={{color:"#dc3545"}}>&nbsp;&nbsp;{obj.id}</span></p>

      <p> <i className="fa fa-calendar-plus-o"></i>&nbsp;&nbsp;<span>Profession From :</span>{obj.professionstarted}</p>
     
      <p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Registration no  :</span>&nbsp;&nbsp;{obj.registrationno}</p>

      <p> <i className="fa fa-envelope-square"></i> &nbsp;&nbsp;<span>Email : </span>{obj.email}</p>
      
      <p> <i className="fa fa-user-circle-o"></i> &nbsp;&nbsp;<span>Gender : </span>{obj.gender}</p>
      

          <p> <i className="fa fa-mobile"></i> &nbsp;&nbsp;<span>Phone no :</span> &nbsp;&nbsp;{obj.phone}</p>
         {obj.qualification!== null
         ?<p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Qualification  :</span>&nbsp;&nbsp;{obj.qualification.toString()}</p> 
         :<p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Qualification  :</span>&nbsp;&nbsp;{obj.qualification}</p> 
}
          
          <p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Language known  :</span>&nbsp;&nbsp;{obj.lang.toString()}</p>
          <p> <i className="fa fa-hospital-o"></i> &nbsp;&nbsp;<span>Service :</span>&nbsp;&nbsp;{obj.service.toString()}</p>

          <p> <i className="fa fa-hospital-o"></i> &nbsp;&nbsp;<span>Pharma-id :</span>&nbsp;&nbsp;{obj.refpharmacyid}</p>
          {obj.location!==undefined
         ? <p><i className="fa fa-map-marker"></i> &nbsp;&nbsp;<span>Address :</span>&nbsp;&nbsp;{obj.location.address},{obj.location.city},{obj.location.pincode}</p>
          : console.log('nochange') }
          <p> <i className="fa fa-calendar-plus-o"></i>&nbsp;&nbsp;<span>Created date:</span>&nbsp;&nbsp;{obj.createddate.substr(0,10)}</p>

           </div>

      
  </div>
  </div>)
  }
    shedules =(id)=>{
this.props.getCorporateSchedules(id);
this.setState({corporateSchedule:true});
    }

  render() {
    let tab=(this.state.edit === false 
      ?<Tab data={this.state} />
      :<Tab data={this.props.time} data1={this.state.data} data2={this.props.getDoctorAvailableSlots} data3={this.props.getDoctorAvailableTime}/> )

    let data = (this.state.viewUser===false
      ? (this.state.edit===true 
        ?<div className = "container">
<ul class="nav nav-tabs">
<li ><a data-toggle="tab" href="#editform" class="p-10 active show">Edit Doctor</a></li>
<li><a data-toggle="tab" href="#bookslot" class="p-10">Edit Time</a></li>

</ul>

<div class="tab-content">
<div id="editform" class="tab-pane fade in active show">
<DoctorForm  visible={this.state.visible} getDoctorList={this.props.getDoctorList} user={this.props.getDoctors} handleOk={this.handleOk} edit={this.state.edit} updateDoctor={this.props.updateDoctor} />

</div>
<div id="bookslot" class="tab-pane fade">
{tab}
</div>


</div>
</div>
        :<div className = "container">

        <ul class="nav nav-tabs">
        <li ><a data-toggle="tab" href="#editform" class="p-10 active show">Edit Doctor</a></li>
        <li><a data-toggle="tab" href="#bookslot" class="p-10">Edit Time</a></li>
        
        </ul>
        
        <div class="tab-content">
        <div id="editform" class="tab-pane fade in active show">
        <DoctorForm  visible={this.state.visible} user={this.state.user} getDoctorList={this.props.getDoctorList}  addDoctor={this.props.addDoctor} handleOk={this.handleOk} edit={this.state.edit} />        
        </div>
        <div id="bookslot" class="tab-pane fade">
        {tab}
        </div>
        
        
        </div>
        </div>)

      : viewData
)
 let viewdoctorSchedule= (this.state.corporateSchedule===true ? <ViewSchedules corporateSchedule={this.state.corporateSchedule} doctorSchedules={this.props.doctorSchedules} handleOk={this.handleOk} handleCancel={this.handleCancel} /> : console.log("no"))

   
      //all doctors data map and append to table body
      const columns = [{
        title: 'Name',
        dataIndex: 'name',
         width: 150,
      }, {
        title: 'Specialist',
        dataIndex: 'specialist',
         width: 150,
      }, {
        title: 'Only Corporate',
        dataIndex: 'onlycorporate',
        width: 150,
      },
      {
        title: 'Status',
        dataIndex: 'status',
        width: 150,
      },
      {
        title: 'Action',
        dataIndex: 'action',
        width: 150,
      }];
  
      let tabledata=[];
      this.props.getDoctorlist.map((item,i)=>{
  
        const menu = (
          <Menu>
            <Menu.Item>
              <a  rel="noopener noreferrer" href="#" onClick={this.editData.bind(this, item)}>Edit</a>
            </Menu.Item>
            <Menu.Item>
      <a href="#" onClick={()=>this.shedules(item.id)}>schedules</a>
            </Menu.Item>
            <Menu.Item>
              <a  rel="noopener noreferrer" href="#more">More</a>
            </Menu.Item>
          </Menu>
        );
        tabledata.push({
          
            key: i,
            name: <a className="view" onClick={() => this.viewUser(item)}>{item.name}</a>,
            specialist: item.treatment,
            onlycorporate:(item.onlycorporate === true
                ? <span className='active'>Active</span>
              : <span className='inactive'>InActive</span>),
            status:(item.isactive === true
              ? <span className='active'>Active</span>
            : <span className='inactive'>InActive</span>),
            action:<Dropdown overlay={menu} placement="bottomCenter">
            <Icon type="edit" />
          </Dropdown>
            
          });
       
      })
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="ManageDoctor"/>
          <div className="main-body">
            <a className="addDoctor nav-link"  onClick={this.addDoctor}>

              <i className="fa fa-fw fa-plus"></i>Add Doctor</a>

            <Table columns={columns} dataSource={tabledata} pagination={{ pageSize: 7 }} scroll={{ y: 275}} size="middle" />

            <Modal
            //   className="managedoctor"
              visible={this.state.visible}
              onOk={this.handleOk}
              onCancel={this.handleCancel}
              width={"700px"}
              footer={[null]}>
           {data}
            </Modal>
            {viewdoctorSchedule}
          </div>
        </div>
      </div>

    )
  }
}
const mapStateToProps = state => {
  return {
    getDoctorlist: state.data.data,
    getDoctors: state.data.doctor,
    time: state.data.avilableTime,
    doctorSchedules:state.data.corporateSchedules

  }
}

const mapDispatchToProps = dispatch => {
  return {
    getDoctorList: () => dispatch(action.getDoctorList()),
   getDoctor: (id) => dispatch(action.getDoctor(id)),
   updateDoctor :(data) => dispatch(action.updateDoctor(data)),
   addDoctor:(data)=>dispatch(action.addDoctor(data)),
    getDoctorAvailableTime: (id,day)=>dispatch(action.fetchDoctorAvailableTime(id,day)),
    getDoctorAvailableSlots:(output)=>dispatch(action.fetchAvilableDate(output)),
    getCorporateSchedules :(id)=>dispatch(action.getCorporateSchedules(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor)
