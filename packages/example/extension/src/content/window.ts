import type { NavigatorWalletsWindow } from '@wallet-standard/core';
import { createRPC, createWindowTransport } from '../messages';
import { MultiChainWallet } from './multiChainWallet';

declare const window: NavigatorWalletsWindow;

function register(): void {
    const transport = createWindowTransport(window);
    const rpc = createRPC(transport);

    const wallet = new MultiChainWallet(rpc);

    window.navigator.wallets = window.navigator.wallets || [];
    window.navigator.wallets.push(({ register }) => {
        register(wallet);
    });
}

register();
