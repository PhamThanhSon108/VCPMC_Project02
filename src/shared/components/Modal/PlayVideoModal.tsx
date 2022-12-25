import { Modal } from "antd";
import path from "path";
import { useNavigate } from "react-router-dom";

import "./PlayVideoModal.scss";
function PlayVideoModal({
  isModalOpen,
  setIsModalOpen,
  url,
  path,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  url?: string;
  path: "/record-store" | "/record-store/manager-approval";
}) {
  const navigate = useNavigate();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(path);
  };

  return (
    <>
      {isModalOpen ? (
        <Modal
          className="modal-container play-video"
          title="THAY ĐỔI MẬT KHẨU"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <iframe
            width="420px"
            height="247px"
            src={
              url ||
              "https://www.youtube.com/embed/qGRU3sRbaYw?list=RDGMEMQ1dJ7wXfLlqCjwV0xfSNbA"
            }
            title="Chúng Ta Không Thuộc Về Nhau | Official Music Video | Sơn Tùng M-TP"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Modal>
      ) : null}
    </>
  );
}

export default PlayVideoModal;
