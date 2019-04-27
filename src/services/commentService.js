import request from '../util/request';
import config from '../config';
const {comment} = config.api;

export function getComment(data) {
  return request({
    url: comment,
    method: 'get',
    data,
  });
}

export function addComment(data) {
  return request({
    url: comment,
    method: 'post',
    data,
  });
}

export function modifyComment(data) {
  return request({
    url: comment,
    method: 'put',
    data,
  });
}

export function delComment(data) {
  return request({
    url: comment,
    method: 'delete',
    data,
  });
}
