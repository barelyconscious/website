import ContactMe from "../components/Home/ContactMe";
import SiteInfo from "../components/Home/SiteInfo";

const Footer = () => {
    return (
        <section style={{ backgroundColor: "#233140", width: "100%" }}>
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
    );
};

export default Footer;
