import request from '../util/request';
import config from '../config';
const {message} = config.api;

export function getMessage(data) {
  return request({
    url: message,
    method: 'get',
    data,
  });
}

export function addMessage(data) {
  return request({
    url: message,
    method: 'post',
    data,
  });
}

export function markAsRead(data) {
  return request({
    url: message,
    method: 'put',
    data: {...data, isRead: 1},
  });
}

export function delMessage(data) {
  return request({
    url: message,
    method: 'delete',
    data,
  });
}
