import { useModal } from "../../context/ModalContext";

export const YOUTUBE_MODAL_ID = "www/modal/youtube-modal-id";

interface YouTubeModalProps {
  title: string;
  youTubeUrl: string;
}

const YouTubeModal = ({ title, youTubeUrl }: YouTubeModalProps) => {
  const { visibleModalId, hideModal } = useModal();

  if (visibleModalId !== YOUTUBE_MODAL_ID) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={hideModal}>
      <div className="bg-bg-primary rounded-lg w-full max-w-3xl mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between p-4 border-b border-gray-600">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button onClick={hideModal} className="text-text-primary hover:text-white text-xl cursor-pointer">&times;</button>
        </div>
        <div className="p-4">
          <iframe
            className="w-full min-h-[350px]"
            title={`${title}-youtube-iframe`}
            src={youTubeUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className="flex justify-end p-4 border-t border-gray-600">
          <button
            onClick={hideModal}
            className="px-4 py-2 rounded bg-bg-secondary hover:bg-gray-600 text-text-primary cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeModal;
