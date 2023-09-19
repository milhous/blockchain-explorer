'use client';

import {useEffect} from 'react';

import * as toast from '@widget/toastify';

export default function UINotification() {
  useEffect(() => {
    const eventSource = new EventSource(location.origin + '/api/notification');

    eventSource.onmessage = evt => {
      const data = JSON.parse(evt.data);

      if (data.type === 'metadata') {
        for (const {meta_id} of data.payload) {
          toast.info(`New ${data.type}: ${meta_id} published.`);
        }
      } else {
        toast.info(`New ${data.type} published.`);
      }
    };

    eventSource.onerror = e => {
      console.log('onerror', e);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <></>;
}
