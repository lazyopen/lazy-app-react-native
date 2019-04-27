import request from '../util/request';
import config from '../config';
const {uploadFile} = config.api;

export function upload(data) {
  return request({
    url: uploadFile,
    method: 'upload',
    data,
  });
}
