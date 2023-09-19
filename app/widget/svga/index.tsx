'use client';

import dynamic from 'next/dynamic';

const Svga = dynamic(() => import('./Svga'), {
  ssr: false,
});

// Svga
export default function WidgetSvga(props: IWidgetSvgaProps) {
  return <Svga {...props} />;
}
