import { Col } from "antd";
import React, { ReactNode, useState } from "react";
import { images } from "../../assets/images";
import PlayVideoModal from "../Modal/PlayVideoModal";
import "./styles.scss";
export default function ItemCustom({
  type,
  img,
  props,
  span,
  children,
  path,
}: {
  type?: "video" | "image";
  img: string;
  props: {
    id?: string;
    title: string;
    contents01: { mainName?: string; des?: string; tag?: string[] }[];
    contents02: { mainBox: string; desBox: string }[];
  };
  children: ReactNode;
  span?: 5;
  path?: "/record-store" | "/record-store/manager-approval";
}) {
  const [isPlayVideo, setIsPlayVideo] = useState<boolean>(false);
  const handlePlayVideo = () => {
    setIsPlayVideo(true);
  };
  if (!type) {
    type = "video";
  }
  return (
    <>
      {type === "video" ? (
        <PlayVideoModal
          path={path || "/record-store"}
          isModalOpen={isPlayVideo}
          setIsModalOpen={setIsPlayVideo}
        />
      ) : null}
      <Col className="custom-card-item__wrap" span={!span ? 5 : span}>
        <div>
          <div className="custom-card-item__image">
            {type === "video" ? (
              <div
                className="custom-card-item__video-play"
                onClick={handlePlayVideo}
              >
                {images.icon.play}
              </div>
            ) : null}
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
                      {content.tag ? (
                        <div className="wrap-box" style={{ marginBottom: 5 }}>
                          {content.tag.map((value) => (
                            <div
                              className="box-item"
                              style={{
                                color: "white",
                              }}
                            >
                              <span style={{ lineHeight: "10px" }}>
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <>
                          <span className="main">{content.mainName}</span>
                          <span>{content.des}</span>
                        </>
                      )}
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
                <div className="box-last-item">{children}</div>
              </div>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
}
