import React, { Component } from 'react'
import { Select,Input,DatePicker,Form,Button,Icon,InputNumber} from 'antd';
 import './Healthform.css'
const Option = Select.Option;

const FormItem = Form.Item;
const { TextArea } = Input;

class NutritionForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      type:'',
      Fruits:[''],
      Vegitables:[''],
      Others:[''],
      minerals:[''],
      mineralsNew:[],
      minvalue:[''],
      Vitamins:[''],
      VitaminNew:[],
      vitvalue:[''],
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
        
  );
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
        
  );
}
createMinerals(){
  return this.state.minerals.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
  {i+1}.
  </div>
<div className="form-group col-md-5">
  
      <Select  placeholder="Please select minerals" required value={this.state.mineralsNew[i]==='new' ?this.state.mineralsNew[i]:this.state.minerals[i]} onChange={this.handleChangeMinerals.bind(this, i)} >
        <Option value="">Please select minerlas</Option>
        <Option key="0" value="Potassium">Potassium</Option>
        <Option key="1" value="Phosphorus">Phosphorus</Option>
        <Option key="2" value="Calcium ">Calcium </Option>
        <Option key="3" value="Magnesium">Magnesium</Option>
        <Option key="4" value="Sodium">Sodium</Option>
        <Option value="new">New Mineral</Option>

    </Select>
    {this.state.mineralsNew[i]==="new" ?<Input type="text" placeholder="Enter Mineral" onChange={this.handleChangeMinerals.bind(this, i)} required />
 :console.log('nothing')}
  </div>
<div className="form-group col-md-3">
  
<InputNumber min={0} max={100} value={this.state.minvalue[i]} required onChange={this.handleChangeMineralsVal.bind(this, i)}/> mg

</div>
<div className="form-group col-md-1">
  <Icon type="minus" className="healthform" onClick={this.removeMinerals.bind(this, i)} />
</div>
</div>
        
  );
}
createVitamins(){
    return this.state.Vitamins.map((el, i) => 
        
        
<div className="form-row col-md-12" key={i}>
    <div className="form-group col-md-1">
    {i+1}.
    </div>
  <div className="form-group col-md-5">
    
        <Select  placeholder="Please select vitamin" required value={this.state.VitaminNew[i]==='new' ?this.state.VitaminNew[i]:this.state.Vitamins[i]} onChange={this.handleChange.bind(this, i)} >
          <Option value="">Please select option</Option>
          <Option  value="a">A</Option>
          <Option  value="b">B</Option>
          <Option  value="c">C</Option>
          <Option  value="d">D</Option>
          <Option value="new">New Vitamin</Option>
      </Select>
{this.state.VitaminNew[i]==="new" ?<Input type="text" placeholder="Enter vitamin" onChange={this.handleChange.bind(this, i)} required />
 :console.log('nothing')}
  </div>
  <div className="form-group col-md-3">
    
  <InputNumber min={0} max={100} value={this.state.vitvalue[i]} required onChange={this.handleChangeVal.bind(this, i)}/> mg

  </div>
  <div className="form-group col-md-1">
    <Icon type="minus" className="healthform"onClick={this.removeClick.bind(this, i)} />
  </div>
  </div>
          
    );
 }
createBenefits(){
  return this.state.healthBenefits.map((el, i) => 
      
      
<div className="form-row col-md-12" key={i}>
  <div className="form-group col-md-1">
  {i+1}.
  </div>
<div className="form-group col-md-10">
  
  
{/* <Input  value={this.state.healthBenefits[i]} required onChange={this.handleChangeBenifits.bind(this, i)}/> */}
<TextArea placeholder="Enter health benifit" required value={this.state.healthBenefits[i]}
 autosize={{ minRows: 2, maxRows: 6 }} onChange={this.handleChangeBenifits.bind(this, i)} />
</div>
<div className="form-group col-md-1">
  <Icon type="minus" className="healthform" onClick={this.removeBenefits.bind(this, i)} />
</div>
</div>
        
  );
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
addMinerals(){
  this.setState(prevState => ({ minerals: [...prevState.minerals,'']}))
}
addVitamins(){
    this.setState(prevState => ({ Vitamins: [...prevState.Vitamins,'']}))
  }
addBenefits(){
  this.setState(prevState => ({ healthBenefits: [...prevState.healthBenefits,'']}))
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
handleChangeMinerals(i, event) {

  // let minerals = [...this.state.minerals];
  // minerals[i] = event;
  // this.setState({ minerals });
  if(event.target){
    let minerals = [...this.state.minerals];
    minerals[i] = event.target.value;
    let mineralsNew = [...this.state.mineralsNew];
    mineralsNew[i] = 'new';
    this.setState({ minerals,mineralsNew });
  }
  else if(event==="new"){
    let mineralsNew = [...this.state.mineralsNew];
    mineralsNew[i] = event;
    this.setState({ mineralsNew });
  }else{
  let minerals = [...this.state.minerals];
  minerals[i] = event;
  let mineralsNew = [...this.state.mineralsNew];
  mineralsNew[i] = '';
  this.setState({ minerals,mineralsNew });
}
}
handleChangeMineralsVal(i, event) {
let minvalue = [...this.state.minvalue];
minvalue[i] =event;
this.setState({ minvalue });
}
removeMinerals(i){
  let minerals = [...this.state.minerals];
  let minvalue = [...this.state.minvalue];
  minerals.splice(i,1);
  minvalue.splice(i,1);
  this.setState({ minerals,minvalue });
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
  removeClick(i){
    let Vitamins = [...this.state.Vitamins];
    let vitvalue = [...this.state.vitvalue];
    Vitamins.splice(i,1);
    vitvalue.splice(i,1);
    this.setState({ Vitamins,vitvalue });
 }
handleChangeBenifits(i, event) {
  let healthBenefits = [...this.state.healthBenefits];
  healthBenefits[i] = event.target.value;
  this.setState({ healthBenefits });
}

removeBenefits(i){
  let healthBenefits = [...this.state.healthBenefits];
  healthBenefits.splice(i,1);
  this.setState({ healthBenefits });
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
    data['minerals']=[];
    data['vitamins']=[];
    data['isActive']=true;
    data['healthBenefits']=this.state.healthBenefits;
    this.state.vitvalue.map((item,i) =>{
      data['vitamins'].push(this.state.Vitamins[i] + (`(${item}mg)`));
     // console.log(item,it)
   })
   this.state.minvalue.map((item,i) =>{
    data['minerals'].push(this.state.minerals[i] + (`(${item}mg)`));
   // console.log(item,it)
 })
//  this.state.nutrivalue.map((item,i) =>{
//   data['nutritions'].push(this.state.Nutrient[i] + (`(${item}mg)`));
//  // console.log(item,it)
// })
    console.log(data)

  }

  render() {
 
let submit =(this.props.edit ===false ? this.addData : this.updateData);

    return (
      
      <div>
        <Form layout="inline" id="form" onSubmit={submit} >


<div className="form-row col-md-12">
  {/* <div className="form-group col-md-6">
      <Select  placeholder="Please select" >
         
         <Option key="0" value="fruit">Fruit</Option>
          <Option key="1" value="vegetable">Vegitable</Option>
          <Option key="2" value="nut">Nut</Option>
          <Option key="3" value="meat">Meat</Option>
      </Select>
  </div> */}
  <div className="form-group col-md-6">
  
   
  <Input placeholder={`Enter ${this.props.type} Name`} name="name" value={this.state.name} required onChange={this.onChangeName} />
 </div>
</div>
<div className="form-row col-md-12">
  <div className="form-group col-md-6">
  <Input placeholder={`Enter Image  url`}  name="imageUrl" value={this.state.imageUrl} required onChange={this.onChangeName} />
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
<div className="form-group col-md-2">Minerals<br/> (per 100g)</div>
<div className="form-group col-md-1">
  <Icon type="plus" className="healthform" onClick={this.addMinerals.bind(this)} />
  </div>
  </div>
  {this.createMinerals()}


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
            // disabled={hasErrors(getFieldsError())}
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

const Nutrition_Form = Form.create()(NutritionForm);

export default Nutrition_Form
