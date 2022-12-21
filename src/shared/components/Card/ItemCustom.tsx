import { Col } from "antd";
import React, { useState } from "react";
import { images } from "../../assets/images";
import PlayVideoModal from "../Modal/PlayVideoModal";
import "./styles.scss";
export default function ItemCustom({
  img,
  props,
  span,
}: {
  img: string;
  props: {
    title: string;
    contents01: { mainName: string; des: string }[];
    contents02: { mainBox: string; desBox: string }[];
  };
  span?: 5;
}) {
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
  const handlePlayVideo = () => {
    setIsPlayVideo(true);
  };
  return (
    <>
      <PlayVideoModal
        isModalOpen={isPlayVideo}
        setIsModalOpen={setIsPlayVideo}
      />
      <Col className="custom-card-item__wrap" span={!span ? 5 : span}>
        <div>
          <div className="custom-card-item__image">
            <div
              className="custom-card-item__video-play"
              onClick={handlePlayVideo}
            >
              {images.icon.play}
            </div>
            <img src={img} />
          </div>
          <div className="custom-card-item__body">
            <div className="custom-card-item__body-title">{props.title}</div>
            <div className="custom-card-item__body-content">
              {/* div wrap infor to space content in body */}
              <div>
                {props.contents01?.map((content) => {
                  return (
                    <div>
                      <span className="main">{content.mainName}</span>
                      <span>{content.des}</span>
                    </div>
                  );
                })}
              </div>
              <div className="wrap-box">
                {props.contents02?.map((content) => {
                  return (
                    <div className="box-item">
                      <span className="box-item-title">{content.mainBox}</span>
                      <span className="box-item-content">{content.desBox}</span>
                    </div>
                  );
                })}
                {/* <div className="box-item">
                <span className="box-item-title">Thể loại</span>
                <span className="box-item-content">Pop</span>
              </div>
              <div className="box-item">
                <span className="box-item-title">Thể loại</span>
                <span className="box-item-content">Pop</span>
              </div>
              <div className="box-item">
                <span className="box-item-content">Pop</span>
                <span className="box-item-title">Thể loại</span>
              </div> */}
                <div className="box-last-item">
                  {images.icon.modifyInformation}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}
