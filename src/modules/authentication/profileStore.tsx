import {
  createAction,
  createSlice,
  PayloadAction,
  Selector,
} from "@reduxjs/toolkit";
import UserEntity from "../user/entity";

type RootState = any;
interface IStore {
  statusLogin?: boolean;
  user?: UserEntity;
  listPermissionCode?: Array<string>;
}
export const removeProfile = createAction("authentication/removeProfile");
export const setToken = createAction<{ token: any; remember: boolean }>(
  "authentication/setToken"
);
export const updateProfileInStore = createAction<{ user: any }>(
  "authentication/getProfile"
);

interface IStore {
  statusLogin?: boolean;
  user?: UserEntity;
  listPermissionCode?: Array<string>;
  linkImage?: string;
  token?: string;
  remember: boolean;
}

const profileStore = createSlice({
  name: "profileStore",
  initialState: {
    statusLogin: false,
    user: null,
    linkImage: "",
    listPermissionCode: [],
    token: null,
    remember: false,
  } as unknown as IStore,
  reducers: {
    fetchProfile: (
      state,
      action: PayloadAction<{
        user?: any;
        listPermissionCode?: string[];
      }>
    ) => {
      Object.assign(state, {
        statusLogin: action.payload.user != null,
        user: action.payload.user,
        listPermissionCode: action.payload.user?.role || [],
      });
    },
    updateProfile: (
      state,
      action: PayloadAction<{
        listPermissionCode?: string[];
        statusLogin?: boolean;
      }>
    ) => Object.assign(state, action.payload),
    saveImageGroup: (state, action) => {
      return {
        ...state,
        linkImage: action.payload,
      };
    },
    logOut: (state: any) => {
      return {
        ...state,
        statusLogin: false,
        user: null,
        token: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(removeProfile, (state: any) => {
        return {
          ...state,
          statusLogin: false,
          user: null,
          listPermissionCode: [],
          token: null,
          remember: false,
        };
      })
      .addCase(setToken, (state, action) =>
        Object.assign(state, action.payload, {
          statusLogin: !action.payload.token,
        })
      )
      .addCase(updateProfileInStore, (state, action) => {
        const role = action.payload.user?.role;
        delete role.createdAt;
        delete role.updatedAt;

        return Object.assign(state, action.payload, {
          user: action.payload.user,
          listPermissionCode: Object.values(role).reduce(
            (result: Array<string> | any, cur: any) => {
              if (typeof cur == "object" && Object.values(cur).length !== 0) {
                result = [...result, ...Object.keys(cur)];
              }
              return result;
            },
            []
          ),
        });
      });
  },
});

interface IToken {
  token: string;
  status: boolean;
}

export const TokenSelector: Selector<RootState, IToken> = (state) => {
  return {
    token: state.profile.token || "",
    status: state.profile.statusLogin || false,
  };
};

interface IUser {
  user?: UserEntity;
  status: boolean;
}

export const UserSelector: Selector<RootState, IUser> = (state) => {
  return {
    user: state.profile.user,
    status: state.profile.statusLogin || false,
  };
};

interface IPermissions {
  listPermissionCode: string[];
  status: boolean;
}
export const PermissionsSelector: Selector<RootState, IPermissions> = (
  state
) => {
  return {
    listPermissionCode: state.profile.listPermissionCode || [],
    status: state.profile.statusLogin || false,
  };
};

export default profileStore;
