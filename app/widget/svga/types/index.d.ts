declare module '*.svga';

declare interface IWidgetSvgaProps {
  className?: string;
  url: string;
  time?: number;
  onStart?: (ele: HTMLCanvasElement) => void;
  onProcess?: () => void;
  onEnd?: () => void;
}
