import { useState, useEffect } from 'react';

export type FetchState<T, E> =
  | {
      type: 'loading';
    }
  | {
      type: 'data';
      data: T;
    }
  | {
      type: 'error';
      error: E;
    };

export const useFetch = <T>(promise: () => Promise<T>) => {
  const [fetchState, setFetchState] = useState<FetchState<T, Error>>({
    type: 'loading',
  });
  useEffect(() => {
    promise()
      .then(x => {
        setFetchState({ type: 'data', data: x });
      })
      .catch(e => {
        setFetchState({ type: 'error', error: e.message });
      });
    return;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return fetchState;
};
