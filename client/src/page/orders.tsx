import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import orders from '../assets/icons/acct/orders.svg'

import {
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  UncontrolledAccordion,
} from 'reactstrap'
import axios from 'axios'
import toast from 'react-hot-toast'

let usd = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
})

export default function Orders() {
  const [data, setData] = useState<any>(null)
  const { currentUser } = useSelector((state: any) => state.user)
  useEffect(() => {
    axios
      .get(`/api/orders/${currentUser._id}`)
      .then((res: any) => {
        setData(res.data)
      })
      .catch((err) => {
        toast.error('An error occurred')
        console.log(err)
      })
  }, [])

  return (
    <div>
      <div className="mtg mb-3" style={{ borderBottom: '1px solid #dbd0d0' }}>
        <h3>Orders({!data ? '0' : data.length})</h3>
      </div>
      <div className="container" style={{ height: '432px', overflowY: 'auto' }}>
        {data?.length < 1 ? (
          <div className="content">
            <img src={orders} alt="" />
            <p>You have placed no orders yet!</p>
            <p className="mt-3">
              All your orders will be saved here for you to access their state
              anytime.
            </p>
            <a href="/">
              <button className="mt-3 btn btn-success rounded-3">
                CONTINUE SHOPPING
              </button>
            </a>
          </div>
        ) : (
          <UncontrolledAccordion>
            {data?.map((order: any, index: number) => {
              return (
                <AccordionItem key={index}>
                  <AccordionHeader targetId={String(index)}>
                    Tracking ID - {order._id}
                  </AccordionHeader>
                  <AccordionBody accordionId={String(index)}>
                    <div className="order-desc mb-3">
                      <span>
                        Your order{' '}
                        <strong className="text-success">
                          #digi_exp_{order._id.slice(0, 16)}...
                        </strong>{' '}
                        has been shipped and you will recieve it soon
                      </span>
                      <p>Order Item Count: {order.total_order}</p>
                      <p>Payment Status: Paid with card</p>
                      <p>Order Amount: {usd.format(order.total_price)}</p>
                    </div>
                    {order.products.map((p: Order, i: number) => {
                      return (
                        <div className="order-wrap d-flex gap-3" key={i}>
                          <div className="order-img">
                            <img
                              src={require('../assets/' + p.photo)}
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
                              <p>Price: {usd.format(p.price)}</p>
                              <p>
                                SubTotal: {usd.format(p.price * p.quantity)}
                              </p>
                            </div>
                            {i !== order.products.length - 1 && <hr />}
                          </div>
                        </div>
                      )
                    })}
                  </AccordionBody>
                </AccordionItem>
              )
            })}
          </UncontrolledAccordion>
        )}
      </div>
    </div>
  )
}
