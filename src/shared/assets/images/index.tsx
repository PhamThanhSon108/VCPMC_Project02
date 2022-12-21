import IconAddDevice from "./icons/IconAddDevice";
import IconArrow from "./icons/IconArrow";
import IconBell from "./icons/IconBell";
import IconChangePassword from "./icons/IconChangePassword";
import IconCheatsheet from "./icons/IconCheatsheet";
import IconCompact from "./icons/IconCompact";
import IconDashBoard from "./icons/IconDashBoard";
import IconDevice from "./icons/IconDevice";
import { IconDownLoadFile } from "./icons/IconDownLoadFile";
import IconLogout from "./icons/IconLogout";
import IconManage from "./icons/IconManage";
import IconModifyInfor from "./icons/IconModifyInfor";
import IconNumericalOrder from "./icons/IconNumericalOrder";
import IconNumericalorderSkiped from "./icons/IconNumericalorderSkiped";
import IconNumericalorderUsed from "./icons/IconNumericalorderUsed";
import IconNumericalorderWait from "./icons/IconNumericalorderWait";
import IconNums from "./icons/IconNums";
import IconPlay from "./icons/IconPlay";
import IconPlaylist from "./icons/IconPlaylist";
import IconReport from "./icons/IconReport";
import IconSchedule from "./icons/IconSchedule";
import IconSetting from "./icons/IconSetting";
import IconSevice from "./icons/IconSevice";
import IconVietnamese from "./icons/IconVietnamese";
import RecordStore from "./icons/RecordStore";
import ImageFogotPassword from "./temps/ImageFogotPassword";
import ImageLogin from "./temps/ImageLogin";

export const images = {
  logo: require("./logo.svg").default,
  icon: {
    recordStore: <RecordStore />,
    playlist: <IconPlaylist />,
    schedule: <IconSchedule />,
    manage: <IconManage />,
    logoVietnamese: <IconVietnamese />,
    modifyInformation: <IconModifyInfor />,
    changePassword: <IconChangePassword />,
    logout: <IconLogout />,
    cheatSheet: <IconCheatsheet />,
    compact: <IconCompact />,
    play: <IconPlay />,

    dashboard: <IconDashBoard />,
    setting: <IconSetting />,
    nums: <IconNums />,
    report: <IconReport />,
    device: <IconDevice />,
    service: <IconSevice />,
    bell: <IconBell />,
    arrow: <IconArrow styles={{ color: "#FF7506" }} />,
    numericalorderwait: <IconNumericalorderWait />,
    numericalorderused: <IconNumericalorderUsed />,
    numericalorderskiped: <IconNumericalorderSkiped />,
    numericalorder: <IconNumericalOrder />,
    addDevice: <IconAddDevice />,
    downLoadFile: <IconDownLoadFile />,
  },
  temp: {
    login: <ImageLogin />,
    fogotPassword: <ImageFogotPassword />,
  },
};
