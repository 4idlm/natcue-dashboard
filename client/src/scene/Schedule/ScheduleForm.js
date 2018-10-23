import React, { Component } from 'react'
import { Select,Input,DatePicker,Form,Button} from 'antd';
import moment from 'moment';
import './Schedule.css'
const Option = Select.Option;

const FormItem = Form.Item;
let format = "YYYY-MM-DD";
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class Book extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      schedule: {
        doctornames:[],
        scheduledate:moment(new Date()).add(1, 'day').format("YYYY-MM-DD"),
        officenames:[],
        title:"String"
      },
      edit: true,
      visible: true
    }

  }

  onChange = (date, dateString) => {
    console.log(dateString);
    this.setState({
      schedule: {
        scheduledate: dateString
      }
    })
  }
  addData = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = {};
        data.doctorid = values.doctorid;
        data.title = values.title;
        data.officeid = values.officeid;
        data.scheduledate = this.state.schedule.scheduledate;
        console.log(data)
         this.props.addSchedule(data);
         this.props.form.resetFields();
         setTimeout( this.props.getSchedules, 2000);
      }
    });
  }
  updateData = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let data = {};
        data.id=this.state.id;
        data.doctorid = values.doctorid;
        data.title = values.title;
        data.officeid = values.officeid;
        data.scheduledate = this.state.schedule.scheduledate;
        console.log(data)
         this.props.updateSchedule(data);
         this.props.handleOk();
         this.props.form.resetFields();
         setTimeout( this.props.getSchedules, 2000);
         this.props.form.resetFields();
      }
    });
  }
  componentDidMount() {

    this.props.form.validateFields();


  }
   disabledDate=(current)=> {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.scheduleData.office !==undefined ){
      
      
      this.setState({
      id:nextProps.scheduleData.id})
      }
  }

  render() {
  
    let dr_options = this.props.doctornames.map(item => {
      return (
        <Option key={item._id} value={item.id}><ul className="doctordropwon"><li>{item.name.toUpperCase()}</li><li>{item.treatment}</li></ul></Option>
      )
    })
    let office_options = this.props.officenames.map(item => {
      return (
        <Option key={item._id} value={item.id}>{item.name}</Option>
      )
    })

    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const titleError = isFieldTouched('title') && getFieldError('title');
    const selectError = isFieldTouched('officeid') && getFieldError('officeid');
    const select1Error = isFieldTouched('doctorid') && getFieldError('doctorid');
    const dateError = isFieldTouched('scheduledate') && getFieldError('scheduledate');

let submit =(this.props.edit ===false ? this.addData : this.updateData)

    return (
      
      <div>

        <Form layout="inline" id="form" onSubmit={submit} >


          <div className="form-row col-md-12">
          <div className="form-group col-md-2">
              <FormItem
                validateStatus={titleError ? 'error' : ''}
                help={titleError || ''}
              >
                {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Please input your Title!', whitespace: true }],
            initialValue :this.props.data.title
          })(
            <Input placeholder="Enter Title"/>
          )}
              </FormItem>
            </div>
            <div className="form-group col-md-2">
              <FormItem
                validateStatus={dateError ? 'error' : ''}
                help={dateError || ''}
              >
                {getFieldDecorator('scheduledate', {
                  rules: [{ required: true, message: 'Please Select Date!' }],
                  initialValue :(moment(this.props.data.scheduledate,format))

                })(
                  <DatePicker style={{ width: '100%' }}
                    format={format}
                    disabledDate={this.disabledDate}
                    onChange={this.onChange} />
                )}
              </FormItem>
            </div>
            <div className="form-group col-md-3">
              <FormItem
                validateStatus={selectError ? 'error' : ''}
                help={selectError || ''}

              >
                  {getFieldDecorator('officeid', {
                  rules: [{ required: true, message: 'Please select office!' }],
                  initialValue :this.props.data.officenames

                  

                })(
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select Office">
                    {office_options}
                  </Select>)}
              </FormItem>
            </div>
            <div className="form-group col-md-3">
              <FormItem
                validateStatus={select1Error ? 'error' : ''}
                help={select1Error || ''}
              >
                {getFieldDecorator('doctorid', {
                  rules: [{ required: true, message: 'Please select doctors!' }],
                  initialValue :this.props.data.doctornames
                })(
                  <Select
                    mode="multiple"
                    placeholder="Please select doctors">
                    {dr_options}
                  </Select>)}
              </FormItem>
            </div>

            <div className="form-group col-md-1">
              <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                  SCHEDULE
                </Button>
              </FormItem>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const Schedule = Form.create()(Book);

export default Schedule
