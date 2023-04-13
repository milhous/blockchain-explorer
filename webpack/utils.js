import path from 'path';
import fs from 'fs-extra';

// 当前应用路径
const appDir = fs.realpathSync(process.cwd());

// 路径或路径片段的序列解析为应用绝对路径
export const resolveAppPath = appPath => path.resolve(appDir, appPath);

// 判断是否为目录
export const isDirectory = path => {
  const stat = fs.lstatSync(path);

  return stat.isDirectory();
};

// 判断是否为路径是否存在
export const pathExists = path => {
  const isExisted = fs.pathExistsSync(path);

  return isExisted;
};

/**
 * 获取文件夹名称
 * @param {string} name 目录名称
 */
export const getFolder = name => {
  const _path = resolveAppPath(name);
  const dirInfo = readDirInfo(_path);
  const res = new Map();

  for (const name of dirInfo) {
    const dir = `${_path}/${name}`;

    if (isDirectory(dir)) {
      res.set(name, dir);
    }
  }

  return res;
};

/**
 * 获取目录信息
 * @param {string} path 目录路径
 */
export const readDirInfo = path => {
  const reg = new RegExp(/\.DS_Store|node_modules$/);
  const isExist = fs.pathExistsSync(path);

  if (!isExist) {
    return [];
  }

  let dirInfo = fs.readdirSync(path);

  dirInfo = dirInfo.filter(item => {
    return !reg.test(item);
  });

  return dirInfo;
};
