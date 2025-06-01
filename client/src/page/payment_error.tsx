import error from '../assets/icons/close.png'
import { Header } from '../sections/Header'
import { Footer } from '../sections/Footer'
import { Link } from 'react-router-dom'

export default function paymentError() {
  return (
    <div>
      <Header />
      <div className="py-5" style={{ background: '#fff' }}>
        <section className="msg-section py-3">
          <div className="container d-flex justify-content-center">
            <div className="box-info">
              <div className="box-info-content">
                <div className="icon">
                  <img src={error} alt="" width={40} />
                </div>
                <div className="box-info-text">
                  <p>
                    <h3>Payment Cancelled!</h3>
                  </p>
                  <p>
                    Your Have Cancelled Your Order. if there is a problem please
                    don't hesistate to Contact us{' '}
                  </p>
                </div>
                <div className="box-info-footer">
                  <Link to="/products">
                    <button className="btn btn-secondary p-2">
                      Go to Homepage
                    </button>
                  </Link>
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
