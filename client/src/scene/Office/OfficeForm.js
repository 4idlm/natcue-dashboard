import React, { Component } from 'react'
import {Switch,Radio, Checkbox } from 'antd';
import '../../../node_modules/antd/dist/antd.css'

class OfficeForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            office: {
              name: null,
              phone: null,
              email: null,
              isactive: false,
              location:{ address: '',city:'',pincode:''},
              isoffice:true
            },
        }
        }
      
    onChangeIsActive=(checked)=> {
        this.setState({
            office: {...this.state.office,isactive: !this.state.office.isactive}
                 })
                 console.log(this.state.office)
      }
    handleChange =({target})=> {
      if(target.name==="phone"){
        if(isNaN(target.value)){
          alert("phone number should be number only")

        }
        else{
          this.setState({office:{...this.state.office,[target.name]: target.value}
          });
        }
      }else{
        this.setState({office:{...this.state.office,[target.name]: target.value}
            });
          }
            console.log(this.state.office)
          }

    handleChangeLocation=({target})=> {
          this.setState({office:{...this.state.office,
            location:{...this.state.office.location,
            [target.name]: target.value}
          }
          });
        }
        
    addData= (e)=> {
        e.preventDefault();
          this.props.addOffice(this.state.office);
        this.props.handleOk();
        console.log(this.state.office)
         setTimeout(this.props.getOfficeList, 1000);
          }
          updateData= (e)=> {
            e.preventDefault();
           console.log(this.props)
           console.log(this.state.office)
           this.props.toast();
            this.props.updateOffice(this.state.office);
           this.props.handleOk();
           setTimeout(this.props.getOfficeList, 1000);
          
          }
         
        componentWillReceiveProps(nextProps) {
            document.getElementById("form").reset();
           console.log(nextProps); 
           if (nextProps.office.location!==undefined ) {
             console.log('outside')
              //Forcibly overwrite input value to new default if the default ever changes
              this.setState({office: nextProps.office});
              console.log(nextProps.office);
              console.log(this.state.office)
            }
          }
  render() {
    console.log(this.state.office.location)
    let submit =(this.props.edit ===false ? this.addData : this.updateData)
    return (
      <div>
      <form onSubmit={submit} id="form">

<div className="form-row">
  <div className="form-group col-md-6">
    <label>Name *</label>
    <input type="text" className="form-control" id="name" name="name" placeholder="Name" 
    value={this.state.office.name} onChange={this.handleChange} required/>
  </div>
  <div className="form-group col-md-6">
    <label >Phone *</label>
    <input type="tel" minLength="10" maxLength="10" className="form-control" name="phone" id="phone" placeholder="phone"
     value={this.state.office.phone} onChange={this.handleChange} required/>
  </div>
</div>
<div className="form-row">
  <div className="form-group col-md-6">
    <label >Email</label>
    <input type="email" className="form-control" name="email" id="email"      placeholder="Email"
      value={this.state.office.email}  onChange={this.handleChange} required/>
  </div>
</div>

<div className="form-group">
  <label >Address</label>
  <textarea type="text" name="address" className="form-control" id="inputAddress" value={this.state.office.location.address}
   onChange={this.handleChangeLocation}
    placeholder="Address" required/></div>

<div className="form-row">
  <div className="form-group col-md-6">
    <label >City</label>
    <input type="text" name = "city" className="form-control" id="inputCity" value={this.state.office.location.city}
      onChange={this.handleChangeLocation} required/></div>

  <div className="form-group col-md-3">
    <label>Pincode</label>
    <input type="number" name="pincode" className="form-control" id="inputZip" value={this.state.office.location.pincode}
      onChange={this.handleChangeLocation} required/></div>
</div>
<div className="form-row">

  <div className="form-group col-md-4">
    <label >Is Active &nbsp;&nbsp;</label>
    {this.state.office.isactive===true
     ?<Switch name='isactive' checked={true} onChange={this.onChangeIsActive} />
     :<Switch name='isactive' checked={false}  onChange={this.onChangeIsActive} />
}
  </div>
</div>
<div className="modal-footer">
{this.props.edit ===false
 ? <button type="submit" className="btn btn-primary" >Submit</button>
 :<button type="submit" className="btn btn-primary">Update</button>
}
</div>
</form>
        </div>
   
    )
  }
}


export default OfficeForm
