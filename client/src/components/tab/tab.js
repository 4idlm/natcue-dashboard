import React, { Component } from 'react'
import './tab.css'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import moment from 'moment';
import { isNullOrUndefined } from 'util';
import {connect} from 'react-redux';
import * as action from '../../Store/Action';
 
let today = new Date();  

  
       class Tab extends Component {
        
        constructor(props) {
            console.log(props)
            super(props);
            
            this.state  = {
                  
              selectedDay:moment(today).format("DD/MM/YYYY"),
              
              checked:true,
              mrgtab:true,
              evgtab:true,
              afttab:true,
              data: 
              {
                "morning": [
                    {
                        "time": "08:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "09:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "08:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "08:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "10:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "11:20",
                        "status": true,
                        "appointmentid":""
                    }
                ],
                "afternoon": [
                    {
                        "time": "12:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "12:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "12:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "15:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "13:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "14:40",
                        "status": true,
                        "appointmentid":""
                    }
                ],
                "evening": [
                    {
                        "time": "16:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "16:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "17:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:40",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "20:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "16:20",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "18:00",
                        "status": true,
                        "appointmentid":""
                    },
                    {
                        "time": "19:40",
                        "status": true,
                        "appointmentid":""
                    }
                ]
            }
        
            }

            this.basestate = this.state

            
        }

        
                        
                  
                
        addTime = (t,i,type) =>{

            if(type==="mrg"){
                let a = this.state.data.morning.slice();
                
                a[i]={status: !this.state.data.morning[i].status,
                    time:t.time,
                    date:this.state.selectedDay,
                    appointmentid:""
                    }
                    this.setState({
                      
                        data:{
                            ...this.state.data,
                          morning :a
                         
                        }
                    })

                    
                }
                if(type==="aft"){
                    let b = this.state.data.afternoon.slice();
                    b[i]={status: !this.state.data.afternoon[i].status,
                                  time:t.time,
                                  date:this.state.selectedDay,
                                  appointmentid:""}
                  
                        this.setState({
                           
                            data:{
                                ...this.state.data,
                              afternoon :b
                             
                            }
                        })
    
                        
                    }
                    if(type==="evg"){
                        let c = this.state.data.evening.slice();
                        c[i]={status: !this.state.data.evening[i].status,
                                        time:t.time,
                                      date:this.state.selectedDay,
                                      appointmentid:""}
                      
                            this.setState({
                               
                                data:{
                                    ...this.state.data,
                                  evening :c
                                 
                                }
                            })
        
                            
                        }


                   console.log(this.state.data.morning)
          
       console.log(i)
          console.log(t)
          console.log(t.time)
       
        }

        componentWillReceiveProps(newProps) {    
            console.log(newProps)
            
           console.log(newProps.data)
          
           if(newProps.data.data!==undefined)
           { 
           let mrgtab =false;
            let evgtab =false;
           let afttab=false;
            let checked=false;
            console.log(checked)
 
              newProps.data.data.morning.map(f=>{
                console.log(f.status)
                 if(f.status==true){
                     console.log("inside morning check")
                    checked=true;
                    mrgtab=true;
                   
                    
                 }



              //    f.status = true
            })
            newProps.data.data.afternoon.map(f=>{
                if(f.status==true){
                    console.log("inside aftn check")
                      afttab=true;
                    checked=true;
                 
                 }

               //  f.status = true
            })
            
            newProps.data.data.evening.map(f=>{
                if(f.status==true){
                    console.log("inside evn check")
            console.log(f)
                    checked=true;
                    evgtab =true;
                    
                 }
                // f.status = true
            })
            this.setState({
                
                checked:checked,
                id:newProps.data.id,
                data:newProps.data.data,
                mrgtab:mrgtab,
                evgtab:evgtab,
                afttab:afttab,  
              
            })
        
    }
   console.log(this.state)
  
         }

         bookSlot = async (type)=>{
             if(type==="morning"){
                 console.log('we are used in morh')
                 console.log('786',this.state)
               await this.setState({
                    mrgtab:!this.state.mrgtab,
                   data: 
                    { 
                     ...this.state.data,
                      "morning": [
                          {
                              "time": "08:00",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "09:40",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "09:20",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "11:00",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "09:00",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "10:40",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "08:20",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "10:00",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "11:40",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "08:40",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "10:20",
                              "status": true,
                              "appointmentid":""
                          },
                          {
                              "time": "11:20",
                              "status": true,
                              "appointmentid":""
                          }
                      ]
                    
                  }
                   
                  
                    
                    })
                    console.log(this.state.data)
             }
           if(type==="afternoon"){

            this.setState({
                afttab:!this.state.afttab,
                data:{
                    ...this.state.data,
                    "afternoon": [
                        {
                            "time": "12:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "14:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "12:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "14:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "15:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "13:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "15:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "12:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "13:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "15:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "13:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "14:40",
                            "status": true,
                            "appointmentid":""
                        }
                    ]

                }
                
                })
                console.log(this.state.after)
           }
           if(type=== "evening"){

            this.setState({
                evgtab:!this.state.evgtab,
                data:{
                    ...this.state.data,
                    "evening": [
                        {
                            "time": "16:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "17:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "19:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "17:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "19:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "20:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "16:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "18:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "20:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "17:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "18:40",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "20:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "16:20",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "18:00",
                            "status": true,
                            "appointmentid":""
                        },
                        {
                            "time": "19:40",
                            "status": true,
                            "appointmentid":""
                        }
                    ]
                }
                })
                
                console.log(this.state.evg)
           }
           
             
         }
          
  handleDayChange = (selectedDay, modifiers) => {
     
    let day=moment(selectedDay).format("DD/MM/YYYY");
    console.log(selectedDay,modifiers)
            
                this.setState({
                     
                    selectedDay: moment(selectedDay).format("DD/MM/YYYY"),
                    isDisabled: modifiers.disabled === true,
                     
                  });
                  this.props.data3(this.state.id,day)
     
        console.log(this.state.id)   
      console.log(this.state)
  }

 

send =  ()=>{
    let doctorid = this.state.id;
    let wholedayStatus=false;
    let mrgdata =this.state.data.morning
    
    let aftdata=this.state.data.afternoon;
    let evgdata=this.state.data.evening;
     
    
     let selectedslots;
   
    let Offrange1 ={
        timerange:"1",
        status:false, 
        date:this.state.selectedDay
    }
    let Offrange3 ={
        timerange:"3",
        status:false, 
        date:this.state.selectedDay
    }
    
    let Offrange2 ={
        timerange:"2",
        status:false, 
        date:this.state.selectedDay
    }


    let Onrange1 ={
        timerange:"1",
        status:true, 
        date:this.state.selectedDay
    }
    let Onrange2 ={
        timerange:"2",
        status:true, 
        date:this.state.selectedDay
    }
    let Onrange3 ={
        timerange:"3",
        status:true, 
        date:this.state.selectedDay
    }

     let fulldayon = {
            timerange:"wholeday",
    status:true, 
    date:this.state.selectedDay
        }
        console.log(this.state)
        
           
        if(!this.state.afttab && !this.state.mrgtab){
        console.log("check")
        selectedslots = evgdata.concat(Offrange2).concat(Offrange1).concat(Onrange3);
           
           }
 
            else if(!this.state.afttab && !this.state.evgtab ){
                selectedslots = mrgdata.concat(Offrange2).concat(Offrange3).concat(Onrange1);
         
           }
     
        else if(!this.state.evgtab && !this.state.mrgtab   ){
            selectedslots = aftdata.concat(Offrange1).concat(Offrange3).concat(Onrange2);
         
           }
          
   
             else if(this.state.mrgtab === false){
       
    selectedslots = aftdata.concat(Offrange1).concat(evgdata).concat(Onrange2).concat(Onrange3);
        
    }
   else if(this.state.evgtab === false){
    selectedslots = mrgdata.concat(Offrange3).concat(aftdata).concat(Onrange1).concat(Onrange2);
         
    }
 
  else  if(this.state.afttab === false){
    selectedslots = evgdata.concat(Offrange2).concat(mrgdata).concat(Onrange1).concat(Onrange3);
         
    }
 
 else{
 
     
    selectedslots = mrgdata.concat(aftdata).concat(evgdata);
    
      
    }
    console.log(this.state)
console.log(this.state.mrgtab)
    
    let doctorTimeAvailble = []
    let doctorSlotsAvailable =[]
  
     console.log(selectedslots)
 
   
    if(this.state.checked === false){
        selectedslots = {
            timerange:"wholeday",
    status:false, 
    date:this.state.selectedDay
        }
        doctorSlotsAvailable.push(selectedslots)
    }
   
 
 else   {
 
     if(this.state.checked == true){
     selectedslots.map((_selectedslots,i)=>{
        
         console.log(_selectedslots)
        if(_selectedslots.date===undefined){
            
        }
        
        else if( _selectedslots.time === undefined){
            console.log('spider check this')
           
             
            wholedayStatus=true;
            doctorSlotsAvailable.push({status:_selectedslots.status,timerange:_selectedslots.timerange,date:_selectedslots.date})

    
        
        
   }
 
       else{
          console.log(_selectedslots)
           if(_selectedslots.appointmentid !==undefined && _selectedslots.date !==undefined){
            console.log('weak')
            wholedayStatus=true;
           }
     
            doctorTimeAvailble.push({status:_selectedslots.status,time:_selectedslots.time,date:_selectedslots.date})

    }
    
    })
   
    if(wholedayStatus===false){
 
        doctorSlotsAvailable.push(fulldayon);
    } 
  
}
 
} 
    
console.log(doctorTimeAvailble)

let output = {
    doctorid:doctorid,
   // timing:doctorTimeAvailble,
    timerange:doctorSlotsAvailable,
    time:doctorTimeAvailble
}
 
  this.props.getDoctorAvailableSlots(output)
 
// fetching a data
 
 
console.log(output)
    
}

fullday =()=>{
    console.log(this.basestate)
    if(this.state.checked  == false){
  this.setState({
      
    checked:!this.state.checked,
    mrgtab:true,
              evgtab:true,
              afttab:true,
    data: {
        ...this.state.data,
          "morning": [
              {
                  "time": "08:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "09:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "09:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "11:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "09:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "10:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "08:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "10:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "11:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "08:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "10:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "11:20",
                  "status": true,
                  "appointmentid":""
              }
          ],
          "afternoon": [
              {
                  "time": "12:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "14:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "12:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "14:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "15:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "13:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "15:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "12:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "13:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "15:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "13:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "14:40",
                  "status": true,
                  "appointmentid":""
              }
          ],
          "evening": [
              {
                  "time": "16:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "17:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "19:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "17:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "19:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "20:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "16:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "18:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "20:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "17:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "18:40",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "20:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "16:20",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "18:00",
                  "status": true,
                  "appointmentid":""
              },
              {
                  "time": "19:40",
                  "status": true,
                  "appointmentid":""
              }
          ]
    }

  })
  console.log(this.state.checked)
}
else{
    this.setState({
      
        checked:!this.state.checked,
        mrgtab:false,
              evgtab:false,
              afttab:false,
        

      })

}
}
 

  
       
   
        render(){ 
            console.log(this.state)
             
         const { selectedDay } = this.state;
          
         const { checked,mrgtab,evgtab,afttab } = this.state;
        
        return (
      

            
          <div class="container">
          
          <div className ="row  justify-content-center align-items-center p-t-20">
          <div className="col-md-6 col-xs-6">
          <div  className="text-md-left text-sm-center">
          <label className="pr-2"><dt>Date :</dt></label>  
            <DayPickerInput
              inputProps={{ readonly: 'readonly' }}
              placeholder="YYYY-MM-DD"
              
              value={selectedDay}
              dayPickerProps={{
               
                selectedDays: selectedDay,
                disabledDays: { before: new Date() },
              }}
              onDayChange={this.handleDayChange}
            />
            </div>
            </div>
            <div className="col-md-6 col-xs-6">
            <div  className="text-md-right wholeday text-sm-center">
              <label className="pr-34"  ><dt> Full Day : </dt> </label>
              <label class="switch status" >
  <input type="checkbox" checked={this.state.checked}  onClick={this.fullday}/>
  <span class="slider on-btn"></span>
</label>
              </div>
            </div>
            </div>
 
       <div id=" " style={{ display: (checked ? 'block' : 'none') }}  >
            <ul class="nav nav-tabs flex  pt-2 pb-2 m-20 ">
              <li  ><a data-toggle="tab" class="active show p-10" href="#Morning"><i class="fa fa-lightbulb-o"></i>  Morning </a></li>
      
              <li><a data-toggle="tab" class="p-10" href="#Afternoon"><i class="fa fa-sun-o"></i> Afternoon</a></li>
              <li><a data-toggle="tab" class="p-10" href="#Evening"> <i class="fa fa-moon-o"></i> Evening</a></li>
            </ul>
      
      
            <div class="tab-content text-center border">
            
              <div id="Morning" class="tab-pane fade in active show">
              <div className="row d-flex  justify-content-around align-items-center">
              <label ><dt>  Slots Availability</dt></label>
              <label class="switch status"   >
  <input type="checkbox" checked={this.state.mrgtab} onClick={()=>this.bookSlot("morning")}/>
  <span class="slider on-btn"></span>
</label>
</div>
<div  style={{ display: (mrgtab ? 'block' : 'none') }}>
                <div className="row"> {this.state.data.morning.map((t,index) => (
                  <div className="col-md-2 col-sm-6 col-xs-6 pt-2 pb-2 text-center">
                               
                  {(t.status == true && t.appointmentid == "")?
 <label class="switch">
  <input type="checkbox"  onClick={()=>this.addTime(t,index,"mrg" )}/>
  <span class="sliders avliable-tym" > {t.time}</span>
                  </label>
                 :( t.status == false && t.appointmentid !== "" )
                   ?<label class="switch">
<input type="checkbox"     disabled/>
<span class="sliders test2 avliable-tym" > {t.time}</span>
</label>
:<label class="switch">
<input type="checkbox"  onClick={()=>this.addTime(t,index,"mrg" )}/>
<span class="sliders test avliable-tym" > {t.time}</span>
</label>
  
                  }     
                  </div>
                ))}
                </div>
              </div>
      </div>
              <div id="Afternoon" class="tab-pane fade">
              <div className="row d-flex  justify-content-around align-items-center">
              <label ><dt> Slots Availability</dt></label>
              <label class="switch status"   >
  <input type="checkbox" checked={this.state.afttab} onClick={()=>this.bookSlot("afternoon")}/>
  <span class="slider on-btn"></span>
</label>
</div>
<div   style={{ display: (afttab ? 'block' : 'none') }}>
                <div className="row  "> {this.state.data.afternoon.map((t,index) => (
                  <div className="col-md-2 col-sm-6 col-xs-6 pt-2 pb-2 text-center ">
                 
                 {(t.status == true && t.appointmentid == "")?
                     <label class="switch">
  <input type="checkbox"   onClick={()=>this.addTime(t,index,"aft")}/>
  <span class="sliders avliable-tym" > {t.time}</span>
</label>
              :(t.status == false && t.appointmentid !== "")
             ? <label class="switch">
              <input type="checkbox"     disabled/>
              <span class="sliders test2 avliable-tym" > {t.time}</span>
              </label>
:<label class="switch">
<input type="checkbox"    onClick={()=>this.addTime(t,index,"aft")}/>
<span class="sliders test avliable-tym" > {t.time}</span>
</label>

                  }
                 
                  
                  </div>
                ))}
                </div>
                </div>
              </div>
              <div id="Evening" class="tab-pane fade">
              <div className="row d-flex  justify-content-around align-items-center">
              <label ><dt> Slots Availability</dt></label>
              <label class="switch status"  data-toggle="" data-target="">
  <input type="checkbox" checked={this.state.evgtab} onClick={()=>this.bookSlot("evening")}/>
  <span class="slider on-btn"></span>
</label>
</div>
<div className=" " id=" " style={{ display: (evgtab ? 'block' : 'none') }}>
                <div className="row   "> {this.state.data.evening.map((t,index) => (
                  <div className="col-md-2 col-sm-6  col-xs-6 pt-2 pb-2 text-center ">
                   {(t.status == true && t.appointmentid == "")?
                     <label class="switch">
  <input type="checkbox"    onClick={()=>this.addTime(t,index,"evg")}/>
  <span class="sliders avliable-tym" > {t.time}</span>
</label>
:(t.status == false && t.appointmentid != "")
?<label class="switch">
              <input type="checkbox"     disabled/>
              <span class="sliders test2 avliable-tym" > {t.time}</span>
              </label>
: <label class="switch">
<input type="checkbox"    onClick={()=>this.addTime(t,index,"evg")}/>
<span className="sliders test avliable-tym" > {t.time}</span>
</label>

                  }
                  </div>
                ))}
                </div>
                </div>
              </div>
            </div> 
            </div>
           <div className="row">
            <div className=" col-md-8 text-left text-xs-center pt-4">
            <div className="d-flex justify-content-around justify-content-xs-center">
            <div className="time-slot" ><p><span><i class=" bg-color-red fa  fa-circle"></i></span> BOOKED </p></div>
            <div className="time-slot" ><p><span><i class="bg-color-blue  fa  fa-circle"></i></span> AVAILABLE </p></div>
            <div className="time-slot" ><p><span><i class=" bg-color-grey fa   fa-circle"></i></span> BLOCKED </p></div>
            </div> 
            </div> 
            <div className=" col-md-4 text-right text-xs-center pt-4">
            <button   className="update-btn"  onClick={this.send}>update</button>
            </div>
            </div>
          </div>
      
        )
      }
    }

    const mapStateToProps = state => {
        console.log('specific', state);
        return {
      
         
          time: state.data.avilableTime,
          
      
        }
      }

    const mapDispatchToProps = dispatch => {
        console.log('mapDispatch props')
        return {
        
          getDoctorAvailableSlots:(output)=>dispatch(action.fetchAvilableDate(output))
        }
      }
      export default connect(mapStateToProps, mapDispatchToProps)(Tab)
      
      
     