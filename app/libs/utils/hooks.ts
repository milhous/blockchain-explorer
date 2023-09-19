import {useEffect, useState} from 'react';

export function useSiteConnected(connections: {[key: string]: boolean} = {}): boolean {
  const [isConnected, setConnectionState] = useState<boolean>(false);

  useEffect(() => {
    const origin = globalThis.location.origin;

    setConnectionState(!!connections[origin]);
  }, [connections]);

  return isConnected;
}
