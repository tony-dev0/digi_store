import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../redux/cart/cartSlice";
import { toast } from 'react-hot-toast';

let usd = Intl.NumberFormat('en-US', {
      style:'currency',
      currency: 'USD'
})

export const Featured = () => {
const {loader, products} = useSelector((state:any)=> state.product);
return (
        <>
  <section className="featured py-5" id="featured">
           <h2 className="mb-3 ms-2">Featured Category</h2>
        <div id="main_row">
           {loader ? "loading" : products.map((product:Itemtype, i:any) => {
              if (product.category == "featured") { 
                 return <div className="wrap" key={i}>
                  <div className="f_item text-center">
                    <img src={require("../assets/"+product.photos[0])} />
                    <h6>{product.name}</h6>
                  </div>
             </div> }})}
        </div>
  </section>      
        </>
      )
    };
export const Topitems = () => {
      const {loader, products} = useSelector((state:any)=> state.product)
    return (
      <>
<section className="top_items">
          <h2 className="mb-3">Top Selling items</h2>
      <div className="list_top_items">
       { loader ? "loading" : products.map((product:Itemtype, i:any) => {
      if (product.category == "top") {
            return <div className="item" key={i}>
                  <img src={require("../assets/"+product.photos[0])} />
                  <div className="b_text">
                        <h5>{usd.format(product.price)}</h5>
                        <del><h6 className="text-muted">{usd.format(product.prevprice)}</h6></del>
                  </div>
            </div> }})}
      </div>
</section>
      </>
    )}
export const Limitedstocks = () => {
      const {loader, products} = useSelector((state:any)=> state.product)
      return (
        <>
<section className="top_items py-5">
      <h2 className="mb-3">Limited Stock Deals</h2>
      <div className="list_top_items">
            { loader ? "loading" : products.map((product:Itemtype, i:any) => {
            if (product.category == "limited"){
                  return <div className="item" key={i}>
                  <img src={require("../assets/"+product.photos[0])} alt=""/>
                  <div className="b_text">
                        <h5>{usd.format(product.price)}</h5>
                        <del><h6 className="text-muted">{usd.format(product.prevprice)}</h6></del>
                        </div>
            </div> }})}
      </div>
</section>
           </>
           )}
export const Maingadget = () => {
      const {loader, products} = useSelector((state:any)=> state.product)
      const dispatch = useDispatch();
      const addItem = (item:Itemtype) => {
            dispatch(addItemToCart({...item,quantity:1}));
            toast.success("item added to cart")
      }
return (
      <>
<section className="top_items py-5" id="product">
      <h2 className="mb-3 ms-2">Mobile/tablet and Laptop</h2>
      <div className="wrapper-container">
            { loader ? "loading" : products.map((product:Itemtype, i:any) => {
            if (product.category == "com"){
                  return <div className="item mtl" key={i}>
                  <a href={`/desc/${product._id}`}>
                  <img src={require("../assets/"+product.photos[0])} alt=""/>
                  <div className="b_text px-3">
                        <h6>{(product.name).length > 40 ? (product.name).slice(0,40)+"..." : product.name}</h6>
                        <h5 className="text-muted">{usd.format(product.price)}</h5>
                        <del><h6 className="text-muted mb-3">{product.prevprice ? usd.format(product.prevprice) : <span>&nbsp;</span>}</h6></del>
                 </div>
                  </a>
                  <div className="pb-3 px-3">
                             <button className="btn btn-primary w-100" 
                             onClick={()=>{addItem(product)}}
                             >
                              ADD TO CART
                              </button>
                        </div>
            </div> }})}
      </div>
</section>
      </>
      )}
