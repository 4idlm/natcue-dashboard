import React from 'react'

const DoctorForm = (props) => { 
    
    <form onSubmit={props.submit}>

<div className="form-row">
  <div className="form-group col-md-6">
    <label>Name *</label>
    <input
      type="text"
      className="form-control"
      id="name"
      name="name"
      placeholder="name"
      defaultValue={props.user.name}
      onChange={props.onChange}
      required/>
  </div>

  <button type="submit" className="btn btn-primary" >Submit</button>
</div>
</form>
      

    return (
        <div>
            {DoctorForm}
        </div>
    )
}

export default DoctorForm 