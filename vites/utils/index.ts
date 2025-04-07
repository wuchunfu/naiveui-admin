import path from 'path';
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

/**
 * 获取项目根路径
 * @descrition 末尾不带斜杠
 */
export const getRootPath = () => {
  return path.resolve(process.cwd());
};

/**
 * 获取项目src路径
 * @param srcName - src目录名称(默认: "src")
 * @descrition 末尾不带斜杠
 */
export const getSrcPath = (srcName = 'src') => {
  const rootPath = getRootPath();
  return path.join(rootPath, srcName);
};

/**
 * 获取项目src路径下的文件路径
 * @param joinPath - 文件路径
 */
export const getSrcJoinPath = (joinPath = '') => {
  const srcPath = getSrcPath();
  return path.join(srcPath, joinPath);
};

export const getBuildTime = () => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  return dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
};
