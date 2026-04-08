import ContactMe from "./Home/ContactMe";
import SiteInfo from "./Home/SiteInfo";

const Footer = () => {
    return (
        <footer className="bg-bg-secondary border-t border-border mt-auto">
            <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 gap-12">
                <ContactMe />
                <SiteInfo />
            </div>
            <div className="border-t border-border py-4 text-center text-text-muted text-xs">
                Barely Conscious Games &copy; {new Date().getFullYear()}
            </div>
        </footer>
    );
};

export default Footer;
