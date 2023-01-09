import React from "react";
import routes from "../config/routes";
import ForgotPassword from "../view/Auth/ForgotPassword";
import Login from "../view/Auth/Login";
import Profile from "../view/Auth/Profile";
import ResetPassword from "../view/Auth/ResetPassword";

import DevicePage from "../view/DevicePage";
import AddDevice from "../view/DevicePage/components/AddDevice";
import DetailDevice from "../view/DevicePage/components/DetailDevice";
import Device from "../view/DevicePage/components/Device";
import DetailProvideNumbersInDevice from "../view/DevicePage/components/ListProvideNumber/DetailProvideNumbersInDevice";
import UpdateDevice from "../view/DevicePage/components/UpdateDevice";
import Homepage from "../view/Homepage";
import Contracts from "../view/Manage/Contracts";
import CreateContract from "../view/Manage/Contracts/components/CreateContract";
import DefaultContracts from "../view/Manage/Contracts/components/DefaultContracts";
import Playlist from "../view/Playlist";
import AddPlaylist from "../view/Playlist/component/AddPlaylist";
import DefaultPlaylist from "../view/Playlist/component/DefaultPlaylist";
import DetailPlaylist from "../view/Playlist/component/DetailPlaylist";
import ProvideNumberPage from "../view/ProvideNumbersPage";
import ProvideNewNumber from "../view/ProvideNumbersPage/component/ProvideNewNumber";
import ProvideNumbers from "../view/ProvideNumbersPage/component/ProvideNumbers";
import RecordStore from "../view/RecordStore";
import DefaultRecordStore from "../view/RecordStore/component/DefaultRecordStore";
import ManagerApproval from "../view/RecordStore/component/ManagerApproval";
import UpdateRecord from "../view/RecordStore/component/UpdateRecord";
import ReportPage from "../view/ReportPage";
import Report from "../view/ReportPage/Components/Report";
import Schedule from "../view/Schedule";
import DefaultSchedule from "../view/Schedule/components/DefaultSchedule";
import DetailSchedule from "../view/Schedule/components/DetailSchedule";
import UpdateSchedule from "../view/Schedule/components/UpdateSchedule";
import ServicePage from "../view/ServicePage";
import AddService from "../view/ServicePage/components/AddService";
import DetailService from "../view/ServicePage/components/DetailService";
import Service from "../view/ServicePage/components/Service";
import UpdateService from "../view/ServicePage/components/UpdateService";
import AccountManagementPage from "../view/Setting/AccountManagement";
import AccountManagement from "../view/Setting/AccountManagement/components/AccountManagement";
import AddAccount from "../view/Setting/AccountManagement/components/AddAccount";
import UpdateAccount from "../view/Setting/AccountManagement/components/UpdateAccount";
import { RoleManagementPage } from "../view/Setting/RoleManagement";
import AddRole from "../view/Setting/RoleManagement/components/AddRole";
import RoleManagement from "../view/Setting/RoleManagement/components/RoleManagement";
import UpdateRole from "../view/Setting/RoleManagement/components/UpdateRole";
import UserLogManagementPage from "../view/Setting/UserLogManagement";
import UserLogManegement from "../view/Setting/UserLogManagement/components/TableUserLogManagement/UserLogManegement";
type routeType = {
  permisioncode?: string;
  path: string;
  component: React.ReactElement;
  children?: {
    path: string;
    component: React.ReactElement;
    permisioncode?: string;
  }[];
};
export const privateRoutes: routeType[] = [
  {
    path: routes.playlist,
    component: <Playlist />,
    children: [
      { path: "", component: <DefaultPlaylist /> },
      { path: "add", component: <AddPlaylist /> },
      {
        path: "update/:id",
        component: <UpdateDevice />,
      },
      {
        path: "detail/:id",
        component: <DetailPlaylist />,
      },
      {
        path: "providenumbers/:id",
        component: <DetailProvideNumbersInDevice />,
      },
    ],
  },
  {
    path: routes.recordStore,
    component: <RecordStore />,
    children: [
      { path: "", component: <DefaultRecordStore /> },
      { path: "play/:id", component: <DefaultRecordStore /> },
      {
        path: "manager-approval",
        component: <ManagerApproval />,
      },
      {
        path: "manager-approval/:id",
        component: <ManagerApproval />,
      },
      {
        path: "update/:id",
        component: <UpdateRecord />,
      },
      // {
      //   path: "update/:id",
      //   component: <UpdateService />,
      //   permisioncode: "updateService",
      // },
    ],
  },
  {
    path: routes.schedule,
    component: <Schedule />,
    children: [
      {
        path: "",
        component: <DefaultSchedule />,
      },
      {
        path: "detail/:id",
        component: <DetailSchedule />,
      },

      {
        path: "update/:id",
        component: <UpdateSchedule />,
      },
      {
        path: "create",
        component: <ProvideNewNumber />,
        permisioncode: "addProvideNumber",
      },
    ],
  },

  {
    path: routes.contract,
    component: <Contracts />,
    children: [
      {
        path: "",
        component: <DefaultContracts />,
      },
      {
        path: "detail/:id",
        component: <DetailSchedule />,
      },

      {
        path: "add/:id",
        component: <CreateContract />,
      },
      {
        path: "create/:id",
        component: <ProvideNewNumber />,
        permisioncode: "addProvideNumber",
      },
    ],
  },
  {
    path: routes.report,
    component: <ReportPage />,
    children: [{ path: "", component: <Report /> }],
  },
  {
    path: routes.settingRole,
    component: <RoleManagementPage />,
    children: [
      { path: "", component: <RoleManagement />, permisioncode: "readRoles" },
      { path: "add", component: <AddRole />, permisioncode: "addRole" },
      {
        path: "update/:id",
        component: <UpdateRole />,
        permisioncode: "updateRole",
      },
    ],
  },
  {
    path: routes.settingAccount,
    component: <AccountManagementPage />,
    children: [
      {
        path: "",
        component: <AccountManagement />,
        permisioncode: "readAccounts",
      },
      { path: "add", component: <AddAccount />, permisioncode: "addAccount" },
      {
        path: "update/:id",
        component: <UpdateAccount />,
        permisioncode: "updateAccount",
      },
    ],
  },
  {
    path: routes.settingUserLog,
    component: <UserLogManagementPage />,
    children: [{ path: "", component: <UserLogManegement /> }],
  },

  //auth

  { path: routes.profile, component: <Profile /> },
];

export const publicRoutes: routeType[] = [
  //auth
  { path: routes.login, component: <Login /> },
  { path: routes.forgotPassWord, component: <ForgotPassword /> },
  { path: routes.reset, component: <ResetPassword /> },
];
