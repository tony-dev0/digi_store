export default function NewsletterPreference() {
    return (
      <>
        <div className="mtg bbot"><h3>Newsletter Preferences</h3></div>
                        <div className="row" id="row">
                           <div className="col-md-6 mb-4">
                               <div className="acct_box rounded-3">
                                   <div className="head_box bbot p-2">SUSCRIBE TO</div>
                                   <div className="body_box ps-2">
                                    <div className="form-check mt-2">
                                       <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" />
                                       <label className="form-check-label" htmlFor="exampleRadios1">
                                         Daily newsletters for her
                                       </label>
                                     </div>
                                     <div className="form-check mt-2">
                                       <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" />
                                       <label className="form-check-label" htmlFor="exampleRadios2">
                                          Daily newsletters for him
                                       </label>
                                     </div>
                                     <div className="form-check mt-2">
                                       <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios3" value="option3" />
                                       <label className="form-check-label" htmlFor="exampleRadios3">
                                         I don't want to recieve newsletter
                                       </label>
                                     </div>
                                   </div>
                               </div>
                               <button className="mt-3 btn btn-primary w-100">Save</button>
                           </div>
                           <h6 className="text-center mt-3" id="uns"style={{opacity:0.6,cursor:"pointer"}}>UNSUSCRIBE FROM ALL COMMUNICATIONS</h6>
                        </div>
      </>
    )
  }