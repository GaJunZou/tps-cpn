/**
 * 获取对象数组中重复的项（[1,1,2] 会返回 [1]）。
 * @param {*} origin 源数组
 * @param {*} field 数组项中用于判断是否重复的字段
 */
export const getDuplicateItem = (origin, field) => {
  return duplicate(origin, field, 'get');
};

/**
 * 去除对象数组中重复的项（[1,1,2] 会返回 [1,2]）。
 * @param {*} origin 源数组
 * @param {*} field 数组项中用于判断是否重复的字段
 */
export const removeDuplicateItem = (origin, field) => {
  return duplicate(origin, field, 'remove');
};

/**
 * 消除对象数组中重复的项（[1,1,2] 会返回 [2]）。
 * @param {*} origin 源数组
 * @param {*} field 数组项中用于判断是否重复的字段
 */
export const deleteDuplicateItem = (origin, field) => {
  return duplicate(origin, field, 'delete');
};

/**
 * 重复的数组数组。为对象数组时需要 value 判断数组项是否相等。
 * @param {*} origin 源数组
 * @param {*} filed 数组项中用于判断是否重复的字段
 * @param {*} type 返回何种类型: 'get': 返回重复数组；'remove': 返回去重后的源数组；'delete': 返回删除重复项后的源数组。
 */
function duplicate(origin, filed, type) {
  if (!filed) {
    return Array.from(new Set(origin));
  } else {
    if (type === 'delete') {
      let list = [];
      for (let i = 0; i < origin.length; i++) {
        for (let j = i + 1; j < origin.length; j++) {
          if (origin[j][filed] == origin[i][filed]) {
            list.push(i);
            list.push(j);
          }
        }
      }
      list = Array.from(new Set(list));
      list.forEach((v) => origin.splice(v, 1, null));
      return origin.filter(Boolean);
    } else {
      let list = []; // 重合部分
      for (let i = 0; i < origin.length; i++) {
        for (let j = i + 1; j < origin.length; j++) {
          if (origin[j][filed] == origin[i][filed]) {
            list.push(...origin.splice(j, 1));
            j--;
          }
        }
      }
      return type === 'get' ? list : origin;
    }
  }
}

/**
 * 获取URL参数
 * @param {*参数名} name
 * @returns
 */
export const GetQueryString = (name) => {
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  const matchStr = window.location.href.split('?')[1];
  if (matchStr) {
    const r = matchStr.match(reg);
    if (r !== null) return unescape(r[2]);
    return null;
  } else {
    return null;
  }
};

/**
 * 验证字段值是否不为空
 * @param data 要验证的字段值
 * @returns 为空返回false,不为空返回true
 */
export const isNotEmpty = (data) => {
  if (data === null || data === undefined) {
    return false;
  }
  if (typeof data === 'string' && data.trim() === '') {
    return false;
  }
  if (Array.isArray(data) && data.length === 0) {
    return false;
  }
  if (Object.prototype.toString.call(data) === '[object Object]' && Object.keys(data).length === 0) {
    return false;
  }
  return true;
};

/**
 * 验证字段值是否为空
 * @param data 要验证的字段值
 * @returns 为空返回true,不为空返回false
 */
export const isEmpty = (data) => {
  return !isNotEmpty(data);
};

/**
 *
 * @param fn 防抖函数
 * @param delay 等待时长
 * @returns 执行防抖函数
 */
export function debounce(fn, delay) {
  let timer = null; //注意点1：借助闭包
  return function (...args) {
    if (timer) clearTimeout(timer); //注意点2：清除定时器
    timer = setTimeout(() => {
      fn.apply(this, args); //注意点3：setTimout会发生this隐式丢失；改变this指向为调用debounce所指的对象。
    }, delay);
  };
}

/**
 * 下载文件
 * @param {*文件的blob数据} blob
 * @param {*下载文件名} filename
 */
export function downloadFile(blob, filename) {
  const a = document.createElement('a');
  const url = window.URL.createObjectURL(new Blob([blob]));
  const name = filename || '';
  a.href = url;
  a.download = name;
  a.click();
  window.URL.revokeObjectURL(url);
}

/**
 * 格式化时间
 * @param date 时间对象
 * @param fmt 格式化类型
 * @returns 格式化的时间格式
 */
export const dateFormat = (date, fmt) => {
  const o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds(), // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return fmt;
};
