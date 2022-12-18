// import profileStore, { setToken } from "./profileStore";
// import authenticationRepository from "./repository";

// const authenticationPresenter = { ...authenticationRepository };

// authenticationPresenter.login = async (
//   payload: any,
//   remember = false
// ) => {
//   const token = await authenticationRepository.login(payload);
//   store.dispatch(setToken({ token, remember }));
//   return token;
// };

// authenticationPresenter.getProfile = () => {
//   return authenticationRepository.getProfile().then((user: UserEntity) => {
//     store.dispatch(profileStore.actions.fetchProfile({ user }));
//     return Promise.resolve(user);
//   });
// };

// export default authenticationPresenter;
import React from "react";

export default function presenter() {
  return <div>presenter</div>;
}
