import React, { Component } from 'react'
import { Select,Input,DatePicker,Form,Button,Icon,InputNumber} from 'antd';
 import './Healthform.css'
const Option = Select.Option;

const FormItem = Form.Item;
const { TextArea } = Input;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
class MineralForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      type:'',
      Fruits:[''],
      Vegitables:[''],
      Others:[''],
      Vitamins:[''],
      VitaminNew:[],
      vitvalue:[''],
      Nutrient:[''],
      NutrientNew:[''],
      nutrivalue:[''],
      healthBenefits:[''],
      edit: true,
      visible: true
    }

  }
  createFruits(){
    return this.state.Fruits.map((el, i) => 
        
        
<div className="form-row col-md-12" key={i}>
    <div className="form-group col-md-1">
    {i+1}.
    </div>
  <div className="form-group col-md-5">


<Input type="text" placeholder="Enter fruit" onChange={this.handleChangeFruit.bind(this, i)} required />

  </div>
  <div className="form-group col-md-1">
    <Icon type="minus" className="healthform"onClick={this.removeClickFruit.bind(this, i)} />
  </div>
  </div>
          
    )
 }
 createVegitables(){
  return this.state.Vegitables.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
  {i+1}.
  </div>
<div className="form-group col-md-5">


<Input type="text" placeholder="Enter Vegitable" onChange={this.handleChangeVegitables.bind(this, i)} required />

</div>
<div className="form-group col-md-1">
  <Icon type="minus" className="healthform"onClick={this.removeClickVegitables.bind(this, i)} />
</div>
</div>
        
  )
}
createOthers(){
  return this.state.Others.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
  {i+1}.
  </div>
<div className="form-group col-md-5">


<Input type="text" placeholder="Enter Other food" onChange={this.handleChangeOthers.bind(this, i)} required />

</div>
<div className="form-group col-md-1">
  <Icon type="minus" className="healthform"onClick={this.removeClickOthers.bind(this, i)} />
</div>
</div>
        
  )
}
createVitamins(){
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  let vitaminError=[];
  let vitaminNewError=[];
  let vitaminValError=[];
  this.state.Vitamins.map((el,i)=>{
  vitaminError[i] = isFieldTouched(`vitamin${i}`) && getFieldError(`vitamin${i}`);
  vitaminNewError[i] = isFieldTouched(`vitaminNew${i}`) && getFieldError(`vitaminNew${i}`);
  vitaminValError[i] = isFieldTouched(`vitaminVal${i}`) && getFieldError(`vitaminVal${i}`);
})
return this.state.Vitamins.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
<div className="form-group col-md-1">
  {i+1}.
</div>
<div className="form-group col-md-5">
<FormItem validateStatus={vitaminError[i] ? 'error' : ''} help={vitaminError[i] || ''}>
  {getFieldDecorator(`vitamin${i}`, {
    rules: [{ required: true, message: 'Please select Vitamin!' }],
    initialValue :(this.state.VitaminNew[i]==='new' ?this.state.VitaminNew[i]:this.state.Vitamins[i])
     })(
      <Select required  onChange={this.handleChange.bind(this, i)} >
        <Option value="">Please select Vitamin</Option>
        <Option  value="a">A</Option>
        <Option  value="b">B</Option>
        <Option  value="c">C</Option>
        <Option  value="d">D</Option>
        <Option value="new">New Vitamin</Option>
    </Select>
  )}
</FormItem>
{this.state.VitaminNew[i]==="new"
?<FormItem validateStatus={vitaminNewError[i] ? 'error' : ''} help={vitaminNewError[i] || ''}>
  {getFieldDecorator(`vitaminNew${i}`, {
    rules: [{ required: true, message: 'Please Enter Vitamin!' }],            
    })(
    <Input type="text" placeholder="Enter vitamin" onChange={this.handleChange.bind(this, i)} required />
  )}
</FormItem>
:console.log('nothing')}
</div>
<div className="form-group col-md-3">
<FormItem validateStatus={vitaminValError[i] ? 'error' : ''} help={vitaminValError[i] || ''}>
  {getFieldDecorator(`vitaminVal${i}`, {
    rules: [{ required: true, message: 'Please Enter Vitamin Value!' }],
      initialValue :this.state.vitvalue[i]
    })(
   <InputNumber min={0} max={100} onChange={this.handleChangeVal.bind(this, i)}/>
  )}
</FormItem>
</div>
<div className="form-group col-md-1">
   <Icon type="minus" className="healthform"onClick={this.removeClick.bind(this, i)} />
</div>
</div>
        
  )
}
 createNutrient(){
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  let nutrientError=[];
  let nutrientValError=[];
  this.state.Nutrient.map((el,i)=>{
    nutrientError[i] = isFieldTouched(`nutrient${i}`) && getFieldError(`nutrient${i}`);
    nutrientValError[i] = isFieldTouched(`nutrientVal${i}`) && getFieldError(`nutrientVal${i}`);

})
  return this.state.Nutrient.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
    {i+1}.
  </div>
  <div className="form-group col-md-5">
    <FormItem validateStatus={nutrientError[i] ? 'error' : ''} help={nutrientError[i] || ''}>
      {getFieldDecorator(`nutrient${i}`, {
        rules: [{ required: true, message: 'Please Select Nutrition!' }],
          initialValue :(this.state.NutrientNew[i]==='new' ?this.state.NutrientNew[i]:this.state.Nutrient[i])
          })(
         <Select  placeholder="Please select minerals" onChange={this.handleChangeNutrient.bind(this, i)} >
           <Option value="">Please select Nutrient</Option>
           <Option value="Energy">Energy</Option>
           <Option value="Fat">Fat</Option>
           <Option value="Protein">Protein</Option>
           <Option value="Carbohydrates">Carbohydrates</Option>
           <Option value="new">New Nutrient</Option>
         </Select>
       )}
    </FormItem>
     {this.state.NutrientNew[i]==="new" ?<Input type="text" placeholder="Enter vitamin" onChange={this.handleChangeNutrient.bind(this, i)} required />
     :console.log('nothing')}
  </div>
  <div className="form-group col-md-3">
    <FormItem validateStatus={nutrientValError[i] ? 'error' : ''} help={nutrientValError[i] || ''}>
      {getFieldDecorator(`nutrientVal${i}`, {
        rules: [{ required: true, message: 'Please Enter Nutrition Value!' }],
          initialValue :this.state.nutrivalue[i]
          })(
        <InputNumber min={0} max={100} onChange={this.handleChangeNutrientVal.bind(this, i)}/>
      )}
    </FormItem>
  </div>
  <div className="form-group col-md-1">
    <Icon type="minus" className="healthform" onClick={this.removeNutrient.bind(this, i)} />
  </div>
</div>

  )

}
createBenefits(){
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  let healthBenefitsError=[];
  this.state.healthBenefits.map((el,i)=>{
    healthBenefitsError[i] = isFieldTouched(`healthBenefits${i}`) && getFieldError(`healthBenefits${i}`);

})
  return this.state.healthBenefits.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
    {i+1}.
  </div>
  <div className="form-group col-md-10">
    <FormItem validateStatus={healthBenefitsError[i] ? 'error' : ''} help={healthBenefitsError[i] || ''}>
      {getFieldDecorator(`healthBenefits${i}`, {
        rules: [{ required: true, message: 'Please Enter health Benifit!' }],
          initialValue :this.state.healthBenefits[i]
        })(
       <TextArea placeholder="Enter health benifit"
        autosize={{ minRows: 2, maxRows: 6 }} onChange={this.handleChangeBenifits.bind(this, i)} />
      )}
    </FormItem>
  </div>
  <div className="form-group col-md-1">
    <Icon type="minus" className="healthform" onClick={this.removeBenefits.bind(this, i)} />
  </div>
</div>   
)
}
componentDidMount(){
   this.props.form.validateFields();
}
addFruits(){
  this.setState(prevState => ({ Fruits: [...prevState.Fruits,'']}))
}
addVegitables(){
  this.setState(prevState => ({ Vegitables: [...prevState.Vegitables,'']}))
}
addOthers(){
  this.setState(prevState => ({ Others: [...prevState.Others,'']}))
}
addVitamins = async ()=>{
   await this.setState(prevState => ({ Vitamins: [...prevState.Vitamins,'']}))
   this.props.form.validateFields();
  }
addNutrient= async ()=>{
  await this.setState(prevState => ({ Nutrient: [...prevState.Nutrient,'']}))
  this.props.form.validateFields();
}
addBenefits= async ()=>{
  await this.setState(prevState => ({ healthBenefits: [...prevState.healthBenefits,'']}))
  this.props.form.validateFields();
}
addData = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleChangeFruit(i, event) {
   
    let Fruits = [...this.state.Fruits];
    Fruits[i] = event.target.value;

    this.setState({ Fruits});
  }

  removeClickFruit(i){
    let Fruits = [...this.state.Fruits];
    Fruits.splice(i,1);
    this.setState({ Fruits});
 }
 handleChangeVegitables(i, event) {
  // console.log(event.target)
  let Vegitables = [...this.state.Vegitables];
  Vegitables[i] =event.target.value;
  this.setState({ Vegitables });
}
removeClickVegitables(i){
  let Vegitables = [...this.state.Vegitables];
  Vegitables.splice(i,1);
  this.setState({ Vegitables});
}
handleChangeOthers(i, event) {
  // console.log(event.target)
  let Others = [...this.state.Others];
  Others[i] =event.target.value;
  this.setState({ Others });
}
removeClickOthers(i){
  let Others = [...this.state.Others];
  Others.splice(i,1);
  this.setState({ Others});
}
handleChange(i, event) {
    // console.log(event.target)
    if(event.target){
      let Vitamins = [...this.state.Vitamins];
      Vitamins[i] = event.target.value;
      let VitaminNew = [...this.state.VitaminNew];
      VitaminNew[i] = 'new';
      this.setState({ Vitamins,VitaminNew });
    }
    else if(event==="new"){
      let VitaminNew = [...this.state.VitaminNew];
      VitaminNew[i] = event;
      this.setState({ VitaminNew });
    }else{
    let Vitamins = [...this.state.Vitamins];
    Vitamins[i] = event;
    let VitaminNew = [...this.state.VitaminNew];
    VitaminNew[i] = '';
    this.setState({ Vitamins,VitaminNew });
  }
 }
 handleChangeVal(i, event) {
  // console.log(event.target)
  let vitvalue = [...this.state.vitvalue];
  vitvalue[i] =event;
  this.setState({ vitvalue });
}
  removeClick = async (i)=>{
    let Vitamins = [...this.state.Vitamins];
    let vitvalue = [...this.state.vitvalue];
    Vitamins.splice(i,1);
    vitvalue.splice(i,1);
    await this.setState({ Vitamins,vitvalue });
    this.props.form.validateFields();
 }
handleChangeNutrient(i, event) {

  if(event.target){
    let Nutrient = [...this.state.Nutrient];
    Nutrient[i] = event.target.value;
    let NutrientNew = [...this.state.NutrientNew];
    NutrientNew[i] = 'new';
    this.setState({ Nutrient,NutrientNew });
  }
  else if(event==="new"){
    let NutrientNew = [...this.state.NutrientNew];
    NutrientNew[i] = event;
    this.setState({ NutrientNew });
  }else{
  let Nutrient = [...this.state.Nutrient];
  Nutrient[i] = event;
  let NutrientNew = [...this.state.NutrientNew];
  NutrientNew[i] = '';
  this.setState({ Nutrient,NutrientNew });
}
}
handleChangeNutrientVal(i, event) {
let nutrivalue = [...this.state.nutrivalue];
nutrivalue[i] =event;
this.setState({ nutrivalue });
}
removeNutrient = async (i)=>{
  let Nutrient = [...this.state.Nutrient];
  let nutrivalue = [...this.state.nutrivalue];
  Nutrient.splice(i,1);
  nutrivalue.splice(i,1);
  await this.setState({ Nutrient,nutrivalue });
  this.props.form.validateFields();
}
handleChangeBenifits(i, event) {
  let healthBenefits = [...this.state.healthBenefits];
  healthBenefits[i] = event.target.value;
  this.setState({ healthBenefits });
}

removeBenefits= async (i)=>{
  let healthBenefits = [...this.state.healthBenefits];
  healthBenefits.splice(i,1);
  await this.setState({ healthBenefits });
  this.props.form.validateFields();
}
onChangeName = (e) =>{
  this.setState({
   [e.target.name]:e.target.value
  })
}
  updateData = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
    console.log(this.state.healthBenefits);
    let data={};
    data['type']=this.props.type;
    data['name']=this.state.name;
    data['imageUrl']=this.state.imageUrl;
    data['Fruits']=this.state.Fruits;
    data['Vegitables']=this.state.Vegitables;
    data['Others']=this.state.Others;
    data['vitamins']=[];
    data['nutritions']=[];
    data['isActive']=true;
    data['healthBenefits']=this.state.healthBenefits;
    this.state.vitvalue.map((item,i) =>{
      data['vitamins'].push(this.state.Vitamins[i] + (`(${item}mg)`));
     // console.log(item,it)
   })
//    this.state.minvalue.map((item,i) =>{
//     data['minerals'].push(this.state.minerals[i] + (`(${item}mg)`));
//    // console.log(item,it)
//  })
 this.state.nutrivalue.map((item,i) =>{
  data['nutritions'].push(this.state.Nutrient[i] + (`(${item}mg)`));
 // console.log(item,it)
})
    console.log(data)

  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const titleError = isFieldTouched('title') && getFieldError('title');
    const imgUrlError = isFieldTouched('imgUrl') && getFieldError('imgUrl');

let submit =(this.props.edit ===false ? this.addData : this.updateData);

    return (
      
      <div>
        <Form layout="inline" id="form" onSubmit={submit} >
        <div className="form-row">
        <div className="form-group">{this.props.type}</div>   
      </div>
      <div className="form-row col-md-12">
        <div className="form-group col-md-6">
          <FormItem validateStatus={titleError ? 'error' : ''} help={titleError || ''}>
            {getFieldDecorator('title', {
              rules: [{ required: true, message: `Please input ${this.props.type} Name`, whitespace: true }],
                initialValue :this.state.name
             })( 
             <Input placeholder={`Enter ${this.props.type} Name`} name="name" onChange={this.onChangeName} />
            )}
          </FormItem>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">{this.props.type} Image url</div>   
      </div>
      <div className="form-row col-md-12">
        <div className="form-group col-md-6">
          <FormItem validateStatus={imgUrlError ? 'error' : ''} help={imgUrlError || ''}>
            {getFieldDecorator('imgUrl', {
              rules: [{ required: true, message: `Please input ${this.props.type} Image Url`, whitespace: true }],
                initialValue :this.state.imageUrl
              })( 
              <Input placeholder={`Enter Image  url`}  name="imageUrl" onChange={this.onChangeName} />
            )}
          </FormItem>
        </div>
      </div>
<div className="form-row">
<div className="form-group col-md-2">Fruits</div>   
  <div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addFruits.bind(this)} />
  </div>
</div>

  {this.createFruits()}
  <div className="form-row">
<div className="form-group col-md-2">Vegitables</div>   
  <div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addVegitables.bind(this)} />
  </div>
</div>

  {this.createVegitables()}
  <div className="form-row">
<div className="form-group col-md-2">Other foods</div>   
  <div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addOthers.bind(this)} />
  </div>
</div>

  {this.createOthers()}
  <div className="form-row">
<div className="form-group col-md-2">Vitamins <br/> (per 100g)</div>   
  <div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addVitamins.bind(this)} />
  </div>
</div>

  {this.createVitamins()}
 <div className="form-row">
  <div className="form-group col-md-2">Nutrient Facts<br/>  (per 100g) </div>
<div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addNutrient.bind(this)} />
  </div>
  </div>
  {this.createNutrient()}

   <div className="form-row">
  <div className="form-group col-md-2">Health Benefits </div>
<div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addBenefits.bind(this)} />
  </div>
  </div>
  {this.createBenefits()}
  <div className="form-group text-right col-md-11">
    <FormItem>
      <Button
        type="primary"
        htmlType="submit"
        disabled={hasErrors(getFieldsError())}
      >
        SAVE
      </Button>
    </FormItem>
  </div>

</Form>
      </div>
    );
  }
}

const Mineral_Form = Form.create()(MineralForm);

export default Mineral_Form
