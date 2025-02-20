import { useEffect, useState } from "react";
import "../../styles/profile.css";
import { getProfile, ProfileResponse } from "../../models/users";
import { useParams } from "react-router-dom";

const UserProfile = () => {
    const { username } = useParams<{ username: string }>();
    const [profile, setProfile] = useState<ProfileResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadProfile = async () => {
            setProfile(await getProfile(username!!));
            setLoading(false);
        }

        loadProfile();
    }, []);

    if (loading) {
        return <div>
            Hi I'm loading how are you
        </div>
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <div className="avatar-container">
                    <img
                        src={profile?.avatarUrl || "https://i.imgur.com/6VBx3io.png"}
                        alt="User Avatar"
                        className="avatar"
                    />
                </div>
                <h1 className="username">{profile?.username}</h1>
                <p className="email">
                    {profile?.email ? (
                        <>
                            📧 {profile?.email} {profile?.isEmailVerified ? "✅" : "❌"}
                        </>
                    ) : (
                        "Email not provided"
                    )}
                </p>
                <p className="date-joined">Joined: {profile && new Date(profile!!.dateJoined).toDateString()}</p>

                {profile?.signature && <p className="signature">"{profile?.signature}"</p>}

                <div className="stats">
                    <p>📝 Topics: <span className="glitch">{profile?.numTopics}</span></p>
                    <p>💬 Posts: <span className="glitch">{profile?.numPosts}</span></p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
