import {NextResponse} from 'next/server';

import {redisService} from '@libs/services';

export const dynamic = 'force-dynamic';

export async function GET() {
  const responseStream = new TransformStream();
  const writer = responseStream.writable.getWriter();

  redisService.subscribe(
    async (message: string) => {
      await writer.write(`data: ${message}\n\n`);
    },
    async () => {
      await writer.close();
    },
  );

  return new NextResponse(responseStream.readable, {
    headers: {
      'Content-Type': 'text/event-stream',
      Connection: 'keep-alive',
      'Cache-Control': 'no-cache, no-transform',
    },
  });
}
