import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../Store/Action';
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import {Modal,Table,Menu, Dropdown, Icon} from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import OfficeForm from './OfficeForm'

import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import '../../../node_modules/react-toastify/dist/ReactToastify.css'

let viewData;//global variable for user view data

export class Office extends Component {
    constructor(props) {
        super(props);
        this.state = {
            office: {
          name: null,
          phone: null,
          email: null,
          isactive: false,
          location:{ address: '',city:'',pincode:''},
          isoffice:true,
        },
        visible: false,//modal show hide handle
        formName: '',
        edit: false,
        viewUser:false,//handle view user data on name click
        };
      }
    componentDidMount() {
         this.props.getOfficeList()//get all doctor list
      }
    editData=(obj)=> {
      this.props.getOffice(obj.id)
        this.setState({
          ...this.state,
          formName: 'Edit Office Profile',
          visible: true,
          viewUser:false,
          edit: true
        })
        console.log(obj.id)
  
    
       }
    addOffice =() => {
        //add doctor form open
           this.setState({
             ...this.state,
             formName: 'Add Office Profile',
             viewUser:false,
             visible: true,
             edit: false
           });
       
         }
    handleOk = (e) => {
            console.log(e);
            this.setState({visible: false,edit:false});
          }
    handleCancel = (e) => {
            console.log(e);
            this.setState({visible: false,edit:false});
          }
          viewUser=(obj)=>{
            //get user's data in "obj"
            console.log(obj)
            this.setState({
              viewUser:true,
              formName:null,
              visible: true})
            viewData=(
              <div className="row">
              <div className="col-md-12 user-view">
              <h4><i className="fa fa-user-circle-o"></i> {obj.name}</h4>
              <div>
              <p> <i className="fa fa-bookmark"></i> &nbsp;&nbsp;<span>Id  :</span><span style={{color:"#dc3545"}}>&nbsp;&nbsp;{obj.id}</span></p>

              <p> <i className="fa fa-envelope-square"></i> &nbsp;&nbsp;<span>Email : </span>{obj.email}</p>
                  
                  <p> <i className="fa fa-mobile"></i> &nbsp;&nbsp;<span>Phone no :</span> &nbsp;&nbsp;{obj.phone}</p>
                                                      
                  <p><i className="fa fa-map-marker"></i> &nbsp;&nbsp;<span>Address :</span>&nbsp;&nbsp;{obj.location.address}</p>
                 
                  <p> <i className="fa fa-calendar-plus-o"></i>&nbsp;&nbsp;<span>Created date:</span>&nbsp;&nbsp;{obj.createddate.substr(0,10)}</p>
        
                   </div>
        
              
          </div>
          </div>)
            }
            toast=(data)=>{
              
              toast.success('🦄 Updated succesfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
                });
            }
  render() {
    const columns = [{
      title: 'name',
      dataIndex: 'name',
       width: 150,
    }, {
      title: 'email',
      dataIndex: 'email',
       width: 150,
    }, {
      title: 'phone',
      dataIndex: 'phone',
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
    this.props.Offices.map((item,i)=>{

      const menu = (
        <Menu>
          <Menu.Item>
            <a  rel="noopener noreferrer" href="#" onClick={this.editData.bind(this, item)}>Edit</a>
          </Menu.Item>
          <Menu.Item>
    <a href="#">Delete</a>
          </Menu.Item>
          <Menu.Item>
            <a  rel="noopener noreferrer" href="#more">More</a>
          </Menu.Item>
        </Menu>
      );
      tabledata.push({
        
          key: i,
          name: <a className="view" onClick={() => this.viewUser(item)}>{item.name}</a>,
          email: item.email,
         phone:item.phone,
          status:(item.isactive === true
            ? <span className='active'>Active</span>
          : <span className='inactive'>InActive</span>),
          action:<Dropdown overlay={menu} placement="bottomCenter">
          <Icon type="edit" />
        </Dropdown>
          
        });
     
    })
      let data = (this.state.viewUser===false
        ?    <Modal title={this.state.formName} visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel} footer={[null]}>
        {this.state.edit===true
            ?  <OfficeForm  toast = {this.toast} visible={this.state.visible} getOfficeList={this.props.getOfficeList} office={this.props.office} handleOk={this.handleOk} edit={this.state.edit} updateOffice={this.props.updateOffice} />
          :<OfficeForm toast = {this.toast} visible={this.state.visible} office={this.state.office} getOfficeList={this.props.getOfficeList}  addOffice={this.props.addOffice} handleOk={this.handleOk} edit={this.state.edit} />}
 
        </Modal>  
          
        :<Modal title={this.state.formName} visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel} footer={[null]} width={"700px"}>
        {viewData}
        </Modal> 
  )
    return (
      
      <div className="content-wrapper">
        <div className="container-fluid">
          <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Office"/>
          <div className="main-body">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar
  newestOnTop closeOnClick rtl pauseOnVisibilityChange draggable pauseOnHover/>
            <a className="addDoctor nav-link"  onClick={this.addOffice}>

              <i className="fa fa-fw fa-plus"></i>Add Office</a>

            <Table columns={columns} dataSource={tabledata} pagination={{ pageSize: 7 }} scroll={{ y: 275}} size="middle" />

            {data}
 
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state =>{
    console.log(state)
    return {
        Offices : state.office.data,
        office : state.office.office
    }
}
const mapDispatchToProps = dispatch =>{
  
    return {
        getOfficeList :() => dispatch(action.getOfficeList()),
        getOffice: (id) => dispatch(action.getOffice(id)),
        updateOffice :(data) => dispatch(action.updateOffice(data)),
        addOffice:(data)=>dispatch(action.addOffice(data))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Office)
