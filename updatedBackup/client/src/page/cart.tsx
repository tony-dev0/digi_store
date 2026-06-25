import emptycart from "../assets/icons/cart_empty.svg";
import LockIcon from "@mui/icons-material/Lock";
import shipping from "../assets/images/img/shipping.png";
import delivery from "../assets/images/img/delivery.png";
import warranty from "../assets/images/img/warranty.png";
import { useSelector, useDispatch } from "react-redux";
import { PaystackButton } from "react-paystack";
import { Topitems } from "../sections/Products";
import {
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
  removeItemFromCart,
} from "../redux/cart/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { cur } from "../currency.js";
import axios from "axios";

export default function Cart() {
  const navigate = useNavigate();
  const publickey = import.meta.env.VITE_PAYSTACK_PUBLISH_KEY;
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector(
    (state: any) => state.cart
  );
  const { currentUser } = useSelector((state: any) => state.user);
  function filterArr(originalArray: Itemtype[]) {
    const newArray = originalArray.map((obj) => {
      const { _id, name, price, photos, quantity } = obj;
      return { _id, name, price, photo: photos[0], quantity };
    });
    return newArray;
  }
  const addOrder = () => {
    const new_order = filterArr(items);
    axios
      .post("api/orders", {
        user_id: currentUser?._id,
        new_order: new_order,
        quantity: totalQuantity,
        amount: totalAmount,
      })
      .then((res: any) => {
        console.log(res.data);
        navigate("/payment-success");
      })
      .catch((error) => window.alert(error?.message));
  };

  const paymentProps = {
    amount: totalAmount * 100,
    email: currentUser?.email,
    publicKey: publickey,
    text: "Checkout " + cur.format(totalAmount),
    onSuccess: (reference: any) => {
      console.log("Payment successful!", reference);
      addOrder();
    },
    onClose: () => {
      navigate("/payment-cancel");
      // Handle the case where the user closes the Paystack Checkout
    },
    metadata: {
      custom_fields: [
        {
          display_name: "First name",
          variable_name: "first_name",
          value: currentUser?.username,
        },
        {
          display_name: "Phone Number",
          variable_name: "phone_number",
          value: currentUser?.phone,
        },
      ],
    },
  };
  return (
    <div>
      <Header />
      <div className="py-3 bg-white">
        {items.length < 1 ? (
          <section className="my-3 py-3 search_result d-flex justify-content-center align-items-center">
            <div className="container text-center">
              <img src={emptycart} alt="" />
              <h4 className="mt-4 mb-2">Your cart is empty!</h4>
              <p>Browse our categories and discover our best deals!</p>
              <Link to="/products">
                <button className="mt-3 btn btn-success rounded-3">
                  START SHOPPING
                </button>
              </Link>
            </div>
          </section>
        ) : (
          <section className="cart my-5 px-3">
            <div className="container">
              <div className="row gap-3">
                <div className="col8 col-lg-8">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4>Cart({totalQuantity})</h4>
                    <button
                      className="rmbtn btn-sm"
                      onClick={() => {
                        dispatch(clearCart());
                      }}
                    >
                      <i className="me-1 fa fa-trash-o" aria-hidden="true"></i>{" "}
                      Clear{" "}
                    </button>
                  </div>
                  {items.map((cartItems: Itemtype, i: any) => {
                    return (
                      <div key={i}>
                        <hr />
                        <div className="cart_details d-flex justify-content-between align-items-center">
                          <div className="cart_details_desc d-flex align-items-center gap-3">
                            <Link
                              to={`/desc/${cartItems._id}`}
                              className="cursor-pointer"
                            >
                              <img
                                className="rounded img-thumbnail"
                                src={cartItems.photos[0]}
                                alt=""
                              />{" "}
                            </Link>
                            <div className="cart_desc">
                              <h6>{cartItems.name}</h6>
                              <small>few units left</small>
                              <small className="text-muted"> Digi store</small>
                            </div>
                          </div>
                          <h3>{cur.format(cartItems.price)}</h3>
                        </div>
                        <div className="mt-2 cart_qty d-flex justify-content-between align-items-center">
                          <button
                            className="rmbtn btn-sm"
                            onClick={() => {
                              dispatch(removeItemFromCart(cartItems._id));
                            }}
                          >
                            <i
                              className="me-1 fa fa-trash-o"
                              aria-hidden="true"
                            ></i>{" "}
                            Remove{" "}
                          </button>
                          <div className="qtyaos d-flex">
                            <button
                              className="qtyadd px-3 py-1"
                              onClick={() => {
                                dispatch(increaseItemQuantity(cartItems._id));
                              }}
                            >
                              <i className="fa fa-plus" aria-hidden="true"></i>
                            </button>
                            <div className="qtyval text-center border-1">
                              {" "}
                              {cartItems.quantity}{" "}
                            </div>
                            <button
                              className="qtysub px-3 py-1"
                              onClick={() => {
                                dispatch(decreaseItemQuantity(cartItems._id));
                              }}
                            >
                              <i className="fa fa-minus" aria-hidden="true"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="col4 col-lg-3">
                  <div className="">Cart Summary</div>
                  <hr />
                  <div className="total d-flex justify-content-between">
                    <h4>Subtotal</h4>
                    <h4>{cur.format(totalAmount)}</h4>
                  </div>
                  <hr />
                  <h4 className="text-center">
                    {currentUser ? (
                      <PaystackButton
                        className="btn btn-success"
                        {...paymentProps}
                      />
                    ) : (
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={() => navigate("/login")}
                        >
                          <LockIcon fontSize="small" /> Checkout(
                          {cur.format(totalAmount)})
                        </button>
                      </div>
                    )}
                  </h4>
                </div>
              </div>
            </div>
          </section>
        )}
        <Topitems />
        <section className="my-5">
          <div className="container">
            <div className="row gx-0">
              <div className="card_box col-lg-4">
                <div className="pr1 d-flex gap-3">
                  <img className="value-icon" src={delivery} alt="delivery" />
                  <div className="value-info">
                    <h4>Fast Delivery</h4>
                    <p>To more than 11 states</p>
                  </div>
                </div>
              </div>
              <div className="card_box col-lg-4">
                <div className="pr1 d-flex gap-3">
                  <img className="value-icon" src={shipping} alt="shipping" />
                  <div className="value-info">
                    <h4>Free Shipping</h4>
                    <p>For orders above 100,000 ₦ (T&C Apply)</p>
                  </div>
                </div>
              </div>
              <div className="card_box col-lg-4">
                <div className="pr1 d-flex gap-3">
                  <img className="value-icon" src={warranty} alt="warranty" />
                  <div className="value-info">
                    <h4>Item Warranty</h4>
                    <p>No worries whatsoever.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
}
