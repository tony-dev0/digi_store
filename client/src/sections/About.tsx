import pc from '../assets/images/pc.png';
import Carousel from 'react-bootstrap/Carousel';
// advert
// description 
// testimonies
export const Advert = () => {
    return (
        <>
<div className="laptop">
    <div className="container">
       <div className="row">
          <div className="col-md-6">
             <div className="titlepage">
                <p>Every Computer and laptop</p>
                <h3 className="rdf">Up to 40% off !</h3>
                <a className="read_more" href="#">Shop Now</a>
             </div>
          </div>
          <div className="col-md-6">
             <div className="laptop_box">
                <figure><img id="img" src={pc} alt="#"/></figure>
             </div>
          </div>
       </div>
    </div>
 </div>
        </>
    );
};

export const Desc = () => {
    return (
      <>
<section className="top-items about" id="about">
         <div className="container">
      <h2 className="fw-bold">Gigi Store - The Biggest Online Store in Nigeria</h2>
      <h2 className="desc">Shop with us all you need is HERE!</h2>
          <p>Gigi Store is the largest online shopping website in Nigeria. We offer a platform where 
           customers in any part of Nigeria can find and shop for all they need in one online store and that platform is the Gigi shopping 
           website. On the Gigi mobile app or website, you can shop from the comfort of your home or during work breaks and get everything 
           delivered fast without you having to stress or move an inch. Be it Accessories,electronics,mobile phones, 
           computers, or your everyday groceries you can get everything you need on Gigi online store.</p> <div>&nbsp; <br /> </div> 
           <p>Have you used the Gigi online store today? Shop now on Gigi to enjoy a seamless online shopping experience. With fast delivery, 
            free returns,and flexible payment options, you are certain to enjoy the convenience of shopping online.</p>  <div>&nbsp; <br /> </div>
           
       <h3>Get Your Home Needs on Gigi Nigeria</h3>
          <p>Beyond your daily grocery needs, you can shop on Gigi online for unique home furniture and interior decor pieces to
           beautify your homes and offices. We have carefully designed outdoor furniture and lighting for your patio and rooftops. 
           We also have generators, inverters, and inverter batteries to power up. There is nothing your home needs that is not on Gigi.
           You can easily shop from our huge collection of large and small appliances such as fridges, washing machines, air conditioners, 
           iron, blenders, air fryers, and many others. Shop for all your home needs and enjoy top deals, prices, and offers you can get nowhere else.</p> <div>&nbsp; <br /> </div>
        
           <h3>Buy the Latest Smartphones and Electronics From Gigi Nigeria</h3>
          <p>Shopping on Gigi guarantees that you get the latest mobile phones, tablets, or phablets before anyone else. Buy trusted Apple iOS iPhones and iPads and quality Android brands like Samsung, Tecno, Xiaomi, Infinix, and many others! Unlock the best functionality of your smartphones when you buy our amazing phone accessories like AirPods, earphones, powerbank, Bluetooth speakers, durable phone cases, and many more! We have an endless supply of Gigi phone
          accessories from top brands like Oraimo, Edifier, Samsung, Tecno, JBL, etc.</p>  <div>&nbsp; <br /> </div>
          <p>We also have an amazing collection of top computing brands like Hp, Dell, Lenovo, Microsoft, Apple Macbook, and more! You can either buy these computing devices as desktops or laptops depending on your choice. Shop for computing accessories like printers, scanners, computer components,
          and monitors to enhance your computer or laptop experience.</p>  <div>&nbsp; <br /> </div>
          <p>Our catalog of electronics offers you the highest quality of products from trusted sellers and brands. You can get the latest smart televisions and home audio devices for your living room. To spice things up, you can get the PlayStation consoles or Xbox consoles especially if you love gaming during your leisure time. </p>  <div>&nbsp; <br /> </div>
         
          <h1>Enjoy Top Deals and Discounts when Shopping on Gigi Nigeria Online Store</h1>
          <p>There are limitless offers and deals on the Gigi Nigeria online store. Enjoy up to 80% discount on selected items of the day during the flash sales. We also have Half Price Deals where our shoppers buy selected products like mobile phones, laptops, phone accessories, 
             and clothing pieces for half the original price. Get the best prices you can find on the best deals page. </p>  <div>&nbsp; <br /> </div> 
          <p>Enjoy other weekly offers that run all year long, which means that every time you shop on the Gigi website, you are sure to enjoy mouth-watering discounts and deals that will help you save more and get the most affordable prices no one else can give you. To know more about these offers and deals, you can subscribe to our push
             notifications and newsletters, read our blog, and follow us on all our social media accounts.</p>  <div>&nbsp; <br /> </div>
            
       <h1>Experience Fast Delivery and Online Shopping Convenience</h1>
          <p>Get your cart delivered to you within 24 hrs when you buy items with the Gigi Express tag, for selected products, you are also assured of free delivery and have your products delivered to you at no extra cost! Also, we have products that you can ship from abroad under the Gigi Global catalog. This means that you can order various 
            items from outside the country and get them delivered to your doorstep without hassles. </p>
         </div>
      </section>
      </>
    );
  };
export const Reviews = () => {
    return (
        <>
         <div className="customer">
         <div className="container">
            <div className="row">
               <div className="col-md-12">
                  <div className="titlepage">
                     <h2 className="rbf">Customer Review</h2>
                  </div>
               </div>
            </div>
            <div className="row">
               <div className="col-md-12">
               <div id="myCarousel" className="carousel slide customer_Carousel" data-bs-ride="carousel">
                     <div className="carousel-inner">
                     <Carousel>
   <Carousel.Item interval={3000}>
   <div className="px-2">
                              <div className="carousel-caption ">
                                 <div className="row justify-content-center">
                                    <div className="col-md-8 col-lg-6">
                                       <div className="test_box">
                                          <h4>Mac Anthony</h4>
                                          <div id="star" className="d-flex justify-content-start align-items-center g-3 mb-4">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-half-o"></i>
                                         </div>
                                          <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
    </Carousel.Item>
    <Carousel.Item interval={3000}>
    <div className="px-2">
                              <div className="carousel-caption ">
                                 <div className="row justify-content-center">
                                    <div className="col-md-8 col-lg-6">
                                       <div className="test_box">
                                          <h4>Sandy Miller</h4>
                                          <div id="star" className="d-flex justify-content-start align-items-center g-3 mb-4">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-half-o"></i>
                                         </div>
                                          <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
    </Carousel.Item>
    <Carousel.Item interval={3000}>
    <div className="px-2">
                              <div className="carousel-caption ">
                                 <div className="row justify-content-center">
                                    <div className="col-md-8 col-lg-6">
                                       <div className="test_box">
                                          <h4>Clark Kent</h4>
                                          <div id="star" className="d-flex justify-content-start align-items-center g-3 mb-4">
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star"></i>
                                             <i className="fa fa-star-half-o"></i>
                                         </div>
                                          <p>ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
               </Carousel.Item>
         </Carousel>
       </div>
   </div>
</div>
</div>
</div>
</div>
 </>
    )
}