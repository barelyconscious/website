import React from "react";
import { Button, Modal } from "react-bootstrap";
import { useModal } from "../../context/ModalContext";

import "../../styles/modal.css";

export const YOUTUBE_MODAL_ID = "www/modal/youtube-modal-id";

interface YouTubeModalProps {
  title: string;
  youTubeUrl: string;
}

const YouTubeModal: React.FC<YouTubeModalProps> = ({ title, youTubeUrl }) => {
  const { visibleModalId, hideModal } = useModal();

  return (
    <Modal show={visibleModalId === YOUTUBE_MODAL_ID} onHide={hideModal} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <iframe
          className="youtube-modal"
          title={`${title}-youtube-iframe`}
          src={youTubeUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={hideModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default YouTubeModal;
