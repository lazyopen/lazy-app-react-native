import axios from 'axios';
import lodash from 'lodash';
import { Toast, ModalIndicator } from 'teaset';
import cfg from '../config';

const ignoreUrl = (url) => {
  return url.indexOf('auth') === -1 && url.indexOf('logout') === -1 && url.indexOf('upload') === -1;
};

const fetch = (options) => {
  let {
    method = 'get',
    data,
    url,
  } = options;
  let { token, timestamp, user = {} } = options.state;
  // console.log('options', options);
  // console.log('ignoreUrl(url)', ignoreUrl(url));
  if (token != null) {
    axios.defaults.headers['ACCESS-ROLE-TYPE'] = 1;
    axios.defaults.headers['ACCESS-USER'] = user.username;
    axios.defaults.headers['ACCESS-TOKEN'] = token;
    axios.defaults.headers['ACCESS-TIMESTAMP'] = timestamp;
  }
  const cloneData = method === 'upload' ? data : lodash.cloneDeep(data);
  let serverUrl = cfg.domain + cfg.apiPath;
  url = serverUrl + url;
  if (ignoreUrl(url)) {
    url += `/${method.toLowerCase()}`;
  }
  // console.log('url', url);
  // console.log('cloneData', cloneData);
  switch (method.toLowerCase()) {
    case 'get':
      return axios.get(url, {
        params: cloneData,
      });
    case 'delete':
      return axios.delete(url, {
        data: cloneData,
      });
    case 'post':
      return axios.post(url, cloneData);
    case 'put':
      return axios.put(url, cloneData);
    case 'patch':
      return axios.patch(url, cloneData);
    case 'upload':
      let param = new FormData();
      data.forEach((item) => {
        let {key, uri} = item;
        param.append(key, {uri: uri, type: 'multipart/form-data', name: uri.substring(uri.lastIndexOf('/') + 1)});
      });
      return axios.post(url, param, {
        headers: {'Content-Type': 'multipart/form-data'},
      });
    default:
      return axios(options);
  }
};

export default function request(options) {
  // console.log('global.store', global.store);
  let {getState, dispatch} = global.store;
  options.state = getState().user;
  // console.log('options.state', options.state);
  // let { loading = true } = options;
  // if (loading) {
  //   Toast.loading('处理中...', 0);
  // }
  return fetch(options).then((response) => {
    const { data } = response;
    ModalIndicator.hide();
    if (data.code === '00000') {
      return data.body || {};
    } else if (data.code === 'E1001') {
      dispatch({type: 'LOGOUT'});
    } else {
      Toast.info(data.msg);
    }
    return false;
  }).catch((error) => {
    ModalIndicator.hide();
    const { response } = error;
    if (response && response instanceof Object) {
      Toast.sad('服务器繁忙，请稍后再试');
    } else {
      Toast.sad('网络异常，请检查网络');
    }
  });
}
