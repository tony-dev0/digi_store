import voucher from "../assets/icons/acct/voucher.svg";

export default function Voucher() {
  return (
    <>
        <div className="mtg bbot"><h3>Voucher</h3></div>
                            {/* item not found the output message start  */}
                           <ul className="nav nav-tabs" id="myTab" role="tablist">
                              <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="voucher_a-tab" data-bs-toggle="tab" data-bs-target="#open" type="button" role="tab" aria-controls="active_voucher" aria-selected="true">ACTIVE</button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button className="nav-link" id="voucher_i-tab" data-bs-toggle="tab" data-bs-target="#close" type="button" role="tab" aria-controls="inactive_voucher" aria-selected="false">INACTIVE</button>
                              </li>
                            </ul>
                            <div className="tab-content" id="myTabContent">
                              <div className="tab-pane fade show active" id="open" role="tabpanel" aria-labelledby="voucher_a-tab">
                                 <div className="content">
                                    <img src={voucher} alt="" />
                                    <p>You currently have no available Voucher</p>
                                    <p className="mt-3">All your available Vouchers will be displayed here</p>     
                                    <a href="index.html"><button className="mt-3 btn btn-success rounded-3">CONTINUE SHOPPING</button></a>
                                 </div>
                              </div>
                              <div className="tab-pane fade" id="close" role="tabpanel" aria-labelledby="voucher_i-tab">
                                 <div className="content">
                                    <img src={voucher} alt="" />
                                    <p>You currently have no available Voucher</p>
                                    <p className="mt-3">All your available Vouchers will be displayed here</p>     
                                    <a href="/"><button className="mt-3 btn btn-success rounded-3">CONTINUE SHOPPING</button></a>
                                 </div>
                              </div>
                            </div> 
                              {/* item not found the output message end  */}
    </>
  )
}
