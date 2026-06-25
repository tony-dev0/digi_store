import banner1 from '../assets/images/banner1.png'
import banner2 from '../assets/images/banner2.png'
import Carousel from 'react-bootstrap/Carousel'
import useMediaQuery from '@mui/material/useMediaQuery'

const Banner = () => {
  const mobile = useMediaQuery('(max-width:992px)')
  return (
    <>
      {mobile ? (
        <section className="banner_main">
          <div className="container">
            <div className="ca-caption py-5">
              <div className="mobscr d-flex justify-content-center">
                <div className="">
                  <div className="text-bg text-center">
                    <span>Electronic Gadgets And</span>
                    <h1>Accessories</h1>
                    <p>
                      {' '}
                      We provide you various Accessories and Electronic products
                      of high quality at affordable price. shop with us and
                      enjoy free discount on every product{' '}
                    </p>
                    <button className="authbtn me-4">
                      {' '}
                      <a href="/register">Register</a>
                    </button>
                    <button className="authbtn">
                      <a href="/login">Log in</a>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="banner_main" style={{ height: '475px' }}>
          <Carousel>
            <Carousel.Item interval={5000}>
              <div className="container">
                <div className="ca-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <span>Electronic Gadgets And</span>
                        <h1>Accessories</h1>
                        <p>
                          {' '}
                          We provide you various Accessories and Electronic
                          products of high quality at affordable price. shop
                          with us and enjoy free discount on every product{' '}
                        </p>
                        <button className="authbtn me-4">
                          {' '}
                          <a href="/register">Register</a>
                        </button>
                        <button className="authbtn">
                          <a href="/login">Log in</a>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="banner">
                        <figure>
                          <img src={banner1} alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
            <Carousel.Item interval={5000}>
              <div className="container">
                <div className="ca-caption">
                  <div className="row">
                    <div className="col-md-6">
                      <div className="text-bg">
                        <span>Computer And Laptop</span>
                        <h1>Accessories</h1>
                        <p>
                          There are much variations of passages of Lorem Ipsum
                          available, but the majority have suffered alteration
                          in some form, by injected humour, or{' '}
                        </p>
                        <button className="authbtn me-4">
                          {' '}
                          <a href="/register">Register</a>
                        </button>
                        <button className="authbtn">
                          <a href="/login">Log in</a>
                        </button>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="banner">
                        <figure>
                          <img src={banner2} alt="#" />
                        </figure>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Carousel.Item>
          </Carousel>
        </section>
      )}
    </>
  )
}

export default Banner
