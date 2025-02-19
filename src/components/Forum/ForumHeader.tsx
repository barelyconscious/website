import * as Auth from 'aws-amplify/auth';
import { Link } from "react-router-dom";
import '../../styles/forum.css';
import { useEffect, useState } from 'react';

const ForumHeader = () => {
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        async function getUser() {
            try {
                const user = await Auth.getCurrentUser();
                setUsername(user.username);
            } catch (_) {
                // user wasn't logged in that's ok
            }
        }

        getUser();
    }, []);

    const handleSignOut = async () => {
        await Auth.signOut();
    }

    if (username) {
        return (
            <div className="board-container">
                <div className="forum-header">
                    <h1 className="forum-title">Community Boards</h1>
                    <div className="forum-buttons">
                        <Link to="/faq" className="forum-button secondary">FAQ</Link>
                        <button className="forum-button" onClick={handleSignOut}>Sign Out</button>
                        <Link to="/profile" className="forum-button primary">My Profile</Link>
                    </div>
                </div>
                <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
            </div>
        );
    }

    return (
        <div className="board-container">
                <div className="forum-header">
                <h1 className="forum-title">Community Boards</h1>
                <div className="forum-buttons">
                    <Link to="/faq" className="forum-button secondary">FAQ</Link>
                    <Link to="/signup" className="forum-button">Sign Up</Link>
                    <Link to="/signin" className="forum-button primary">Sign In</Link>
                </div>
            </div>
            <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
        </div>
    );
};

export default ForumHeader;