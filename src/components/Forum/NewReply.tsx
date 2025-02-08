import { useState } from "react";
import "../../styles/newReply.css";

type NewReplyProps = {
    onSubmit: (content: string) => void;
    isSubmitting?: boolean;
};

export default function NewReply({ onSubmit, isSubmitting = false }: NewReplyProps) {
    const [content, setContent] = useState("");
    const [error, setError] = useState<string | null>(null);

    // Placeholder for logged-in user
    const loggedInUser = {
        name: "John Doe",
        avatar: "", // Replace with actual image URL later
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (content.trim().length === 0) {
            setError("Reply cannot be empty.");
            return;
        }
        onSubmit(content);
        setContent(""); // Clear input field after submission
        setError(null);
    };

    return (
        <form className="new-reply-form" onSubmit={handleSubmit}>
            <div className="reply-row">
                <div className="reply-avatar"></div>

                <div className="reply-content">
                    <span className="reply-username">{loggedInUser.name}</span>
                    <textarea
                        className="reply-input"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="Tell them what's on your mind..."
                        disabled={isSubmitting}
                    />
                </div>
            </div>

            {error && <p className="reply-error">{error}</p>}

            {/* 🚀 Submit Button */}
            <button type="submit" className="reply-submit" disabled={isSubmitting}>
                {isSubmitting ? "Posting..." : "Post Reply"}
            </button>
        </form>
    );
}
