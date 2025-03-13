import saveditems from "../assets/icons/acct/savedItems.svg"
import subwofer from "../assets/images/subwoofer.jpg";
export default function savedItems() {
  return (
    <>
        <div className="mtg bbot"><h3>Saved Items</h3></div>
                         {/* item found the items output start  */}
                         {/* <div className="container">
                            <div className="flexbox d-flex justify-content-between align-items-center">
                                 <div className="box1 d-flex gap-4">
                                     <img src={subwofer} alt="" />
                                     <div className="box2">
                                        <h5>Portable Bluetooth Speaker - Subwoofer - Long Standby</h5>
                                        <h5 className="mt-3">$1250</h5>
                                        <h6 className="text-muted"><del>$18,000</del> <span className="badge bg-secondary">-30%</span></h6>    
                                     </div>
                                 </div>
                                 <div className="box3">
                                    <button className="btn btn-sm btn-primary">BUY NOW</button>
                                    <button className="rmbtn btn-sm"><i className="me-1 fa fa-trash-o" aria-hidden="true"></i> Remove </button>
                                 </div>
                            </div>
                        </div> */}
                  
                 {/* item found the items output end 
                 item not found the output message start  */}
                 <div className="container">
                     <div className="content">
                        <img src={saveditems} alt="" />
                        <p>You haven't saved an item yet!</p>
                        <p>Found something you like? Tap on the heart shaped icon next to </p>
                        <p>  the item to add it to your wishlist! All your saved items will appear here.</p>
                      <a href="/"><button className="mt-3 btn btn-success rounded-3">CONTINUE SHOPPING</button></a>
                     </div>
                 </div>
                  {/* item not found the output message end  */}
    </>
  )
}
