import React from "react";
import MyProjects from "../components/Home/MyProjects";
import ContactMe from "../components/Home/ContactMe";
import SiteInfo from "../components/Home/SiteInfo";

import "../styles/home.css";

const Home: React.FC = () => {
  return (
    <div className="home">
      <section>
        <div className="container" style={{ paddingBottom: '0' }}>
          <MyProjects />
        </div>
      </section>

      <section style={{ backgroundColor: "#233140", position: "absolute", bottom: 0, width: "100%" }}>
        <div className="container pb-5">
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
