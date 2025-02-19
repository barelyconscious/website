import React, { useState } from 'react';
import '../../styles/signUp.css';
import * as Auth from 'aws-amplify/auth';

const signIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        isSuccess: true,
        errorMessage: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError({ isSuccess: true, errorMessage: '' });
        try {
            try {
                const user = await Auth.getCurrentUser();
                if (user) {
                    console.log('just gonna sign them out. maybe fix this later');
                    await Auth.signOut();
                }
            } catch (error) {
            }

            const response = await Auth.signIn({
                username,
                password,
            });
            setError({
                isSuccess: true,
                errorMessage: '',
            });
            console.log(response);
            setLoading(false);
            // if (response.isSuccess) {
            //     window.location.href = '/forum';
            // }
        } catch (e) {
            setLoading(false);
            setError({
                isSuccess: false,
                errorMessage: JSON.stringify(e)
            });
        }
    };

    let header = <h1 className='neon-text'>SIGN IN</h1>;
    if (!loading && !error.isSuccess) {
        header = <h1 className="neon-text"
            style={{ color: 'red', textShadow: '2px 2px 4px rgba(255, 0, 0, 0.7)' }}
        >SIGN IN</h1>
    } else if (loading) {
        header = <h1 className='neon-text'>
            SIGNING IN - PLEASE WAIT
        </h1>
    }

    return (
        <div className="signup-container">
            {header}
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

                <button type="submit" className="glow-button">Sign In</button>
            </form>
        </div>
    );
};

export default signIn;
