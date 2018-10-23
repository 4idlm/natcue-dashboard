import React, { Component } from 'react'
import { Form, Checkbox, DatePicker } from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import moment from 'moment'
import './coupon.css'
 
const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;

const planConstraintfeilds = ['coupon', 'subscription ', 'consultation'];
const applyonFeilds = ['consultation', 'shipping', 'medicine', 'followup'];


class CouponForm extends Component {

  constructor(props) {
    super(props);
    this.state = {
      coupon: {
        id: null,
        title: null,
        desc: "",
        discountType: null,
        amount: 0,
        durationType: null,
        durationDays: null,
        maxRedemptions: null,
        status: null,
        objectType: null,
        promoTextSpecific: [],
        planConstraint: [],
        applyOn: [],
        startISTFrom: moment(new Date()).format("YYYY-MM-DD"),
        endISTTo: moment(new Date()).add(1, 'day').format("YYYY-MM-DD")

      }
    },
      this.baseState = this.state
  }





  handleChange = (event) => {

    if (event.target.name === "amount") {
      var numbers = /^[0-9\s]*$/

      if (event.target.value.match(numbers)) {
        console.log('jump to state')

        this.setState({
          coupon: {
            ...this.state.coupon,
            [event.target.name]: event.target.value
          }
        })
      }
    }
    else {
      // console.log('we are going inside the div')
      this.setState({
        coupon: {
          ...this.state.coupon,
          [event.target.name]: event.target.value
        }

      })
    }
    // console.log(event.target)
  }

  onChangeService = (planConstraint) => {
    this.setState({

      coupon: {
        ...this.state.coupon,
        planConstraint
      }

    })

  }
  onChangeApplyOn = (applyOn) => {
    this.setState({
      coupon: {
        ...this.state.coupon,
        applyOn

      }

    })

  }
  dayonChange = (dateString) => {
    console.log('inside')
    this.setState({
      ...this.state,
      coupon: {
        ...this.state.coupon,
        startISTFrom: dateString

      }
    })
  }
  dayonChangeExpire = (dateString) => {
    console.log('outside')
    this.setState({
      coupon: {
        ...this.state.coupon,
        endISTTo: dateString

      }
    })

  }

  addData = async (e) => {
    e.preventDefault();
    this.props.addcoupon(this.state.coupon);
    this.props.form.resetFields();
    this.props.close();
   
  }
  updateData = async (e) => {
    e.preventDefault();
    await this.props.update(this.state.coupon);
    await this.props.refechData()
    this.props.form.resetFields();
    this.props.close();
     
  }


  componentWillReceiveProps(props) {
     
    if (props.formData.id) {
      this.setState({ coupon: props.formData });
    }
    // else if (props.form) {
    //   console.log("dontreset")
    // }

    else {
  this.setState({ coupon: this.baseState.coupon });
      document.getElementById("form").reset();

    }
  }
  render() {
     console.log(this.state)
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    let submit = (this.props.edit === false ? this.addData : this.updateData)
    const dateError = isFieldTouched('scheduledate') && getFieldError('scheduledate');
    const dateErrorend = isFieldTouched('scheduledates') && getFieldError('scheduledates');
    return (
      <div>

        <div>
          <form onSubmit={submit} id="form">

            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Coupon Code *</label>
                {this.props.edit === false
                  ? <input type="text" className="form-control" id="name" name="id" placeholder=" " value={this.state.coupon.id}
                    onChange={this.handleChange} required />
                  : <input type="text" className="form-control" id="name" name="id" placeholder=" " value={this.state.coupon.id}
                    onChange={this.handleChange} readOnly />
                }

              </div>
              <div className="form-group col-md-6">
                <label >Title *</label>
                <input type="text" className="form-control" name="title" id="phone" placeholder=" "
                  onChange={this.handleChange} value={this.state.coupon.title} required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-5">
                <label >Discount Type</label>
                <select name="discountType" className="form-control" value={this.state.coupon.discountType} onChange={this.handleChange} required>
                  <option value=" ">None</option>
                  <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                  <option value="DISCOUNT_AMOUNT">DISCOUNT_AMOUNT</option>
                  <option value="PERCENTAGE">PERCENTAGE </option>

                </select>
              </div>
              <div className="form-group col-md-5">
                <label >Duration Type</label>

                <select name="durationType" className="form-control" value={this.state.coupon.durationType} onChange={this.handleChange} required>
                  <option value=" ">None</option>
                  <option value="ONE_TIME">ONE_TIME</option>
                  <option value="FOREVER">FOREVER</option>
                  <option value="LIMITED_PERIOD">LIMITED_PERIOD </option>
                  <option value="SPECIFIC_USERS">SPECIFIC_USERS </option>
                </select>
              </div>
              <div className="form-group col-md-2">
                {
                  this.state.coupon.discountType === "PERCENTAGE"
                    ? <label >Percentage</label>
                    : <label >Amount</label>
                }

                <input type="text" className="form-control" name="amount" id=" " placeholder=" "
                  onChange={this.handleChange} value={this.state.coupon.amount} required />
              </div>

            </div>
            <div className="form-row">
              <div className="form-group col-md-12">
                <label >Description</label>
                <textarea type="text" className="form-control" rows="3" id=" " name="desc"
                  onChange={this.handleChange} value={this.state.coupon.desc} required></textarea>

              </div>
            </div>





            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Duration Days</label>
                <input placeholder="" min="0" type="number"
                  class="form-control" value={this.state.coupon.durationDays} name="durationDays" onChange={this.handleChange} required />
              </div>

              <div className="form-group col-md-4">
                <label>Object Type</label>
                <input placeholder="" type="text" id="objectchar" name="objectType" value={this.state.coupon.objectType}
                  class="form-control" onChange={this.handleChange} pattern="[A-Za-z\s]+" required />
              </div>

              <div className="form-group col-md-4">
                <label>Staus</label>

                <select name="status" value={this.state.coupon.status} className="form-control" onChange={this.handleChange} required>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="EXPIRED">EXPIRED</option>
                  <option value="ARCHIVED">ARCHIVED </option>
                  <option value="DELETED">DELETED  </option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-4">
                <label>Max Redemptions</label>
                <input type="number" min="0" value={this.state.coupon.maxRedemptions} pattern="[0-9\s]*"
                  placeholder="" name="maxRedemptions" class="form-control" onChange={this.handleChange} required />
              </div>

              <div className="form-group col-md-4">
                <label >Created  </label>
                <FormItem
                  validateStatus={dateError ? 'error' : ''}
                  help={dateError || ''}
                >
                  {getFieldDecorator('scheduledate', {
                    rules: [{ required: true, message: 'Please Select Date!' }],
                    initialValue: (moment(this.state.coupon.startISTFrom, "YYYY/MM/DD"))

                  })
                    (
                    <DatePicker onChange={this.dayonChange}

                      size="large" format={"YYYY-MM-DD"} />
                    )}
                </FormItem>
              </div>
              <div className="form-group col-md-4">
                <label >Expired </label>
                <FormItem
                  validateStatus={dateErrorend ? 'error' : ''}
                  help={dateErrorend || ''}
                >
                  {getFieldDecorator('scheduledates', {
                    rules: [{ required: true, message: 'Please Select Date!' }],
                    initialValue: (moment(this.state.coupon.endISTTo, "YYYY/MM/DD"))

                  })
                    (
                    <DatePicker onChange={this.dayonChangeExpire}

                      size="large" format={"YYYY-MM-DD"} />
                    )}
                </FormItem>

              </div>

            </div>
            <div className="form-row align-items-center">
              <label className="col-md-3">Plan Constraint</label>
              <CheckboxGroup
                options={planConstraintfeilds} value={this.state.coupon.planConstraint} onChange={this.onChangeService} />

            </div>

            <div className="form-row align-items-center">
              <label className="col-md-3">Apply On </label>
              <CheckboxGroup
                options={applyonFeilds} value={this.state.coupon.applyOn} onChange={this.onChangeApplyOn} />

            </div>
            <div className="modal-footer">
              {this.props.edit === false
                ? <button type="submit" className="btn btn-primary" >Add Coupon</button>
                : <button type="submit" className="btn btn-primary" >Update Coupon</button>
              }
            </div>

          </form>
        </div>

      </div>
    )
  }
}


const CouponFormSchedule = Form.create()(CouponForm);

export default CouponFormSchedule

