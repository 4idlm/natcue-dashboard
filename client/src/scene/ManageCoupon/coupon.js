import React, { Component } from 'react';
import BreadCrumb from '../../components/breadcrumb/breadcrumb'
import { Modal, Table, Menu, Button, Dropdown, Icon } from 'antd';
import '../../../node_modules/antd/dist/antd.css';
import CouponForm from './couponForm'
import { connect } from 'react-redux';
import * as action from '../../Store/Action';

 
class managecoupons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      editData: false

    }

  }

  componentDidMount() {
    console.log(`cdm`)
    this.props.getCoupon()//get all coupon list
  }


  addOffice = () => {
    this.setState({
      visible: true,
      editData: false,
      formData: [],
      
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  editData = (obj) => {
    this.setState({
      editData: true,
      visible: true,
      formData: obj
    })

  }


  render() {
    const columns = [{
      title: 'Coupon Code',
      dataIndex: 'Coupon',
      width: 100,

    },
    {
      title: 'Title',
      dataIndex: 'Title',
      width: 150,
    },
    {
      title: 'Description',
      dataIndex: 'Description',
      width: 150,
    }, {
      title: 'Discount',
      dataIndex: 'Discount',
      width: 100
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      width: 100
    },

    {
      title: 'Action',
      dataIndex: 'Action',
      width: 100
    }];



    console.log(this.props.coupon, 'rendering the page og tje')

    let tabledata = [];


    this.props.coupon.map((item, i) => {

      const menu = (
        <Menu>
          <Menu.Item>
            <a rel="noopener noreferrer" href="#" onClick={this.editData.bind(this, item)}>Edit</a>
          </Menu.Item>
          <Menu.Item>
            <a href="#">Delete</a>
          </Menu.Item>
          <Menu.Item>
            <a rel="noopener noreferrer" href="#more">More</a>
          </Menu.Item>
        </Menu>
      );
      if (item.amount === undefined) {

        tabledata.push({

          key: i,
          Coupon: item.id,
          Description: item.desc,
          Discount: '-',
          Status: item.status,
          Title: item.title,
          Action: <Dropdown overlay={menu} placement="bottomCenter">
            <Icon type="edit" />
          </Dropdown>

        });
        console.log('inside')
      }

      else {

        tabledata.push({
           key: i,
          Coupon: item.id,
          Description: item.desc,
          Discount: item.amount,
          Status: item.status,
          Title: item.title,
          Action: <Dropdown overlay={menu} placement="bottomCenter">
            <Icon type="edit" />
          </Dropdown>

        });

        console.log('outside')

      }

      console.log(tabledata, 'passing data')
      console.log(item)
    })
    console.log(this.state);
    return (

      <div className="content-wrapper">
        <div className="container-fluid">
          <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Office" />
          <div className="main-body">

            <a className="addDoctor nav-link mb-4" onClick={this.addOffice}>

              <i className="fa fa-fw fa-plus"></i>CREATE COUPON</a>


            <Table  columns={columns} dataSource={tabledata} pagination={{ pageSize: 10 }} scroll={{ y: 310}} size="middle" />


          </div>
        </div>

        {this.state.editData === true
          ?
          <Modal
            title="Coupon Details"
            width="620px"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel} >

            <CouponForm update={this.props.updateCoupon} refechData={this.props.getCoupon} edit={this.state.editData} close={this.handleOk} formData={this.state.formData} />
          </Modal>
          : <Modal
            title="Create Coupon"
            width="620px"
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel} >

            <CouponForm  edit={this.state.editData} close={this.handleOk} formData={this.state.formData} addcoupon={this.props.addCoupon} />
          </Modal>
        }
      </div>
    )

  }


}

const mapStateToProps = state => {
  console.log(state.coupon.coupons)
  return {
    coupon: state.coupon.coupons
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getCoupon: () => dispatch(action.getCoupon()),
    addCoupon: (output) => dispatch(action.addCoupon(output)),
    updateCoupon: (id) => dispatch(action.updateCoupon(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(managecoupons)


