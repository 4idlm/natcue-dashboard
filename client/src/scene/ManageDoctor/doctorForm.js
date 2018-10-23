import React, { Component } from 'react'
import {Switch,Radio, Checkbox } from 'antd';
import '../../../node_modules/antd/dist/antd.css'
import './doctor.css'
const RadioGroup = Radio.Group;
const CheckboxGroup =Checkbox.Group;


class DoctorForm extends Component {
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
          netfee: null,
          gender: null,
          isactive: false,
          onlycorporate:false,
          location:{ address: '',city:'',pincode:''},
          city: null,
          pincode: null,
          qualification: [null,null],
          service: [],
          isdr:true,
          refpharmacyid:null,
          lang: null,
          // id:null,
        },
          show:false,
          visible:false,
          modalIsOpen: true,
          formName:'',
          edit:false,
          data:[],
          select:null,
          q:null,
          t:null,
        };
        this.baseState = this.state;
        this.handleChange = this.handleChange.bind(this);
        this.onChangeCorporate = this.onChangeCorporate.bind(this);
        this.onChangeselect = this.onChangeselect.bind(this);
       
      }
      onChangeIsActive=(checked)=> {
      this.setState({
          user: {
              ...this.state.user,
              isactive: !this.state.user.isactive
          }
        })
      }
      onChangeCorporate(checked){
        this.setState({
            user: {
                ...this.state.user,
                onlycorporate: !this.state.user.onlycorporate
            }
          })
      }    
  
          handleChange({target}) {
              if(target.name==='qualification'){
                let a = this.state.user.qualification.slice();
                  a[1] = target.value;
                this.setState({user:{
                  ...this.state.user,
                  qualification :a
                }
              });
              }
             else if(target.name==="phone"){
                if(isNaN(target.value)){
                  alert("phone number should be number only")
        
                }
                else{
                  this.setState({user:{
                    ...this.state.user,
                  [target.name]: target.value}
                });          
                }
              }
              else{
            this.setState({user:{
                ...this.state.user,
              [target.name]: target.value}
            });
          }
          }
          handleChangeLocation=({target})=> {
          this.setState({user:{
            ...this.state.user,
            location:{
              ...this.state.user.location,
            [target.name]: target.value}
          }
          });
        }
        
          addData= (e)=> {
              e.preventDefault();
            this.props.addDoctor(this.state.user);
            this.props.handleOk();
            setTimeout(this.props.getDoctorList, 1000);
          }
          updateData= (e)=> {
            e.preventDefault();
           this.props.updateDoctor(this.state.user);
           this.props.handleOk();
           setTimeout(this.props.getDoctorList, 1000);
          
          }
         
          onChangeGender =(e)=>{
            this.setState({
              user: {
                  ...this.state.user,
                  gender: e.target.value
              }
            })
          }
          onChangeService=(e)=>{
            this.setState({
              user: {
                ...this.state.user,
                   service: e
              }
            })
          }
          onChangeLanguage =(e)=>{
            this.setState({
              user: {
                ...this.state.user,
                   lang: e
              }
            })
          }
          componentWillReceiveProps(nextProps) {
            document.getElementById("form").reset();
           if (nextProps.user.location!==undefined) {
              //Forcibly overwrite input value to new default if the default ever changes
              this.setState({user: nextProps.user});
            }
          }
          
          onChangeselect({target}){
            let data = target.value;
            var d = data.split(',')
            let a = this.state.user.qualification.slice();
a[0] = d[1];
this.setState({arr: a});
            this.setState({
              ...this.state,
              user:{
                ...this.state.user,
                qualification:a,
                treatment :d[0]
                
              }
          });
          }
         
  render() {
    let submit =(this.props.edit ===false ? this.addData : this.updateData)
    return (
      <div>
      <form onSubmit={submit} id="form">

<div className="form-row">
  <div className="form-group col-md-6">
    <label>Name *</label>
    <input type="text" className="form-control" id="name" name="name" placeholder="Name" 
    value={this.state.user.name} onChange={this.handleChange} required/>
  </div>
  <div className="form-group col-md-6">
    <label >Mobile number *</label>
    <input type="tel"   minLength ="10" maxLength="10" className="form-control" name="phone" id="phone" placeholder="phone"
     value={this.state.user.phone} onChange={this.handleChange} number required/>
  </div>
</div>
<div className="form-row">
  <div className="form-group col-md-6">
    <label >Email</label>
    <input type="email" className="form-control" name="email" id="email"      placeholder="Email"
      value={this.state.user.email}  onChange={this.handleChange} required/>
  </div>
  <div className="form-group col-md-6">
    <label>Profession started *</label>
    <input type="number" className="form-control" name="professionstarted" id="professionstarted"
      value={this.state.user.professionstarted} onChange={this.handleChange}
      placeholder="Profession year" required/>
  </div>
</div>
<div className="form-row">
  {/* <div className="form-group col-md-6">
    <label>Treatement *</label>
    <input type="text" className="form-control" id="treatment" name="treatment"
      placeholder="Treatement" value={this.state.user.treatment} onChange={this.handleChange}
      required/>
  </div> */}
  <div className="form-group col-md-6">
      <label >Medical System</label>
      <select id="inputState" value={this.state.user.treatment+','+this.state.user.qualification[0]} name="select" className="form-control" onChange={this.onChangeselect} required>
        <option value="">Choose</option>
        <option value="homeopathy,BHMS">Homeopathy,BHMS</option>
        <option value="ayurveda,BAMS">Ayurveda,BAMS</option>
        <option value="sidda,BSMS">Sidda,BSMS</option>


      </select>
    </div>
    <div className="form-group col-md-6">
    <label>Additional Qualification  &nbsp;&nbsp;</label>
    <input type="text" name="qualification" className="form-control"  defaultValue={this.state.user.qualification[1]}
      onChange={this.handleChange} />
      </div>
  
</div>
<div className="form-row">
<div className="form-group col-md-4">
    <label >Fee (consult fee)*</label>
    <input type="number" className="form-control" name="fee" id="fee" placeholder="fee"
      value={this.state.user.fee} onChange={this.handleChange}  required/>
  </div>
  <div className="form-group col-md-4">
    <label >Net Fee(strike out fee)*</label>
    <input type="number" className="form-control" name="netfee" id="netfee" placeholder="Net Fee"
      value={this.state.user.netfee} onChange={this.handleChange}  required/>
  </div>
  
  
  </div>
  <div className="form-row">
  <div className="form-group col-md-12">
    <label >Pharmacy Id *</label>
    <input type="text" className="form-control" name="refpharmacyid" id="refpharmacyid"
      placeholder="pharmacy id" value={this.state.user.refpharmacyid} onChange={this.handleChange}
      required/>
  </div>
  </div>
<div className="form-group">
  <label >Address</label>
  <textarea type="text" name="address" className="form-control" id="inputAddress"
  value={this.state.user.location.address} onChange={this.handleChangeLocation}
    placeholder="Address" required/></div>

<div className="form-row">
  <div className="form-group col-md-6">
    <label >City</label>
    <input type="text" name = "city" className="form-control" id="inputCity" value={this.state.user.location.city}
      onChange={this.handleChangeLocation} required/></div>

  <div className="form-group col-md-3">
    <label>Pincode</label>
    <input type="text" name="pincode" className="form-control" id="inputZip" value={this.state.user.location.pincode}
      onChange={this.handleChangeLocation} required/></div>
</div>
<div className="form-row">
<div className="form-group col-md-4">
    <label >Registraion No *</label>
    <input type="text" className="form-control" name="registrationno" id="fsdee" placeholder="Registration no"
      value={this.state.user.registrationno} onChange={this.handleChange}  required/>
  </div>
  <div className="form-group col-md-4">
    <label >Is Active &nbsp;&nbsp;</label>
    {this.state.user.isactive===true
     ?<Switch name='isactive' checked={true} onChange={this.onChangeIsActive} />
     :<Switch name='isactive' checked={false}  onChange={this.onChangeIsActive} />
}
  </div>

  <div className="form-group col-md-4">
    <label>Only Corporate   &nbsp;&nbsp;</label>
    <Switch name ='onlycorporate' checked={this.state.user.onlycorporate} onChange={this.onChangeCorporate.bind(this,'corporate')} />
  </div>
</div>
<div className="form-row">
  <div className="form-group col-md-6">
  <label>Gender  &nbsp;&nbsp;</label>

   <RadioGroup onChange={this.onChangeGender} value={this.state.user.gender}>
<Radio value="male">Male</Radio>
<Radio value="female">Female</Radio>
</RadioGroup>

</div>
<div className="form-group col-md-6">
<label>Service * &nbsp;&nbsp;</label>
<CheckboxGroup  value={this.state.user.service} options={['audio','video']} onChange={this.onChangeService}/>

</div>
</div>
<div className="form-group">
  <label >Language  &nbsp;&nbsp;</label>
  <CheckboxGroup  value={this.state.user.lang} options={['english','tamil','hindi','malayalam','telungu']} onChange={this.onChangeLanguage}/>

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


export default DoctorForm
