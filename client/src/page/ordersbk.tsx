import { useState } from "react";
import orders from "../assets/icons/acct/orders.svg";
import watch from "../assets/images/watch.jpg";
import tablet from "../assets/images/sample3.jpg";
export default function Orders() {
  const [active, setActive] = useState(true);
  const [show, setShow] = useState("");
  const [collapse, setCollapse] = useState(" collapsed");
  const handleClick = () => {
     setActive(prev => !prev);
  if (active) {
     setShow(" show");
     setCollapse("");
  }
  else {
     setShow("");
     setCollapse(" collapsed"); 
  }
}
return (
   <>
   <div className="mtg mb-3" style={{borderBottom:"1px solid #dbd0d0"}}><h3>Orders</h3></div>
      <div className="container" style={{height:"432px", overflowY:"auto"}}>
        {/* <div className="content">
         <img src={orders} alt="" />
         <p>You have placed no orders yet!</p>
         <p className="mt-3">All your orders will be saved here for you to access 
            their state anytime.</p>     
         <a href="index.html"><button className="mt-3 btn btn-success rounded-3">CONTINUE SHOPPING</button></a>
         </div> */}
<div className="accordion w-100" id="accordionExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className={"accordion-button"+collapse} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded={active ? "false" : "true"} aria-controls="collapseOne" onClick={handleClick}>
        Accordion Item #1
      </button>
    </h2>
    <div id="collapseOne" className={"accordion-collapse collapse"+show} data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <div className="order-desc mb-3">
          <span>Your order <strong className="text-success">#digi_exp_i18jd88u3d9d998d...</strong> has been shipped and you will recieve it soon</span>
          <p>Order Item Count: 8</p>
          <p>Payment Status: Paid with card</p>
          <p>Order Amount: $8,039</p> 
        </div>
        <div className="order-wrap d-flex gap-3">
          <div className="order-img">
            <img src={watch} alt="" width={100} height={110}/>
          </div>
          <div className="order-content">
            <p><h3>M3 color Smart Watch.</h3></p>
            <div style={{opacity:0.7}}>
              <p>Quantity:  1</p>
              <p>Price: $209</p>
              <p>SubTotal: $209</p>
            </div>
          </div>
        </div>
          <hr />
          <div className="order-wrap d-flex gap-3">
          <div className="order-img">
            <img src={watch} alt="" width={100} height={110}/>
          </div>
          <div className="order-content">
            <p><h3>M3 color Smart Watch.</h3></p>
            <p>Quantity:  1</p>
            <p>Price: $209</p>
            <p>SubTotal: $209</p>
          </div>
        </div>
        <hr />
        <div className="order-wrap d-flex gap-3">
          <div className="order-img">
            <img src={watch} alt="" width={100} height={110}/>
          </div>
          <div className="order-content">
            <p><h3>M3 color Smart Watch.</h3></p>
            <p>Quantity:  1</p>
            <p>Price: $209</p>
            <p>SubTotal: $209</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
        Accordion Item #2
      </button>
    </h2>
    <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
        Accordion Item #3
      </button>
    </h2>
    <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
      <div className="accordion-body">
        <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
  </div>
</div>
   </div>       
   </>
    )
}