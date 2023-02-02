import { Row } from "antd";
import Layout, { Content, Header } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import HeaderLayout from "../../../layout/Header";
import UserHeader from "../../../layout/Header/UserHeader";

import Sidebar from "../../../layout/Sidebar";
import profileStore from "../../../modules/authentication/profileStore";
import { getProfile } from "../../../modules/authentication/repository";
import { useAppDispatch, useAppSelector } from "../../../shared/hooks";
import Overview from "../../../view/Homepage/Overview";

import "./DefaultLayout.scss";
type DefaultLayoutProps = {
  children: React.ReactNode;
  dashboard: boolean;
};
export default function DefaultLayout({
  children,
  dashboard,
}: DefaultLayoutProps) {
  const location = useLocation();
  const user = useAppSelector((state) => state.profile.user);
  const [collapsed, setCollapsed] = useState(
    location.pathname.includes("manager-approval")
  );
  const pathToHide = [
    "record-store/update/",
    "/playlist/add",
    "/contract/detail/",
  ];
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (
      !!pathToHide.find((item) => location.pathname.includes(item)) &&
      !collapsed
    ) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  }, [location.pathname]);
  useEffect(() => {
    if (!user) {
      getProfile()
        .then((user) => {
          console.log(user);
          dispatch(profileStore.actions.fetchProfile({ user: user }));
        })
        .catch((mes) => {})
        .finally(() => {
          console.log("fetch profile");
        });
    }
  }, []);
  return (
    <>
      <Row className="wrap">
        <Sider
          width={170}
          collapsible
          collapsed={collapsed}
          collapsedWidth={20}
          className="sider__left"
          // style={{
          //   width: "170px",
          //   // maxWidth: "170px",
          //   minWidth: "none",
          //   flex: "none",
          // }}
          onCollapse={() => {
            setCollapsed(false);
          }}
        >
          <Sidebar />
        </Sider>
        {dashboard ? (
          <>
            <Layout
              className="body"
              style={{ width: "calc(100vw - 170px - 400px)" }}
            >
              <Layout>
                <Header className="header" style={{ alignItems: "flex-end" }}>
                  <HeaderLayout />
                </Header>
                <Content className="body-contain-wrap">{children}</Content>
              </Layout>
            </Layout>
            <Layout className="body__right">
              <Header
                className="header"
                style={{
                  backgroundColor: "white",
                  height: "80px",
                  // marginBottom: "29px",
                }}
              >
                <UserHeader />
              </Header>
              <Overview />
            </Layout>
          </>
        ) : (
          <>
            <Layout className="body" style={{ width: "calc(100vw - 170px)" }}>
              <Layout>
                <Header
                  className="header"
                  style={{ alignItems: "flex-end", height: "80px" }}
                >
                  <HeaderLayout />
                  <UserHeader />
                </Header>
                <Content className="body-contain-wrap">{children}</Content>
              </Layout>
            </Layout>
          </>
        )}
      </Row>
    </>
  );
}
