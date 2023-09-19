import {NextResponse} from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  const {address, metaId, signature, info} = await request.json();

  const hash = crypto.createHash('sha256');
  hash.update(JSON.stringify(info));
  const dataHash = hash.digest('hex');

  try {
    const res = await fetch(`${process.env.API_URL}/shared-information`, {
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + signature,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'POST',
      body: JSON.stringify({
        userId: address,
        metaId,
        dataHash,
        info,
      }),
    });

    const data = await res.json();

    if (data.message === 'Successfully finished operation: "POST"') {
      return NextResponse.json({...data.body, dataHash, time: new Date().toISOString()});
    } else {
      return NextResponse.json({errorMsg: data.errorMsg});
    }
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}

export async function GET(request: Request) {
  const {searchParams} = new URL(request.url);
  const address = searchParams.get('address');
  const metaId = searchParams.get('metaId');
  const signature = searchParams.get('signature');

  if (!address || !metaId || !signature) {
    return {
      statusCode: 401,
      body: JSON.stringify({
        error: `The parameters 'address', 'metaId', 'signature' are required.`,
      }),
    };
  }

  try {
    const res = await fetch(`${process.env.API_URL}/shared-information/${address}/${metaId}`, {
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: 'Bearer ' + signature,
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      method: 'GET',
    });

    const data = await res.json();

    if (data.message === 'Successfully finished operation: "GET"') {
      return NextResponse.json({...data.body});
    } else {
      return NextResponse.json({errorMsg: data.errorMsg});
    }
  } catch (err) {
    return NextResponse.json(err, {status: 500});
  }
}
