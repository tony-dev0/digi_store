import { useEffect, useState } from "react";
import orders from "../../assets/icons/acct/orders.svg";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import axios from "axios";
import toast from "react-hot-toast";
import { cur } from "../../currency.js";
import { useParams } from "react-router-dom";

export default function Orders() {
  const params = useParams();
  const [data, setData] = useState<any>(null);
  const [open, setOpen] = useState<string>("");
  const toggle = (id: string) => {
    setOpen(open === id ? "" : id);
  };
  useEffect(() => {
    axios
      .get(`/api/orders/${params.id}`)
      .then((res: any) => {
        setData(res.data.reverse());
      })
      .catch((err) => {
        toast.error("An error occurred");
        console.log(err);
      });
  }, []);
  return (
    <div>
      <div className="mtg mb-3" style={{ borderBottom: "1px solid #dbd0d0" }}>
        <h3>Orders({!data ? "0" : data.length})</h3>
      </div>
      <div className="" style={{ height: "78vh", overflowY: "auto" }}>
        {data?.length < 1 ? (
          <div className="content">
            <img src={orders} alt="" />
            <p>No Order with that id found!</p>
            <p className="mt-3 ms-3">
              Remember to avoid spaces and order id must not start with
              alphabetic characters.
            </p>
          </div>
        ) : (
          // Use Accordion instead of UncontrolledAccordion
          <Accordion open={open} toggle={toggle}>
            {data?.map((order: any, index: number) => {
              return (
                <AccordionItem key={index}>
                  <AccordionHeader targetId={String(index)}>
                    Tracking ID - {order._id}
                  </AccordionHeader>
                  <AccordionBody accordionId={String(index)}>
                    <div className="order-desc mb-3">
                      <p>Order Item Count: {order.total_order}</p>
                      <p>Payment Status: Paid with card</p>
                      <p>Order Amount: {cur.format(order.total_price)}</p>
                      <p>Status: {order.status}</p>
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
                                SubTotal: {cur.format(p.price * p.quantity)}
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
        )}
      </div>
    </div>
  );
}
