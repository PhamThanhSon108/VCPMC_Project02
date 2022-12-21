import { Modal } from "antd";

import "./PlayVideoModal.scss";
function PlayVideoModal({
  isModalOpen,
  setIsModalOpen,
  url,
}: {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  url?: string;
}) {
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
    </>
  );
}

export default PlayVideoModal;
