import { Button, Divider } from "antd";
import React, { useState } from "react";
import { images } from "../../../../../shared/assets/images";
import AddRecordsModal from "../../../../../shared/components/Modal/AddRecordsModal";

export default function AddRecordsToAuthorisationContract() {
  const [isOpenModalAddRecords, setIsOpenModalAddRecords] =
    useState<boolean>(false);
  return (
    <>
      {isOpenModalAddRecords ? (
        <AddRecordsModal
          isModalOpen={isOpenModalAddRecords}
          setIsModalOpen={setIsOpenModalAddRecords}
        />
      ) : null}
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          marginTop: "60px",
        }}
      >
        <div className="add-records-to-contract">
          <div className="title-custom">
            <span className="title-custom-icon">{images.icon.sucess}</span>
            <h2 className="title-custom-content">
              Hợp đồng đã được tạo thành công
            </h2>
          </div>

          <div className="body-custom">
            <h4 className="body-topic-title">Có 2 cách để tạo bản ghi:</h4>
            <div className="body-topic-content">
              <span className="left">Cách 1:</span>
              <div className="right">
                <span>Upload bản ghi trực tiếp</span>
                <span>Bạn có thể upload bản ghi ngay trên website</span>
                <Button
                  type="primary"
                  onClick={() => {
                    setIsOpenModalAddRecords(true);
                  }}
                >
                  Thêm bản ghi trực tiếp
                </Button>
              </div>
            </div>
            <div className="body-topic-content">
              <span className="left">Cách 2:</span>
              <div className="right">
                <span>Upload bản ghi qua phần mềm</span>
                <span>Bạn có thể thêm bản ghi qua tool</span>
                <Button type="ghost">Thêm bản ghi trực tiếp</Button>
              </div>
            </div>
            <div className="note">
              Lưu ý: Hợp đồng chỉ có hiệu lực khi thêm bản ghi thành công.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
