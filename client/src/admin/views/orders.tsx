import { useLayoutEffect, useState } from "react";
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
import { cur } from "../../currency.js";
import {
  storeOrders,
  closeOrder,
  deleteOrder,
} from "../../redux/admin/adminSlice";
import { useDispatch, useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Modal from "react-bootstrap/Modal";
import Typography from "@mui/material/Typography";
import Search from "../components/Search";

export default function Orders() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [ontab1, setOntab1] = useState("");
  const [ontab2, setOntab2] = useState("");
  // const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const [id, setID] = useState<any>("");
  const { orders } = useSelector((state: any) => state.admin);
  const [openOrders, setOpenOrders] = useState([]);
  const [closeOrders, setCloseOrders] = useState([]);
  const [active, setActive] = useState(true);
  const [activeTab, setactiveTab] = useState(1);
  let tab1 = 1;
  let tab2 = 2;

  const toggleOpenOrders = (id: string) => {
    setOntab1(ontab1 === id ? "" : id);
  };
  const toggleCloseOrders = (id: string) => {
    setOntab2(ontab2 === id ? "" : id);
  };

  const handleFirstTab = () => {
    setActive(true);
    setactiveTab(1);
  };

  const handleSecondTab = () => {
    setActive(false);
    setactiveTab(2);
  };

  useLayoutEffect(() => {
    axios
      .get("/api/orders/")
      .then((res: any) => {
        dispatch(storeOrders(res.data.reverse()));
      })
      .catch((err) => {
        toast.error("An error occurred");
        console.log(err);
      });
  }, []);

  useLayoutEffect(() => {
    if (!orders) return;

    const arropen = orders.filter((o: any) => o.status === "open");
    const arrclose = orders.filter((c: any) => c.status === "closed");

    setOpenOrders(arropen);
    setCloseOrders(arrclose);
  }, [orders]);

  const handleOpen = (event: any) => {
    setID(event.currentTarget.getAttribute("order-id"));
    setOpen(true);
  };

  const HandleDelete = (id: string) => {
    setLoading(true);
    setTimeout(() => {
      axios
        .delete(`/api/orders/${id}`)
        .then((res) => {
          if (res.statusText == "OK") {
            dispatch(deleteOrder(id));
            setOpen(false);
            setLoading(false);
            toast.success("deleted successfully");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("failed to delete order");
          setLoading(false);
        });
    }, 2000);
  };

  const HandleClose = (id: string) => {
    axios
      .put(`/api/orders/${id}`)
      .then((res) => {
        if (res.statusText == "OK") {
          toast.success("order closed successfully");
          dispatch(closeOrder(id));
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error("failed to close order");
      });
  };

  return (
    <div>
      <div className="mtg mb-3" style={{ borderBottom: "1px solid #dbd0d0" }}>
        <h3>Orders({!orders ? "0" : orders.length})</h3>
      </div>
      <div className="d-flex justify-content-end me-2 mb-3">
        <Search />
      </div>
      <div className="" style={{ height: "70vh", overflow: "auto" }}>
        <div className="nav-tab-slide">
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
          {!orders ? (
            <div className="content">
              <img src={orders} alt="" />
              <p>No Order have been placed yet!</p>
              <p className="mt-3 ms-3">
                All your orders will be saved here for you to access their state
                anytime.
              </p>
            </div>
          ) : (
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
                            <p>User ID: {order.user_id}</p>
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
                                  <hr style={{ width: "150px" }} />
                                </div>
                              </div>
                            );
                          })}
                          <div className="action d-flex gap-4">
                            <button
                              order-id={order._id}
                              className="btn btn-danger"
                              onClick={handleOpen}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-customx "
                              onClick={() => HandleClose(order._id)}
                            >
                              Close Order
                            </button>
                          </div>
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
                            <p>User ID: {order.user_id}</p>
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
                          <div className="action d-flex gap-4">
                            <button
                              order-id={order._id}
                              className="btn btn-danger"
                              onClick={handleOpen}
                            >
                              Delete
                            </button>
                          </div>
                        </AccordionBody>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              </TabPane>
            </TabContent>
          )}
        </div>
      </div>
      <Modal show={open} onHide={closeModal} className="modaldefault">
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Are you sure you want to delete this {id} Order.
          </Typography>
        </Modal.Body>
        <Modal.Footer>
          <div className="mt-3 flex">
            <button
              className="mt-2 py-2 px-4 btn btn-secondary me-3"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="mt-2 py-2 px-4 btn btn-danger"
              onClick={() => HandleDelete(id)}
            >
              {loading ? (
                <CircularProgress
                  size={15}
                  sx={{ color: "#fff", marginRight: "10px" }}
                />
              ) : (
                ""
              )}
              Confirm Delete
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
