import ContactMe from "./Home/ContactMe";
import SiteInfo from "./Home/SiteInfo";

const Footer = () => {
    return (
        <footer className="bg-bg-secondary w-full py-8">
            <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <ContactMe />
                <SiteInfo />
            </div>
        </footer>
    );
};

export default Footer;
