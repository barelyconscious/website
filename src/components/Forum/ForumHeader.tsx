import { Link } from "react-router-dom";
import '../../styles/forum.css';

const ForumHeader = () => {
    return (
        <>
            <div className="forum-header">
                <h1 className="forum-title">Community Boards</h1>
                <div className="forum-buttons">
                    <Link to="/faq" className="forum-button secondary">FAQ</Link>
                    <Link to="/signup" className="forum-button">Sign Up</Link>
                    <Link to="/signin" className="forum-button primary">Sign In</Link>
                </div>
            </div>
            <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
        </>
    );
};

export default ForumHeader;