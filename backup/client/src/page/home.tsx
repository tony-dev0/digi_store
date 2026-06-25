import { useState, useEffect } from "react";
import Head from "../sections/Head";
import {
  Featured,
  Topitems,
  Limitedstocks,
  Maingadget,
} from "../sections/Products";
import { Desc, Advert, Reviews } from "../sections/About";
import { Contact } from "../sections/Contact";
import { Footer } from "../sections/Footer";
import "../styles/font-awesome.min.css";
import "../styles/bootstrap/dist/css/bootstrap.min.css";
import "../styles/style.css";
import "../styles/responsive.css";
import { useDispatch } from "react-redux";
import { storeProducts } from "../redux/product/productSlice";
import axios from "axios";

export const Home = () => {
  const dispatch = useDispatch();
  const [loadscreen, setloadScreen] = useState(false);
  useEffect(() => {
    setloadScreen(true);
    axios
      .get("/api/products")
      .then((res) => {
        dispatch(storeProducts(res.data));
        setloadScreen(false);
      })
      .catch((error) => {
        console.log(`Backend Error: ${error}`);
        setloadScreen(false); // Hide loader even if error
      });
  }, []);

  return (
    <>
      {loadscreen ? (
        <div id="loader">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="App">
          <Head />
          <Featured />
          <Topitems />
          <Limitedstocks />
          <Maingadget />
          <Advert />
          <Desc />
          <Reviews />
          <Contact />
          <Footer />
        </div>
      )}
    </>
  );
};
