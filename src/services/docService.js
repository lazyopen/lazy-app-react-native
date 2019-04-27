import request from '../util/request';
import config from '../config';
const {doc, docUserRelation} = config.api;

export function getDoc(data) {
  return request({
    url: doc,
    method: 'get',
    data,
  });
}

export function getDocUserRelation(data) {
  return request({
    url: docUserRelation,
    method: 'get',
    data,
  });
}

export function addDocUserRelation(data) {
  return request({
    url: docUserRelation,
    method: 'post',
    data,
  });
}

export function delDocUserRelation(data) {
  return request({
    url: docUserRelation,
    method: 'delete',
    data,
  });
}
