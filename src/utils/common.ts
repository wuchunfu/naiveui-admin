import { $t } from '@/locales';
import dayjs from 'dayjs'

/**
 * Transform record to option
 *
 * @example
 *   ```ts
 *   const record = {
 *     key1: 'label1',
 *     key2: 'label2'
 *   };
 *   const options = transformRecordToOption(record);
 *   // [
 *   //   { value: 'key1', label: 'label1' },
 *   //   { value: 'key2', label: 'label2' }
 *   // ]
 *   ```;
 *
 * @param record
 */
export function transformRecordToOption<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as CommonType.Option<keyof T>[];
}

export function transformRecordToI18n<T extends Record<string, string>>(record: T) {
  return Object.entries(record).map(([value, label]) => ({
    value,
    label
  })) as Record<string, I18n.I18nKey>[];
}

/**
 * Translate options
 *
 * @param options
 */
export const translateOptions = (
  options: CommonType.Option<string>[]
): { label: string; value: string; }[] => {
  return options.map(option => ({
    ...option,
    label: $t(option.label as I18n.I18nKey)
  }));
};

/**
 * Toggle html class
 *
 * @param className
 */
export const toggleHtmlClass = (className: string) => {
  function add() {
    document.documentElement.classList.add(className);
  }

  function remove() {
    document.documentElement.classList.remove(className);
  }

  return {
    add,
    remove
  };
};

/**
 * @param {(object | string | number)} time
 * @param {string} format
 * @returns {string | null} 格式化后的时间字符串
 *
 */
export const formatDateTime = (
  time: number | string | Date | undefined = undefined,
  format: string = 'YYYY-MM-DD HH:mm:ss'
): string | null => {
  return dayjs(time).format(format)
};

export const formatDate = (
  date: number | string | Date | undefined = undefined,
  format: string = 'YYYY-MM-DD'
): string | null => {
  return formatDateTime(date, format)
};

/**
 * @param {number} time 毫秒数
 * @returns 睡一会儿，让子弹暂停一下
 */
export const sleep = (time: number): Promise<any> => {
  return new Promise(resolve => setTimeout(resolve, time))
};

/**
 * @param {HTMLElement} el
 * @param {Function} cb
 * @return {ResizeObserver}
 */
export const useResize = (el: Element, cb: Function): ResizeObserver => {
  const observer = new ResizeObserver((entries) => {
    cb(entries[0].contentRect)
  })
  observer.observe(el)
  return observer
};

export const regards = (name: string = 'Admin'): string => {
  let str = ''
  const hour = new Date().getHours()
  if (hour >= 5 && hour <= 11) {
    // 早上
    str = `早安，${ name }，一日之计在于晨，越早预约办理，越早通过！`
  } else if (hour > 11 && hour <= 14) {
    // 中午
    str = `中午好，${ name }，午休时间,您要保持睡眠哦！`
  } else if (hour > 14 && hour <= 19) {
    // 下午
    str = `下午好，${ name }，祝您下午工作愉快！`
  } else if (hour > 19 && hour <= 23) {
    // 傍晚
    str = `晚上好，${ name }，辛勤劳动了一天早点休息吧！`
  } else if (hour >= 0 && hour < 5) {
    // 深夜
    str = `现在已经是深夜，${ name } 别熬夜了，赶紧休息吧`
  }
  return str
};

/**
 * base64 转 Blob
 * @param base64 base64数据
 * @returns blob
 */
export const base64ToBlob = (base64: string): Blob => {
  const arr = base64.split(',');
  const match = arr[0].match(/:(.*?);/);
  const mime = match ? match[1] : '';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

/**
 * 下载文件
 * @param fileUrl 文件URL
 * @param fileName 文件名称
 */
export const downloadFile = (fileUrl: string, fileName: string) => {
  const a = document.createElement('a');
  a.href = fileUrl;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
