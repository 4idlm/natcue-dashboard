import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../Store/Action';
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import {Modal,Table,Menu, Dropdown, Icon,Tabs} from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import HealthForm from './HealthForm'
import VitaminForm from './VitaminForm'
import MineralForm from './MineralForm'
import NutritionForm from './NutritionForm'
import { ToastContainer, toast } from 'react-toastify';
import { GET_FOOD } from "../../graphql/query/healthBenefit";
import { Query } from "react-apollo";
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const TabPane = Tabs.TabPane;


export class FormButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        visible: false,//modal show hide handle
        };
      }

    handleOk = (e) => {
            console.log(e);
            this.setState({visible: false,edit:false});
          }
    handleCancel = (e) => {
            console.log(e);
            this.setState({visible: false,edit:false});
          }
    addData =() => {
         
       this.setState({
         visible: true
             });
           
             }

  render() {
      let type=this.props.type;
      console.log(type);
    let form =(this.props.type==='Vitamins' 
    ?<VitaminForm type={this.props.type}/>
    :(this.props.type==='Nutritions'
      ?<NutritionForm type={this.props.type}/>
      :(this.props.type==='Minerals'
       ?<MineralForm type={this.props.type}/>
        :<HealthForm type={this.props.type}/>))
  )

    return (
<div>
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar
  newestOnTop closeOnClick rtl pauseOnVisibilityChange draggable pauseOnHover/>
           <a className="addDoctor nav-link"  onClick={this.addData}>

<i className="fa fa-fw fa-plus"></i>Add {type}</a>
          
           <Modal title={"Add" +" "+ type} visible={this.state.visible}
        onOk={this.handleOk} onCancel={this.handleCancel} footer={[null]} width={"700px"}>
      
      {form}
        </Modal>
    </div>
    )
  }
}

const mapStateToProps = state =>{
    console.log(state)
    return {
       
    }
}
const mapDispatchToProps = dispatch =>{
  
    return {
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FormButton)
