type DataType =
  | 'Number'
  | 'BigInt'
  | 'String'
  | 'Boolean'
  | 'Date'
  | 'Array'
  | 'Object'
  | 'Null'
  | 'Undefined'
  | 'Function'
  | 'RegExp'
  | 'Symbol';

const originToString = Object.prototype.toString

export const is = (obj: any, type: DataType): boolean => {
  return originToString.call(obj) === `[object ${ type }]`
};

export const isDef = (obj: any): boolean => {
  return typeof obj !== 'undefined'
};

export const isUndef = (obj: any): boolean => {
  return typeof obj === 'undefined'
};

export const isWhitespace = (obj: any): boolean => {
  return obj === ''
};

export const isNullOrUndef = (obj: any): boolean => {
  return isNull(obj) || isUndef(obj)
};

export const isNullOrWhitespace = (obj: any): boolean => {
  return isNullOrUndef(obj) || isWhitespace(obj)
};

export const isNull = (obj: any): boolean => {
  return is(obj, 'Null')
};

export const isUndefined = (obj: any): boolean => {
  return is(obj, 'Undefined')
};

export const isNumber = (obj: any): boolean => {
  return is(obj, 'Number')
};

export const isBigInt = (obj: any): boolean => {
  return is(obj, 'BigInt')
};


export const isString = (obj: any): boolean => {
  return is(obj, 'String')
};

export const isBoolean = (obj: any): boolean => {
  return is(obj, 'Boolean')
};

export const isArray = (obj: any): boolean => {
  return is(obj, 'Array')
};

export const isDate = (obj: any): boolean => {
  return is(obj, 'Date')
};

export const isObject = (obj: any): boolean => {
  return !isNull(obj) && is(obj, 'Object')
};

export const isRegExp = (obj: any): boolean => {
  return is(obj, 'RegExp')
};

export const isFunction = (obj: any): boolean => {
  return typeof (obj) === 'function'
};

export const isSymbol = (obj: unknown): boolean => {
  return is(obj, 'Symbol');
};

export const isNumberical = (obj: any): boolean => {
  return !isNaN(parseFloat(obj)) && isFinite(obj)
};

/** 空数组 | 空字符串 | 空对象 | 空Map | 空Set */
export const isEmpty = (obj: any): boolean => {
  if (isArray(obj) || isString(obj)) {
    return obj.length === 0
  }

  if (obj instanceof Map || obj instanceof Set) {
    return obj.size === 0
  }

  if (isObject(obj)) {
    return Object.keys(obj).length === 0
  }

  return false
};
