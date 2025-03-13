import pct from "../assets/images/pct.png";
import Carousel from 'react-bootstrap/Carousel';

const Banner = () => {
    return (
        <section className="banner_main">
<Carousel>
   <Carousel.Item interval={3000}>
   <div className="container">
      <div className="ca-caption">
         <div className="row">
               <div className="col-md-6">
                  <div className="text-bg">
                     <span>Electronic Gadgets And</span>
                     <h1>Accessories</h1>
                     <p> We provide you various Accessories and Electronic products of high quality at affordable price. shop with us and enjoy free discount on every product </p>
                     <a href="/register">Register</a> <a href="/login">Log in </a>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className="text_img">
                     <figure><img src={pct} alt="#"/></figure>
                  </div>
               </div>
            </div>
        </div>
      </div>
   </Carousel.Item>
      <Carousel.Item interval={3000}>
      <div className="container">
            <div className="ca-caption">
                  <div className="row">
                          <div className="col-md-6">
                             <div className="text-bg">
                                <span>Computer And Laptop</span>
                                <h1>Accessories</h1>
                                <p>There are much variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or </p>
                                <a href="/register">Register </a> <a href="/login">Log in </a>
                             </div>
                          </div>
                          <div className="col-md-6">
                             <div className="text_img">
                                <figure><img src={pct} alt="#"/></figure>
                             </div>
                          </div>
                       </div>
               </div>
         </div>
      </Carousel.Item>
    </Carousel>
     </section>
    );
  };

  export default Banner;