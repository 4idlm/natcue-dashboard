import React, { Component } from 'react'
import { Select,Input,DatePicker,Form,Button,Icon,InputNumber} from 'antd';
 import './Healthform.css'
 import { ADD_TODO } from "../../graphql/query/healthBenefit";
import { Query,Mutation } from "react-apollo";
import { ClimbingBoxLoader } from 'react-spinners';
import gql from "graphql-tag";

const Option = Select.Option;

const FormItem = Form.Item;
const { TextArea } = Input;
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}
// const ADD_TODO = gql`
//   mutation addItem($name: String!,
//     $type: String!) {
//     addItem(name: $name) {
//         name
//     }
//   }
// `;
class HealthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name:'',
      type:'',
      Vitamins:[''],
      VitaminNew:[],
      vitvalue:[''],
      minerals:[''],
      mineralsNew:[],
      minvalue:[''],
      Nutrient:[''],
      NutrientNew:[''],
      nutrivalue:[''],
      healthBenefits:[''],
      edit: true,
      visible: true
    }

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
      <FormItem>
        <Icon type="minus" className="healthform"onClick={this.removeClick.bind(this, i)} />
      </FormItem>
    </div>
</div>
          
    )
 }

 createMinerals(){
  const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
  let mineralValError=[];
  this.state.minerals.map((el,i)=>{
  this["mineralError"+i] = isFieldTouched(`mineral${i}`) && getFieldError(`mineral${i}`);
  mineralValError[i] = isFieldTouched(`mineralVal${i}`) && getFieldError(`mineralVal${i}`);
  });

return this.state.minerals.map((el, i) => 
<div className="form-row col-md-12" key={i}>
    <div className="form-group col-md-1">
      {i+1}.
    </div>
    <div className="form-group col-md-5">
      <FormItem validateStatus={this["mineralError"+i] ? 'error' : ''} help={this["mineralError"+i] || ''}>
        {getFieldDecorator(`mineral${i}`, {
          rules: [{ required: true, message: 'Please select Mineral!' }],
           initialValue :(this.state.mineralsNew[i]==='new' ?this.state.mineralsNew[i]:this.state.minerals[i])
         })(
          <Select required name="mineral" onChange={this.handleChangeMinerals.bind(this, i)} >
            <Option value="">Please select minerlas</Option>
            <Option key="0" value="Potassium">Potassium</Option>
            <Option key="1" value="Phosphorus">Phosphorus</Option>
            <Option key="2" value="Calcium ">Calcium </Option>
            <Option key="3" value="Magnesium">Magnesium</Option>
            <Option key="4" value="Sodium">Sodium</Option>
            <Option value="new">New Mineral</Option>
          </Select>
         )}
      </FormItem>
     {this.state.mineralsNew[i]==="new" ?<Input type="text" placeholder="Enter Mineral" onChange={this.handleChangeMinerals.bind(this, i)} required />
      :console.log('nothing')}
    </div>
    <div className="form-group col-md-3">
      <FormItem validateStatus={mineralValError[i] ? 'error' : ''} help={mineralValError[i] || ''}>
        {getFieldDecorator(`mineralVal${i}`, {
          rules: [{ required: true, message: 'Please Enter Mineral Value!' }],
            initialValue :this.state.minvalue[i]
            })(
          <InputNumber min={0} max={100} onChange={this.handleChangeMineralsVal.bind(this, i)}/>
        )}
      </FormItem>
    </div>
    <div className="form-group col-md-1">
      <Icon type="minus" className="healthform" onClick={this.removeMinerals.bind(this, i)} />
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
   console.log("did mount")
}
addVitamins= async ()=>{
 await this.setState(prevState => ({ Vitamins: [...prevState.Vitamins,'']}))
 this.props.form.validateFields();
}
addMinerals = async ()=>{
 await this.setState(prevState => ({ minerals: [...prevState.minerals,'']}));
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
  removeClick= async (i)=>{
    let Vitamins = [...this.state.Vitamins];
    let vitvalue = [...this.state.vitvalue];
    Vitamins.splice(i,1);
    vitvalue.splice(i,1);
  await this.setState({ Vitamins,vitvalue });
  this.props.form.validateFields();

 }
 handleChangeMinerals(i, event) {

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
removeMinerals = async (i) =>{
  let minerals = [...this.state.minerals];
  let minvalue = [...this.state.minvalue];
  minerals.splice(i,1);
  minvalue.splice(i,1);
  this.setState({ minerals,minvalue });
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
removeNutrient= async (i) =>{
  let Nutrient = [...this.state.Nutrient];
  let nutrivalue = [...this.state.nutrivalue];
  Nutrient.splice(i,1);
  nutrivalue.splice(i,1);
  this.setState({ Nutrient,nutrivalue });
}
handleChangeBenifits(i, event) {
  let healthBenefits = [...this.state.healthBenefits];
  healthBenefits[i] = event.target.value;
  this.setState({ healthBenefits });
}

removeBenefits= async (i) =>{
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
    data['vitamins']=[];
    data['minerals']=[];
    data['nutrientFacts']=[];
    data['isActive']=true;
    data['healthBenefits']=[];
    this.state.vitvalue.map((item,i) =>{
      data['vitamins'].push({name:this.state.Vitamins[i],quantity: item,unit:"mg",imageUrl :"123.jpg"});
     // console.log(item,it)
   })
   this.state.minvalue.map((item,i) =>{
    data['minerals'].push({name:this.state.minerals[i],quantity: item,unit:"mg",imageUrl :"123.jpg"});
   // console.log(item,it)
 });
 this.state.nutrivalue.map((item,i) =>{
  data['nutrientFacts'].push({name:this.state.Nutrient[i],quantity: item,unit:"mg",imageUrl :"123.jpg"});
 // console.log(item,it)
});
this.state.healthBenefits.map((item) =>{
  data['healthBenefits'].push({name:item,imageUrl :"123.jpg"});
 // console.log(item,it)
});
    console.log(data);
let variables=data;

    return {variables};
    
  }

  render() {
    
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    const titleError = isFieldTouched('title') && getFieldError('title');
    const imgUrlError = isFieldTouched('imgUrl') && getFieldError('imgUrl');

let submit =(this.props.edit ===false ? this.addData : this.updateData);

return (
  <div>
  <Mutation mutation={ADD_TODO} >
  {(addItem)=>(
    <Form layout="inline" id="form" onSubmit={e=>{
      e.preventDefault();
      addItem(this.updateData(e))
      }} >
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
        <div className="form-group col-md-2">Vitamins <br/> (per 100g)
        </div>   
        <div className="form-group col-md-1">
            <Icon type="plus" className="healthform" onClick={this.addVitamins.bind(this)} />
        </div>
      </div>
      {this.createVitamins()}
      <div className="form-row">
        <div className="form-group col-md-2">Minerals<br/> (per 100g)
        </div>
        <div className="form-group col-md-1">
          <Icon type="plus" className="healthform" onClick={this.addMinerals.bind(this)} />
        </div>
      </div>
      {this.createMinerals()}

      <div className="form-row">
        <div className="form-group col-md-2">Nutrient Facts <br/> (per 100g) 
        </div>
        <div className="form-group col-md-1">
          <Icon type="plus" className="healthform" onClick={this.addNutrient.bind(this)} />
        </div>
      </div>
      {this.createNutrient()}

      <div className="form-row">
        <div className="form-group col-md-2">Health Benefits 
        </div>
        <div className="form-group col-md-1">
          <Icon type="plus" className="healthform" onClick={this.addBenefits.bind(this)} />
        </div>
      </div>
      {this.createBenefits()}
      <div className="form-group text-right col-md-11">
        <FormItem>
          <Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
            SAVE
          </Button>
       </FormItem>
      </div>

    </Form>
     )
    }   
    </Mutation>
  </div>
    );
  }
}

const Health_Form = Form.create()(HealthForm);

export default Health_Form
