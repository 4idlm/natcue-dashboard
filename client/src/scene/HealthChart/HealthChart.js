import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as action from '../../Store/Action';
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import {Icon,Tabs,Button} from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import FormButton from './FormButton'
import { GET_FRUIT,GET_VITAMIN } from "../../graphql/query/healthBenefit";
import { Query } from "react-apollo";
import '../../../node_modules/react-toastify/dist/ReactToastify.css';

const TabPane = Tabs.TabPane;


export class HealthChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
        type:'Fruit',
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
             changeType(e){
              this.setState({type:e})
                  }
   viewFruits = (obj) =>{
     console.log(obj);
   }
  render() {
    let name = "apple";
    let fruit = (
      <Query query={GET_FRUIT}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          console.log(data);
          return data.getFruits.map((fruits,i) => (
          <div className="listFruits" key={i}><Button type="primary" onClick={()=>this.viewFruits(fruits)}>{fruits.name}</Button><br/></div>
          ));
        }}
      </Query>    
    );
    let vitamin = (
      <Query query={GET_VITAMIN}>
        {({ loading, error, data }) => {
          if (loading) return null;
          if (error) return `Error!: ${error}`;
          console.log(data);
          return data.vitamin
           {/* data.vitamins.map((fruits,i) => (
   
          <div  key={i}> <Button type="primary" onClick={()=>this.viewFruits(fruits)}>{fruits.name}</Button><br/></div>
          )); */}
        }}
      </Query>    
    );
    return (
      
      <div className="content-wrapper">
        <div className="container-fluid">
          <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="HealthChart"/>
          <div className="main-body">

        <FormButton type={this.state.type} />
  <Tabs defaultActiveKey="1" className="HealthtipsTap">
    <TabPane tab={<div onClick={this.changeType.bind(this,'Fruit')}><Icon type="apple" />Fruits</div>} key="1" >
      <ul>{fruit}</ul>
    </TabPane>
    <TabPane tab={<div onClick={this.changeType.bind(this,'Vegitable')}><Icon type="android" />Vegitables</div>} key="2" >
      Tab 2
    </TabPane>
    <TabPane tab={<div onClick={this.changeType.bind(this,'Others')}><Icon type="android" />Others</div>} key="3" >
      Tab 3
    </TabPane>
    <TabPane tab={<div onClick={this.changeType.bind(this,'Vitamins')}><Icon type="android" />Vitamins</div>} key="4" >
      {vitamin}
    </TabPane>
    <TabPane tab={<div onClick={this.changeType.bind(this,'Nutritions')}><Icon type="android" />Nutritions</div>} key="5" >
      Tab 5
    </TabPane>
    <TabPane tab={<div onClick={this.changeType.bind(this,'Minerals')}><Icon type="android" />Minerals</div>} key="6" >
      Tab 6
    </TabPane>

  </Tabs>
 
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthChart)
