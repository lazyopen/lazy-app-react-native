import {Dimensions, Linking, PixelRatio} from 'react-native';
import cfg from '../config';
import images from '../images';
// const deviceH = Dimensions.get('window').height;
const deviceW = Dimensions.get('window').width;
const basePx = 375;
const colors = ['#E74C3C', '#C0392B', '#1ABC9C',
  '#16A085', '#2ECC71', '#27AE60', '#3498DB',
  '#2980B9', '#9B59B6', '#8E44AD', '#34495E',
  '#2C3E50', '#E67E22',
  '#D35400', '#7F8C8D'];

export default function px2dp (px) {
  // return px * deviceW / basePx;
  return PixelRatio.roundToNearestPixel(px);
}
export function size() {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  };
};

export function getSimpleTxt(txt) {
  let punctuation = ',.?;:"\'!，。？；：”“‘’';
  //  true, 汉字
  let chinese = new RegExp('[\\u4E00-\\u9FFF]+', 'g');
  //  true, 英文字母或数字
  //  let letterOrnumber = /[0-9a-z]/i;
  let simpleTxt = '';
  for (let i = 0; i < txt.length && simpleTxt.length < 80; i++) {
    let word = txt.substring(i, i + 1);
    if (punctuation.indexOf(word) !== -1 || chinese.test(word)) {
      simpleTxt += word;
    }
  }
  return simpleTxt;
};

export function parseImgUrl(url) {
  if (url) {
    if (url.startsWith('local:')) {
      return images[url.substring(6)];
    }
    let fileType = url.substring(url.lastIndexOf('.')).toLowerCase();
    if (fileType === '.jpg' || fileType === '.png') {
      url = url.substring(0, url.lastIndexOf('.')) + '_540x720' + url.substring(url.lastIndexOf('.'));
    }
    let uri = url.startsWith('http') ? url : cfg.domain + '/files/' + url;
    return {
      uri,
    };
  }
}

function getRandomNum (Min, Max) {
  const Range = Max - Min;
  const Rand = Math.random();
  return (Min + Math.round(Rand * Range));
}

export function genColor () {
  return colors[getRandomNum(0, colors.length - 1)];
}

export function geColor () {
  return colors[getRandomNum(0, colors.length - 1)];
}

export function link (url) {
  Linking.canOpenURL(url).then(supported => {
    if (supported) {
      return Linking.openURL(url);
    }
  })
    .catch(err => {
      console.error('An error occurred', err);
    });
}

export function removeListItem(list, item) {
  // console.log('list', list);
  // console.log('item', item);
  let index = list.indexOf(item);
  if (index > -1) {
    list.splice(index, 1);
  }
  return list;
};

export function setGlobalStore (store) {
  global.store = store;
}

export function computeTime(time, fmt) {
  const oldTime = new Date(time).getTime();
  const currTime = new Date().getTime();
  const diffValue = currTime - oldTime;
  const days = Math.floor(diffValue / (24 * 3600 * 1000));
  if (days === 0) {
    // 计算相差小时数
    const leave1 = diffValue % (24 * 3600 * 1000); // 计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600 * 1000));
    if (hours === 0) {
      // 计算相差分钟数
      const leave2 = leave1 % (3600 * 1000); // 计算小时数后剩余的毫秒数
      const minutes = Math.floor(leave2 / (60 * 1000));
      if (minutes === 0) {
        // 计算相差秒数
        const leave3 = leave2 % (60 * 1000); // 计算分钟数后剩余的毫秒数
        const seconds = Math.round(leave3 / 1000);
        if (seconds <= 10) {
          return '刚刚';
        }
        return seconds + '秒前';
      }
      return minutes + '分钟前';
    }
    return hours + '小时前';
  }
  if (days > 1 && days < 7) {
    return days + '天前';
  }
  return fmtLongDate(time, fmt || 'MM-dd HH:mm');
}

export function fmtLongDate(e, fmt) {
  if (e == null || e === '') {
    return '暂无信息';
  }
  return new Date(e).pattern(fmt || 'yyyy-MM-dd HH:mm:ss');
}

Date.prototype.pattern = function(fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours() % 12 === 0 ? 12 : this.getHours() % 12, // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds(), // 毫秒
  };
  var week = {
    '0': '日',
    '1': '一',
    '2': '二',
    '3': '三',
    '4': '四',
    '5': '五',
    '6': '六',
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '') + week[this.getDay() + '']);
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
    }
  }
  return fmt;
};
