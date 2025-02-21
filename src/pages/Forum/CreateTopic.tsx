import React, { useState } from "react";
import "../../styles/createTopic.css"; // Import vaporwave-themed styles
import { createTopic } from "../../models/topics"; // API call to create a topic

const CreateTopic: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage("");

        try {
            await createTopic({ boardId: 1, title, content });
            setMessage("✅ Topic created successfully!");
            setTitle("");
            setContent("");
        } catch (error) {
            setMessage("❌ Failed to create topic. Try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="create-topic-container">
            <div className="create-topic-card">
                <h1 className="neon-title">Create a New Topic</h1>
                <form onSubmit={handleSubmit}>
                    <label className="neon-label">Title</label>
                    <input
                        type="text"
                        className="neon-input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />

                    <label className="neon-label">Content</label>
                    <textarea
                        className="neon-textarea"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>

                    <button type="submit" className="forum-button create" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Topic"}
                    </button>
                </form>
                {message && <p className="form-message">{message}</p>}
            </div>
        </div>
    );
};

export default CreateTopic;
