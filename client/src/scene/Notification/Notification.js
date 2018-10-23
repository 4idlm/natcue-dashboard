import React,{Component} from 'react'
import BreadCrumb from '../../components/breadcrumb/breadcrumb';
import '../../../node_modules/antd/dist/antd.css'
import  './Notification.css'
import { Form, Checkbox, DatePicker } from 'antd';
import moment from 'moment'
import { connect } from 'react-redux';
import * as action from '../../Store/Action';
 

const FormItem = Form.Item;


class notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CreatingField :[],
      Createnotification:{
        title:"",
        message:"",
        appid:null,
        templateid:null,
        schelduedate:moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
        small_icon:null,
        smallselectedFile:null,
        uploadInputFile:null,
        largeselectedFile:null,
        large_icon:null,
        large_icon_data:null

      },
       
     
    }
    this.baseState = this.state 
    

  }

  addingNewFeild = () =>{
    
    this.setState({
     
      CreatingField:[ ...this.state.CreatingField,""]
    })
   // console.log(this.state.CreatingField)
  }

  removeItem = (index)=>{
     let CreatingField =this.state.CreatingField;
    
CreatingField.splice(index,1);
this.setState({CreatingField:[...CreatingField]})
    if( CreatingField.length === 0 ){

      this.setState({
        message:"No Feilds on your list , add some"
      }

      )
    }
    
  }
  largeFileChangedHandler = (event)=>{

    this.setState({
       
      Createnotification:{
        ...this.state.Createnotification,
        largeselectedFile:event.target.files[0],
        large_icon_data:event.target.value
      }
  })
}

uploadLargeFile = (event) =>{
  this.setState({
   
    Createnotification:{
      ...this.state.Createnotification,
      large_icon:event.target.value
    }
   })
  }


  
  smallFileChangedHandler = (event) =>{
//console.log(event)

    this.setState({

Createnotification:{
  ...this.state.Createnotification,
  smallselectedFile:event.target.files[0],
    uploadInputFile:event.target.value
}
    
    })
   // console.log(this.state.selectedFile)
  }

 
  smalluploadFile = (event) =>{
  this.setState({
    Createnotification:{
      ...this.state.Createnotification,
      small_icon:event.target.value,
    }
   })
  }

  dayonChange = (dateString) => {
    //console.log(dateString.format("YYYY-MM-DD HH:mm:ss"))
    //console.log('inside')
    if(dateString === null){
      this.setState({
        ...this.state,
         Createnotification: {
           ...this.state.Createnotification,
           schelduedate: null
   
         }
       })
    }
    else{
      this.setState({
        ...this.state,
         Createnotification: {
           ...this.state.Createnotification,
           schelduedate: dateString.format("YYYY-MM-DD HH:mm:ss [GMT]ZZ")
   
         }
       })
    }
    
  }

  handleChange =   (event) => {
   // console.log("tji")
 //console.log(event.target.value)
      this.setState({
      Createnotification:{
        ...this.state.Createnotification,
        [event.target.name]: event.target.value
      }
     
    });
      
   // console.log(this.state)
  }
 
  addNotification = async (e) =>{
    e.preventDefault();
     // console.log("this is working")
     // console.log(this.state.Createnotification,"output is working")
    await  this.props.addNotification(this.state.Createnotification)
     document.getElementById("form").reset();
     this.props.form.resetFields();
      await this.setState({ Createnotification: this.baseState.Createnotification});
     // console.log(this.state)
     
  // console.log('this will checking')
  }

  extraNotificationData = ()=>{
 
     return this.state.CreatingField.map((r,index)=>
   
    <div   className="form-row    align-items-center">
      
      <p className="col-md-2 field-p text-center">FIELD {index+1} </p>
       
      <div className="form-group col-md-4">
        <input type="text" className="form-control input-sm" id=" " placeholder="Key" name="email"/>
      </div>
      <div className="form-group col-md-4">
      <input type="text" className="form-control input-sm" id=" " placeholder="Value" name="pwd" />
      </div>
      <div className="form-group col-md-2">
      <button  className="btn btn-danger" type="button" onClick={()=>this.removeItem(index)}>Remove</button>
      </div>
      </div>
  
    )
  }
  
  render(){
    //console.log(this.state.selectedFile)
    //console.log(this.state.testing)
    //console.log(this.state.testing1)
    //console.log(this.state.notification)
   
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const dateError = isFieldTouched('scheduledate') && getFieldError('scheduledate');
    const dateErrorend = isFieldTouched('scheduledates') && getFieldError('scheduledates');
    return (
      <div className="content-wrapper">
        <div className="container-fluid">
          <BreadCrumb parentLink="/" parentTitle="Dashboard" leaf="Notification" />
          <div className="main-body container">
          
          <form onSubmit={this.addNotification} id="form">
          <div className="form-row">
    <div className="form-group col-md-6">
      <label >TITLE</label>
      <input type="text" className="form-control" id=" "  placeholder="Title" name="title"  value={this.state.Createnotification.title} onChange={this.handleChange} required />
      <label >APPID</label>
      <select name="appid" className="form-control  "   type="text" value={this.state.Createnotification.appid} onChange={this.handleChange}  required  >
                  <option value=" ">None</option>
                  <option value="FIXED_AMOUNT">FIXED_AMOUNT</option>
                  <option value="DISCOUNT_AMOUNT">DISCOUNT_AMOUNT</option>
                  <option value="PERCENTAGE">PERCENTAGE </option>

                </select>
    </div>
    <div className="form-group col-md-6">
    <label >MESSAGE</label>
      <textarea className="form-control"  rows="4"  id=" " name="message" value={this.state.Createnotification.message} onChange={this.handleChange} required ></textarea>
    </div>
    
    </div>
     

    <div className="form-row ">
 
    <div className="form-group col-md-6">
    
      <label >TEMPLATEID</label>
      <input type="text" className="form-control" id=" " placeholder=" " name="templateid"
       value={this.state.Createnotification.templateid} onChange={this.handleChange}  />
     </div>
      <div className="form-group col-md-6">
      <label >SCHELDUE</label>
      <FormItem
                  validateStatus={dateError ? 'error' : ''}
                  help={dateError || ''}
                >
                  {getFieldDecorator('scheduledate', {
                    rules: [{ required: true, message: 'Please Select Date!' }],
                    // initialValue: (moment(this.state.Createnotification.schelduedate, "YYYY/MM/DD HH:mm:ss [GMT]ZZ"))

                  })
                    (
                    <DatePicker onChange={this.dayonChange}

                      size="large" format={"YYYY-MM-DD HH:mm:ss"} />
                    )}
                </FormItem>
    </div>
   
    </div>
   
    <div className="form-row">
    <div className="form-group d-flex justify-content-center align-items-center col-md-12">
    
    
      <label className="icons-btn" ><span> <i class="fa fa-download"></i></span> Upload File
      <input type="file" className="form-control "  id=" " placeholder="icons"
       onChange={this.smallFileChangedHandler} name="icons" hidden multiple/>
       </label>
      
    
   <input type="text" className="form-control border-top-0  border-left-0 border-right-0  rounded-0" id="iconsvalue" 
       onChange={this.smalluploadFile} name="link" 
       placeholder="Choose a URL Small Icon"  value={this.state.Createnotification.uploadInputFile===null?this.state.Createnotification.small_icon:
       this.state.Createnotification.uploadInputFile }
       required />
        
       </div>
    </div>
    <div className="form-row">
    <div className="form-group d-flex justify-content-center align-items-center col-md-12">
    
    
      <label className="icons-btn" ><span> <i class="fa fa-download"></i></span> Upload File
      <input type="file" className="form-control "  id=" " placeholder="icons"
       onChange={this.largeFileChangedHandler} name="icons" hidden multiple/>
       </label>
       
    
   <input type="text" className="form-control border-top-0  border-left-0 border-right-0  rounded-0" id="iconsvalue" 
       onChange={this.uploadLargeFile} name="link"
       placeholder="Choose a URL Large icon"  value={this.state.Createnotification.large_icon_data===null?this.state.Createnotification.large_icon:
        this.state.Createnotification.large_icon_data } required />
         
       </div>
    </div>
    <div className="pb-4 pt-4 bg-color-gray border">

    <h6  className="container">ADDITIONAL DATA</h6>
    {(this.state.CreatingField.length === 0  )
   ? <p className="text-center  text-dark">{this.state.message}</p>
     : this.extraNotificationData()}
   <div className="container">
    
   <button type="button" onClick={this.addingNewFeild} className=" btn btn-primary btn-md">ADD ANOTHER</button>
   
    </div>
    </div>
<div className="text-right">
    <button type="submit"  className="mb-3 mt-3 btn btn-primary">Submit</button>
    </div>
  </form>
          </div>
        </div>
        </div>
    )
  }
 
}

const mapStateToProps = state => {
 // console.log(state.coupon.coupons)
  return {
    
  }
}

const mapDispatchToProps = dispatch => {

  return {
    
    addNotification: (output) => dispatch(action.addNotification(output)),
     
  }
}


const notification_form = Form.create()(notification);

export default connect(mapStateToProps, mapDispatchToProps)(notification_form)

 