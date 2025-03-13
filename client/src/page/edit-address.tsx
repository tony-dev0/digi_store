

export default function EditAddress() {
    return (
      <>
 <div className="mtg bbot d-flex gap-3 g-0"><i className="fa fa-long-arrow-left fa-1_5x"></i><h3>Add a New Address</h3></div> 
                  <div className="row g-3 container">
                     <div className="col-md-6">
                       <label htmlFor="inputEmail4" className="form-label">First Name</label>
                       <input type="text" className="form-control" id="inputEmail4" />
                     </div>
                     <div className="col-md-6">
                       <label htmlFor="inputPassword4" className="form-label">Last Name</label>
                       <input type="text" className="form-control" id="inputPassword4" />
                     </div>
                    <div className="col-md-6 d-flex">
                    <div className="">
                     <label htmlFor="inputState" className="form-label">Prefix</label>
                     <select id="inputState" className="form-select">
                       <option selected>+234</option>
                       <option>...</option>
                     </select>
                   </div>
                     <div className="w-100">
                       <label htmlFor="inputCity" className="form-label">Phone Number</label>
                       <input type="number" className="form-control" id="inputCity" />
                     </div>
                  </div>
                     <div className="col-md-6 d-flex">
                     <div className="">
                        <label htmlFor="inputState" className="form-label">Prefix</label>
                        <select id="inputState" className="form-select">
                          <option selected>+234</option>
                          <option>...</option>
                        </select>
                      </div>
                     <div className="w-100">
                        <label htmlFor="inputCity" className="form-label">Additional Phone Number</label>
                        <input type="text" className="form-control" id="inputCity" />
                      </div >
                     </div>
                     <div className="col-md-12">
                        <label htmlFor="inputAddress" className="form-label">Delivery Address</label>
                        <input type="text" className="form-control" id="inputAddress" placeholder="Enter your Address" />
                      </div>
                      <div className="col-md-12">
                        <label htmlFor="inputAddress2" className="form-label">Additional Information</label>
                        <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">Region</label>
                        <select id="inputState" className="form-select">
                          <option selected disabled>Please select</option>
                          <option>...</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="inputState" className="form-label">City</label>
                        <select id="inputState" className="form-select">
                          <option selected disabled>Please select</option>
                          <option>...</option>
                        </select>
                      </div>
                  </div>    
        <div className="col-md-12 mt-2 mb-5 d-flex justify-content-end" style={{backgroundColor: "#f2f2f2"}}>
         <button type="submit" className="btn btn-primary w-25">Save</button>
       </div>  
      </>
    )
  }