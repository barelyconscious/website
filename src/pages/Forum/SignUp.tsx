import React, { useState } from 'react';
import '../../styles/signUp.css';
import { signUpUser } from '../../models/users';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        isSuccess: true,
        errorMessage: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError({ isSuccess: true, errorMessage: '' });
        try {
            const response = await signUpUser(username, password);
            setError(response);
            console.log(response);
            if (response.isSuccess) {
                window.location.href = '/signin';
            }
        } catch (e) {
            setError({
                isSuccess: false,
                errorMessage: JSON.stringify(e)
            });
        }
    };

    return (
        <div className="signup-container">
            <h1 className="neon-text"
                style={!error.isSuccess ? { color: 'red', textShadow: '2px 2px 4px rgba(255, 0, 0, 0.7)' } : {}}
            >SIGN UP</h1>
            <form onSubmit={handleSubmit} className={`signup-form ${!error.isSuccess && 'error signup-error'}`}>
                {error && !error.isSuccess && <div>
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

export default SignUp;
