import {NextResponse} from 'next/server';
import crypto from 'crypto';

const getDataTemplate = (title: string, desc: string) => {
  return {
    title,
    description: desc,
    schema: {
      type: 'object',
      properties: {},
    },
  };
};

export async function POST(request: Request) {
  const {data} = await request.json();

  try {
    const metadata = getDataTemplate(data.title, data.desc);

    for (const field of data.fields) {
      metadata.schema.properties[field.name] = {
        type: 'string',
        description: field.desc,
      };
    }

    const str = JSON.stringify(metadata);
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(str));
    const dataHash = hash.digest('hex');

    return NextResponse.json({metadata: str, dataHash});
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}
