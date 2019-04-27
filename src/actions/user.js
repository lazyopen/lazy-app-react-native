import {createAction} from 'redux-actions';
import * as types from '../constants/ActionTypes';
import * as userService from '../services/user';

export const login = createAction(types.LOGIN, async (data) => {
  return await userService.login(data);
});

export const register = createAction(types.REGISTER, async (data) => {
  return await userService.register(data);
});

export const thirdLogin = createAction(types.THIRD_LOGIN, async (data) => {
  return await userService.thirdLogin(data);
});

export const getUserInfo = createAction(types.GET_USER_INFO, async () => {
  return await userService.getUserInfo();
});

export const getUserAddress = createAction(types.GET_USER_ADDRESS, async () => {
  return await userService.getUserAddress();
});

export const delUserAddress = createAction(types.DEL_USER_ADDRESS, async (payload) => {
  await userService.delUserAddress(payload);
  return payload;
});

export const getUserDoc = createAction(types.GET_USER_DOC, async (data) => {
  return await userService.getUserDoc(data);
}, (data) => {
  return {
    data,
  };
});

export const delUserDoc = createAction(types.DEL_USER_DOC, async (payload) => {
  await userService.delUserDoc(payload);
  return payload;
});

export const modifyUserPassword = function (payload) {
  return {
    type: types.MODIFY_USER_PASSWORD,
    payload,
  };
};

export const logout = function () {
  return {
    type: types.LOGOUT,
  };
};
