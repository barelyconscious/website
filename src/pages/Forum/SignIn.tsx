import React, { useState } from 'react';
import '../../styles/signUp.css';
import { signInUser } from '../../models/users';

const signIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        isSuccessful: true,
        errorMessage: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({ isSuccessful: true, errorMessage: '' });
        const response = await signInUser(username, password);
        setError(response);
        console.log(response);
    };

    return (
        <div className="signup-container">
            <h1 className="neon-text">SIGN IN</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                {error && !error.isSuccessful && <div>
                    {error.errorMessage}
                </div>}
                <div className="input-group">
                    <span className="label">Username:</span>
                    <input
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="input-group">
                    <span className="label">Password:</span>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="glow-button">Join</button>
            </form>
        </div>
    );
};

export default signIn;
