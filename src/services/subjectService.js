import request from '../util/request';
import config from '../config';
const {subject, subjectDoc} = config.api;

export function getSubject(data) {
  return request({
    url: subject,
    method: 'get',
    data,
  });
}

export function addSubject(data) {
  return request({
    url: subject,
    method: 'post',
    data,
  });
}

export function modifySubject(data) {
  return request({
    url: subject,
    method: 'put',
    data,
  });
}

export function delSubject(data) {
  return request({
    url: subject,
    method: 'delete',
    data,
  });
}

export function getSubjectDoc(data) {
  return request({
    url: subjectDoc,
    method: 'get',
    data,
  });
}

export function addSubjectDoc(data) {
  return request({
    url: subjectDoc,
    method: 'post',
    data,
  });
}

export function modifySubjectDoc(data) {
  return request({
    url: subjectDoc,
    method: 'put',
    data,
  });
}

export function delSubjectDoc(data) {
  return request({
    url: subjectDoc,
    method: 'delete',
    data,
  });
}
