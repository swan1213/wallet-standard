import type { WalletsWindow } from '@wallet-standard/core';
import { GlowSolanaWallet } from './wallet.js';

declare const window: WalletsWindow;

export function register(): void {
    (window.navigator.wallets ||= []).push(({ register }) => register(new GlowSolanaWallet()));
}
