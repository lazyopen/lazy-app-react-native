import request from '../util/request';
import config from '../config';
const {homeConfig, apiManual} = config.api;

export function getHomeConfig() {
  return request({
    url: homeConfig,
    method: 'get',
  });
}

export function getApiManualList() {
  return request({
    url: apiManual,
    method: 'get',
  });
}

export function downApiManual(id) {
  return request({
    url: apiManual + '/' + id,
    method: 'get',
  });
}
