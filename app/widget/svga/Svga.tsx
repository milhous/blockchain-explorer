'use client';

import {useEffect, useState, useRef} from 'react';
import {Parser, Player, DB} from 'svga';

// 数据集合
const dataMap: Map<string, any> = new Map();
// IndexedDB
let db: any = null;

try {
  db = new DB();
} catch (error) {
  console.error(error);
}

/**
 * 通过下载获取播放数据
 * @param {string} file 文件
 */
const getDataWidthDownLoader = async (file: string): Promise<any> => {
  let svga;

  if (dataMap.has(file)) {
    svga = dataMap.get(file);
  } else {
    const parser = new Parser({isDisableImageBitmapShim: true});

    svga = await parser.load(file);

    dataMap.set(file, svga);

    parser.destroy();
  }

  return svga;
};

/**
 * 通过IndexedDB获取数据
 * @param {string} file 文件
 */
const getDataWidthDB = async (file: string): Promise<any> => {
  let svga = await db.find(file);

  if (!svga) {
    svga = await getDataWidthDownLoader(file);

    await db.insert(file, svga);
  }

  return svga;
};

/**
 * 播放
 * @param {Player} params.player 播放器
 * @param {string} params.file 文件
 * @param {string} params.id 唯一标识
 * @param {number} params.loop 循环次数
 * @param {function} params.onStart 开始播放事件
 * @param {function} params.onEnd 结束播放事件
 */
const play = async (params: {
  player: Player;
  file: string;
  id: string;
  loop?: number;
  onStart?: (ele: HTMLCanvasElement) => void;
  onEnd?: () => void;
  onProcess?: () => void;
}): Promise<void> => {
  const {player, file, id = '', loop = 0, onStart, onEnd, onProcess} = params;

  let data;

  if (db) {
    data = await getDataWidthDB(file);
  } else {
    data = await getDataWidthDownLoader(file);
  }

  // 监听 - 播放开始
  if (typeof onStart === 'function') {
    player.onStart = () => {
      onStart(document.getElementById(id) as HTMLCanvasElement);
    };
  }

  // 监听 - 播放结束
  if (typeof onEnd === 'function') {
    player.onEnd = () => {
      onEnd();
    };
  }

  // 监听 - 播放结束
  if (typeof onProcess === 'function') {
    player.onProcess = () => {
      onProcess();
    };
  }

  // 设置播放配置
  player.setConfig({loop, isUseIntersectionObserver: true});

  // 清空动画
  player.clear();

  // 设置播放数据
  await player.mount(data);

  player.start();
};

/**
 * 获取UUID
 * @return {string} uuid
 */
const uuid = (): string => {
  return 'r' + Math.random().toString(16).replace('0.', '');
};

// SVGA动画
const Svga = (props: IWidgetSvgaProps) => {
  const {className = '', url, time = 0, onEnd, onStart, onProcess} = props;
  const [id] = useState<string>(uuid());
  const container = useRef();
  const [player, setPlayer] = useState<Player | null>(null);

  useEffect(() => {
    if (container.current) {
      setPlayer(new Player(container.current));
    }

    return () => {
      !!player && player.destroy();
    };
  }, []);

  useEffect(() => {
    if (!!player) {
      play({
        player,
        id,
        file: url,
        loop: time,
        onStart,
        onEnd,
        onProcess,
      });
    }
  }, [url, id, player, time]);

  return <canvas className={`widget-svga ${className}`} ref={container as any} id={id}></canvas>;
};

export default Svga;
