import success from '../assets/icons/check.png'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'
import { clearCart } from '../redux/cart/cartSlice'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

export default function paymentSuccess() {
  const dispatch = useDispatch()
  dispatch(clearCart())
  return (
    <div>
      <Header />
      <div className="py-5" style={{ background: '#fff' }}>
        <section className="msg-section my-3 py-3">
          <div className="container d-flex justify-content-center">
            <div className="box-info">
              <div className="box-info-content">
                <div className="icon">
                  <img src={success} alt="" width={40} />
                </div>
                <div className="box-info-text">
                  <p>
                    <h3>Payment Successful</h3>
                  </p>
                  <p>Your Payment have been recieved. </p>
                  <p>Thank you for Shopping with us </p>
                </div>
                <div className="box-info-footer">
                  <Link to="/orders">
                    <button className="btn btn-success p-2">View Orders</button>
                  </Link>
                  <button className="btn btn-secondary p-2">
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}
