import React from "react";
import { _Navbar } from "../components/Nav";
import Carousel from "react-bootstrap/Carousel";
import visa from "../assets/icons/visa.svg";
import mcard from "../assets/icons/mastercard.svg";
import verve from "../assets/icons/verve.svg";
import ad1 from "../assets/images/advert/2.jpg";
import ad2 from "../assets/images/advert/117.jpg";
import ad3 from "../assets/images/advert/26.png";
import ad4 from "../assets/images/advert/47.jpg";
import ad5 from "../assets/images/advert/120.jpg";
import ad6 from "../assets/images/advert/112.png";
import shipping from "../assets/images/img/shipping.png";
import delivery from "../assets/images/img/delivery.png";
import warranty from "../assets/images/img/warranty.png";
import { toast } from "react-hot-toast";
import { Topitems } from "../sections/Products";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { updateItemQuantity, addItemToCart } from "../redux/cart/cartSlice";
import { Header } from "../sections/Header";
import { Footer } from "../sections/Footer";
import { cur } from "../currency.js";

export default function Desc() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loader, products } = useSelector((state: any) => state.product);
  const { items } = useSelector((state: any) => state.cart);
  const params = useParams();
  const [active, setActive] = useState(0);
  const specifiedProduct = products.find(
    (product: { _id: any }) => product._id === params.id
  );
  const cartItems: any = items.find(
    (item: { _id: any }) => item._id === params.id
  );
  const unit = specifiedProduct.available;
  const [inputValue, setinputValue] = useState(cartItems?.quantity);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent | any) => {
    e.preventDefault();
    if (e.nativeEvent.submitter.name == "cartbtn") {
      const quantity = Number(inputValue);
      if (quantity < unit && quantity > 0) {
        dispatch(
          updateItemQuantity({ ...specifiedProduct, quantity: quantity })
        );
        toast.success(`${quantity} items added to cart`);
      } else {
        toast.error("input a correct value");
      }
    }
    if (e.nativeEvent.submitter.name == "buybtn") {
      if (inputValue === undefined || inputValue < 1) {
        dispatch(addItemToCart({ ...specifiedProduct, quantity: 1 }));
        navigate("/cart");
      } else {
        navigate("/cart");
      }
    }
  };

  const increaseItem = () => {
    inputValue === undefined ? setinputValue(1) : inputValue;
    let val = Number(inputValue);
    if (Number.isInteger(val) && val < unit) {
      const value = String(val + 1);
      setinputValue(value);
    }
  };

  const decreaseItem = () => {
    inputValue === undefined ? setinputValue(0) : inputValue;
    let val = Number(inputValue);
    if (Number.isInteger(val) && val >= 1) {
      const value = String(val - 1);
      setinputValue(value);
    }
  };

  return (
    <>
      <Header />
      <section className="item_desc py-4 bg-white">
        <div className="container">
          <div className="row">
            {loader ? (
              "loading"
            ) : (
              <>
                <div className="img-content col-lg-4 py-3">
                  <i
                    className="fa fa-arrow-circle-left fa-2x"
                    aria-hidden="true"
                  ></i>
                  <img
                    className="img-front"
                    src={specifiedProduct.photos[active]}
                    alt=""
                    width=""
                  />
                  <i
                    className="fa fa-arrow-circle-right fa-2x"
                    aria-hidden="true"
                  ></i>
                  <div className="img-slider p-1">
                    <img
                      className={active == 0 ? "img-fluid active" : "img-fluid"}
                      src={specifiedProduct.photos[0]}
                      alt=""
                      width="55"
                      onClick={() => setActive(0)}
                    />
                    <img
                      className={active == 1 ? "img-fluid active" : "img-fluid"}
                      src={specifiedProduct.photos[1]}
                      alt=""
                      width="55"
                      onClick={() => setActive(1)}
                    />
                    <img
                      className={active == 2 ? "img-fluid active" : "img-fluid"}
                      src={specifiedProduct.photos[2]}
                      alt=""
                      width="55"
                      onClick={() => setActive(2)}
                    />
                    <img
                      className={active == 3 ? "img-fluid active" : "img-fluid"}
                      src={specifiedProduct.photos[3]}
                      alt=""
                      width="55"
                      onClick={() => setActive(3)}
                    />
                  </div>
                </div>
                <div className="col-lg-4 py-3">
                  <h2>{specifiedProduct.name}</h2>
                  <small>Market: Digi Store | units left: {unit}</small>
                  <div
                    id="star"
                    className="d-flex justify-content-start align-items-center g-3 my-3"
                  >
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star"></i>
                    <i className="fa fa-star-half-o"></i>
                  </div>
                  <h6>Description</h6>
                  <hr style={{ opacity: 0.7 }} />
                  <p>{specifiedProduct.description}</p>
                </div>
                <div className="col-lg-4 box py-3">
                  <form onSubmit={handleSubmit}>
                    <h4>Availability: In Stock</h4> <br />
                    <h4>Price : {cur.format(specifiedProduct.price)}</h4> <br />
                    <div className="d-flex align-items-center gap-3">
                      <h4 className="mt-1">Quantity : </h4>
                      <div className="qtyaos d-flex">
                        <button
                          onClick={increaseItem}
                          className="qtyadd px-3 py-1"
                        >
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                        <div className="qtyval d-flex justify-content-end align-items-center border-1">
                          {" "}
                          <input
                            style={{ width: "65px" }}
                            className="px-3 py-1"
                            name="quantity"
                            min={0}
                            max={unit}
                            maxLength={2}
                            type="number"
                            placeholder={
                              cartItems === undefined ? "0" : cartItems.quantity
                            }
                            value={inputValue}
                            onChange={handleInputChange}
                          />{" "}
                        </div>
                      </div>
                      <button
                        onClick={decreaseItem}
                        className="qtysub px-3 py-1"
                      >
                        <i className="fa fa-minus" aria-hidden="true"></i>
                      </button>
                    </div>
                    <br />
                    <h4>
                      Total:{" "}
                      {inputValue === undefined
                        ? 0
                        : cur.format(inputValue * specifiedProduct.price)}
                    </h4>
                    <br />
                    <div className="button px-5">
                      <button
                        type="submit"
                        name="cartbtn"
                        className="btn btn-lg btn-success rounded-3 w-100 mb-3"
                      >
                        <i className="fa fa-cart-plus"></i> Add to cart
                      </button>
                      <button
                        type="submit"
                        name="buybtn"
                        className="btn btn-lg btn-secondary rounded-3 w-100 mb-3"
                      >
                        Buy it now
                      </button>
                    </div>
                  </form>
                  <h5 className="text-muted text-center mb-2">
                    Pay on Delivery or Use
                  </h5>
                  <div className="pcard d-flex justify-content-center align-items-center">
                    <img src={visa} alt="" width="60" height="40" />
                    <img src={mcard} alt="" width="60" height="40" />
                    <img src={verve} alt="" width="60" height="40" />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <section className="py-3 bg-white">
        <div className="container pb-3">
          <div className="row gx-0 px-5">
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
          {/* Carousel for advert */}
          <div className="my-5">
            <Carousel>
              <Carousel.Item interval={3000}>
                <div className="container position-relative">
                  <img className="ad" src={ad1} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    {" "}
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>{" "}
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="container position-relative">
                  <img className="ad" src={ad2} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="container position-relative">
                  <img className="ad" src={ad3} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    {" "}
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>{" "}
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="container position-relative">
                  <img className="ad" src={ad4} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={3000}>
                <div className="container position-relative">
                  <img className="ad" src={ad5} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    {" "}
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>{" "}
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item interval={4000}>
                <div className="container position-relative">
                  <img className="ad" src={ad6} alt="" />
                  <div style={{ position: "absolute", top: "80%", left: "5%" }}>
                    <button className="adbtn btn btn-success rounded-3">
                      SHOP NOW
                    </button>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
          <Topitems />
        </div>
      </section>
      <Footer />
    </>
  );
}
