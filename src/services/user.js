import request from '../util/request';
import config from '../config';
const {userLogin, userRegister, user, userAddress, userDoc, password, code, resetPassword, userThirdLogin} = config.api;

export function login(data) {
  return request({
    url: userLogin,
    method: 'post',
    data,
  });
}

export function thirdLogin(data) {
  return request({
    url: userThirdLogin,
    method: 'post',
    data,
  });
}

export function getUserInfo() {
  return request({
    url: user,
    method: 'get',
  });
}

export function modifyUserInfo(data) {
  return request({
    url: user,
    method: 'put',
    data,
  });
}

export function getUserAddress() {
  return request({
    url: userAddress,
    method: 'get',
  });
}

export function addUserAddress(data) {
  return request({
    url: userAddress,
    method: 'post',
    data,
  });
}

export function modifyUserAddress(data) {
  return request({
    url: userAddress,
    method: 'put',
    data,
  });
}

export function delUserAddress(data) {
  return request({
    url: userAddress,
    method: 'delete',
    data,
  });
}

export function getUserDoc(data) {
  return request({
    url: userDoc,
    method: 'get',
    data,
  });
}

export function addUserDoc(data) {
  return request({
    url: userDoc,
    method: 'post',
    data,
  });
}

export function delUserDoc(data) {
  return request({
    url: userDoc,
    method: 'delete',
    data,
  });
}

export function modifyUserDoc(data) {
  return request({
    url: userDoc,
    method: 'put',
    data,
  });
}

export function modifyUserPassword(data) {
  return request({
    url: password,
    method: 'put',
    data,
  });
}

export function register(data) {
  return request({
    url: userRegister,
    method: 'post',
    data,
  });
}

export function resetPwd(data) {
  return request({
    url: resetPassword,
    method: 'post',
    data,
  });
}

// SMS_118620008注册 SMS_118750014重置密码
export function sendCode(data) {
  return request({
    url: code + '/' + data.phone + '/' + data.smsId,
    method: 'get',
  });
}
