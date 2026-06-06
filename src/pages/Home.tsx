import React from "react";
import MyProjects from "../components/Home/MyProjects";
import ContactMe from "../components/Home/ContactMe";
import SiteInfo from "../components/Home/SiteInfo";

import "../styles/home.css";
// import FetchLambda from "./FetchLambda";

const Home: React.FC = () => {
  return (
    <div className="home">
      {/* <FetchLambda /> */}
      <section>
        <div className="container" style={{ paddingBottom: '0' }}>
          <MyProjects />
        </div>
      </section>

      <section style={{ backgroundColor: "#233140", width: "100%" }}>
        <div className="container py-4">
          <div className="row">
            <div className="col-sm">
              <ContactMe />
            </div>
            <div className="col-sm">
              <SiteInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
