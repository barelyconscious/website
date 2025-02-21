import React, { useState } from "react";
import '../../styles/createTopic.css';
import { createTopic } from "../../models/topics";

interface CreateTopicModalProps {
    boardId: string;
    onClose: () => void;
}

const CreateTopicModal: React.FC<CreateTopicModalProps> = ({ boardId, onClose }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await createTopic({ boardId: Number(boardId), title, content });
            window.location.href = `/forum/${boardId}/${response.topicId}`;
        } catch (error) {
            console.error("Failed to create topic", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Create a New Topic</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" className="neon-input" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <textarea className="neon-textarea" placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
                    <input type="text" className="neon-input" placeholder="Image URL (Optional)" value={image} onChange={(e) => setImage(e.target.value)} />

                    <button type="submit" className="forum-button create" disabled={isSubmitting}>
                        {isSubmitting ? "Creating..." : "Create Topic"}
                    </button>
                    <button type="button" className="forum-button cancel" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTopicModal;
