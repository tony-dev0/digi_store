import { _Navbar, _Navmenu } from "../components/Nav";
import Banner from "../components/Banner";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Head = () => {
  const location = useLocation();
  useEffect(() => {
    setTimeout(() => {
      const hash = location.hash;
      let realpath = "";
      if (hash.startsWith("#")) {
        realpath = hash.replace("#", "");
        console.log("realpath ", realpath);
        const element = document.getElementById(realpath);
        if (element) {
          console.log("element");
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 1000);
  }, []);
  return (
    <div className="header" id="top">
      <section>
        <_Navbar />
        <_Navmenu />
        <Banner />
      </section>
    </div>
  );
};

export default Head;
