import type { ConnectMethod } from '@wallet-standard/features/src';
import { createContext, useContext } from 'react';
import { createDefaultContext } from './context.js';

/** TODO: docs */
export interface ConnectContextState {
    connecting: boolean;
    connect: ConnectMethod | undefined;
}

const DEFAULT_CONNECT_STATE: Readonly<ConnectContextState> = {
    connecting: false,
    connect: undefined,
} as const;

const DEFAULT_CONNECT_CONTEXT = createDefaultContext('Connect', DEFAULT_CONNECT_STATE);

/** TODO: docs */
export const ConnectContext = createContext(DEFAULT_CONNECT_CONTEXT);

/** TODO: docs */
export function useConnect(): ConnectContextState {
    return useContext(ConnectContext);
}
