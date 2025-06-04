import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import orders from "../assets/icons/acct/orders.svg";
import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Accordion,
} from "reactstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { cur } from "../currency.js";

export default function Orders() {
  const [openOrders, setOpenOrders] = useState([]);
  const [closeOrders, setCloseOrders] = useState([]);
  const [ontab1, setOntab1] = useState("");
  const [ontab2, setOntab2] = useState("");
  const [active, setActive] = useState(true);
  const [activeTab, setactiveTab] = useState(1);
  let tab1 = 1;
  let tab2 = 2;

  const handleFirstTab = () => {
    setActive(true);
    setactiveTab(1);
  };
  const handleSecondTab = () => {
    setActive(false);
    setactiveTab(2);
  };
  const toggleOpenOrders = (id: string) => {
    setOntab1(ontab1 === id ? "" : id);
  };
  const toggleCloseOrders = (id: string) => {
    setOntab2(ontab2 === id ? "" : id);
  };

  const [data, setData] = useState<any>(null);
  const { currentUser } = useSelector((state: any) => state.user);
  useEffect(() => {
    axios
      .get(`/api/orders/${currentUser._id}`)
      .then((res: any) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        toast.error("An error occurred");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (!data) return;

    const arropen = data.filter((o: any) => o.status === "open");
    const arrclose = data.filter((c: any) => c.status === "closed");

    setOpenOrders(arropen);
    setCloseOrders(arrclose);
  }, [data]);
  return (
    <div>
      <div className="mtg mb-3" style={{ borderBottom: "1px solid #dbd0d0" }}>
        <h3>Orders({!data ? "0" : data.length})</h3>
      </div>
      <div className="" style={{ height: "432px", overflowY: "auto" }}>
        {data?.length < 1 ? (
          <div className="content">
            <img src={orders} alt="" />
            <p>You have placed no orders yet!</p>
            <p className="mt-3">
              All your orders will be saved here for you to access their state
              anytime.
            </p>
            <a href="/">
              <button className="my-3 btn btn-success rounded-3">
                CONTINUE SHOPPING
              </button>
            </a>
          </div>
        ) : (
          <div className="nav-tab-pill">
            <Nav tabs>
              <NavItem style={{ cursor: "pointer", color: "#000" }}>
                <NavLink
                  className={active ? "active" : ""}
                  onClick={handleFirstTab}
                >
                  OPEN ORDERS({openOrders?.length})
                </NavLink>
              </NavItem>
              <NavItem style={{ cursor: "pointer", color: "#000" }}>
                <NavLink
                  className={active ? "" : "active"}
                  onClick={handleSecondTab}
                >
                  CLOSED ORDERS({closeOrders?.length})
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent activeTab={activeTab}>
              <TabPane tabId={tab1}>
                <Accordion open={ontab1} toggle={toggleOpenOrders}>
                  {openOrders?.map((order: any, index: number) => {
                    return (
                      <AccordionItem key={index}>
                        <AccordionHeader targetId={String(index)}>
                          Tracking ID - {order._id}
                        </AccordionHeader>
                        <AccordionBody accordionId={String(index)}>
                          <div className="order-desc mb-3">
                            <span>
                              Your order{" "}
                              <strong className="text-success">
                                #digi_exp_{order._id.slice(0, 16)}...
                              </strong>{" "}
                              has been shipped and you will recieve it soon
                            </span>
                            <p>Order Item Count: {order.total_order}</p>
                            <p>Payment Status: Paid with card</p>
                            <p>Order Amount: {cur.format(order.total_price)}</p>
                          </div>
                          {order.products.map((p: Order, i: number) => {
                            return (
                              <div className="order-wrap d-flex gap-3" key={i}>
                                <div className="order-img">
                                  <img
                                    src={p.photo}
                                    alt=""
                                    width={100}
                                    height={110}
                                  />
                                </div>
                                <div className="order-content">
                                  <p>
                                    <h3>{p.name}</h3>
                                  </p>
                                  <div style={{ opacity: 0.7 }}>
                                    <p>Quantity: {p.quantity}</p>
                                    <p>Price: {cur.format(p.price)}</p>
                                    <p>
                                      SubTotal:{" "}
                                      {cur.format(p.price * p.quantity)}
                                    </p>
                                  </div>
                                  {i !== order.products.length - 1 && <hr />}
                                </div>
                              </div>
                            );
                          })}
                        </AccordionBody>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabPane>

              <TabPane tabId={tab2}>
                <Accordion open={ontab2} toggle={toggleCloseOrders}>
                  {closeOrders?.map((order: any, index: number) => {
                    return (
                      <AccordionItem key={index}>
                        <AccordionHeader targetId={String(index)}>
                          Tracking ID - {order._id}
                        </AccordionHeader>
                        <AccordionBody accordionId={String(index)}>
                          <div className="order-desc mb-3">
                            <span>
                              Your order{" "}
                              <strong className="text-success">
                                #digi_exp_{order._id.slice(0, 16)}...
                              </strong>{" "}
                              has been shipped and you will recieve it soon
                            </span>
                            <p>Order Item Count: {order.total_order}</p>
                            <p>Payment Status: Paid with card</p>
                            <p>Order Amount: {cur.format(order.total_price)}</p>
                          </div>
                          {order.products.map((p: Order, i: number) => {
                            return (
                              <div className="order-wrap d-flex gap-3" key={i}>
                                <div className="order-img">
                                  <img
                                    src={p.photo}
                                    alt=""
                                    width={100}
                                    height={110}
                                  />
                                </div>
                                <div className="order-content">
                                  <p>
                                    <h3>{p.name}</h3>
                                  </p>
                                  <div style={{ opacity: 0.7 }}>
                                    <p>Quantity: {p.quantity}</p>
                                    <p>Price: {cur.format(p.price)}</p>
                                    <p>
                                      SubTotal:{" "}
                                      {cur.format(p.price * p.quantity)}
                                    </p>
                                  </div>
                                  {i !== order.products.length - 1 && <hr />}
                                </div>
                              </div>
                            );
                          })}
                        </AccordionBody>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabPane>
            </TabContent>
          </div>
        )}
      </div>
    </div>
  );
}
