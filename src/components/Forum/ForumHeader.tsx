import * as Auth from 'aws-amplify/auth';
import { Link } from "react-router-dom";
import '../../styles/forum.css';
import { useEffect, useState } from 'react';

const ForumHeader = () => {
    const [username, setUsername] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function getUser() {
            setLoading(true);
            try {
                const user = await Auth.getCurrentUser();
                setUsername(user.username);
            } catch (_) {
                // user wasn't logged in that's ok
            }
            setLoading(false);
        }

        getUser();
    }, []);

    const handleSignOut = async () => {
        setLoading(true);
        await Auth.signOut();
        window.location.href = '/forum';
        setLoading(false);
    }

    if (loading) {
        return (<div>Loading</div>)
    }

    if (username) {
        return (
            <div className="board-container">
                <div className="forum-header">
                    <h1 className="forum-title">Community Boards</h1>
                    <div className="forum-buttons">
                        <Link to="/faq" className="forum-button secondary">FAQ</Link>
                        <button className="forum-button sign-out" onClick={handleSignOut}>Sign Out</button>
                        <Link to={`/profile/${username}`} className="forum-button profile">My Profile</Link>
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
                    <Link to="/faq" className="forum-button secondary" aria-disabled={true}>FAQ</Link>
                    <Link to="/signup" className="forum-button">Sign Up</Link>
                    <Link to="/signin" className="forum-button primary">Sign In</Link>
                </div>
            </div>
            <p className="forum-subtitle">Discuss cybernetic felines, biograms, and more.</p>
        </div>
    );
};

export default ForumHeader;