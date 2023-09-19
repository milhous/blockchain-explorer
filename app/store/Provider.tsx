'use client';

import React, {createContext, useReducer, useContext, useMemo, useEffect} from 'react';

import {reducer, initialState, IReducerState, IReducerAction, ReducerEventType} from './reducer';

interface IContextProps {
  state: IReducerState;
  dispatch: React.Dispatch<IReducerAction>;
}

const CountContext = createContext({} as IContextProps);

export const Provider = ({children}: {children: React.ReactNode}): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, {...initialState});
  const contextValue = useMemo(() => {
    return {state, dispatch};
  }, [state, dispatch]);

  const onUpdate = (state: any) => {
    dispatch({
      type: ReducerEventType.UPDATE_WALLET_STATE,
      payload: {
        isUnlocked: state.isUnlocked,
        address: state.address,
        connections: state.connections,
      },
    });
  };

  const onLoaded = () => {
    const state = globalThis.fabricmask.getState();

    dispatch({
      type: ReducerEventType.UPDATE_WALLET_STATE,
      payload: {
        isUnlocked: state.isUnlocked,
        address: state.address,
        connections: state.connections,
      },
    });

    globalThis.fabricmask.on('update', onUpdate);
  };

  useEffect(() => {
    if (globalThis?.fabricmask && globalThis.fabricmask?.isFabricMask) {
      onLoaded();
    } else {
      window.addEventListener('FABRICMASK_LOADED', onLoaded);
    }

    return () => {
      window.removeEventListener('FABRICMASK_LOADED', onLoaded);
    };
  }, []);

  return <CountContext.Provider value={contextValue}>{children}</CountContext.Provider>;
};

// Home Hook
export const useProvider = () => {
  const contextValue = useContext(CountContext);

  return contextValue;
};
