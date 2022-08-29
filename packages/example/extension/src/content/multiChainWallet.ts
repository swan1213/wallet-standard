import type { SignTransactionFeature, SignTransactionMethod, SignTransactionOutput } from '@wallet-standard/features';
import type {
    ConnectInput,
    ConnectOutput,
    Wallet,
    WalletAccount,
    WalletAccountExtensionName,
    WalletAccountFeatureName,
    WalletEventNames,
    WalletEvents,
} from '@wallet-standard/standard';
import { CHAIN_ETHEREUM, CHAIN_SOLANA_MAINNET } from '@wallet-standard/util';
import * as ethers from 'ethers';

import type { Channel } from '../messages';

declare const window: {
    _channel: Channel;
};

export type EthereumChain = typeof CHAIN_ETHEREUM;

export type EthereumWalletAccountFeature = SignTransactionFeature;

export class EthereumWalletAccount implements WalletAccount {
    readonly #publicKey: Uint8Array;

    get address() {
        return ethers.utils.arrayify(ethers.utils.computeAddress(this.publicKey));
    }

    get publicKey() {
        return this.#publicKey;
    }

    get chain() {
        return CHAIN_ETHEREUM;
    }

    get features(): EthereumWalletAccountFeature {
        return {
            signTransaction: {
                version: '1.0.0',
                signTransaction: this.#signTransaction,
            },
        };
    }

    get extensions() {
        return {};
    }

    constructor(publicKey: Uint8Array) {
        this.#publicKey = publicKey;
    }

    #signTransaction: SignTransactionMethod = async (...inputs) => {
        const outputs: SignTransactionOutput[] = [];

        // TODO

        return outputs as any;
    };
}

export type SolanaChain = typeof CHAIN_SOLANA_MAINNET;

export type SolanaWalletAccountFeature = SignTransactionFeature;

export class SolanaWalletAccount implements WalletAccount {
    readonly #publicKey: Uint8Array;

    get address() {
        return this.publicKey;
    }

    get publicKey() {
        return this.#publicKey;
    }

    get chain() {
        return CHAIN_SOLANA_MAINNET;
    }

    get features(): SolanaWalletAccountFeature {
        return {
            signTransaction: {
                version: '1.0.0',
                signTransaction: this.#signTransaction,
            },
        };
    }

    get extensions() {
        return {};
    }

    constructor(publicKey: Uint8Array) {
        this.#publicKey = publicKey;
    }

    #signTransaction: SignTransactionMethod = async (...inputs) => {
        const outputs: SignTransactionOutput[] = [];

        // TODO

        return outputs as any;
    };
}

export type MultiChainWalletAccount = EthereumWalletAccount | SolanaWalletAccount;

export class MultiChainWallet implements Wallet<MultiChainWalletAccount> {
    #name = 'MultiChain Wallet';
    #icon = '';

    #accounts: MultiChainWalletAccount[] = [];
    #hasMoreAccounts = true;

    #listeners: {
        [E in WalletEventNames<MultiChainWalletAccount>]?: WalletEvents<MultiChainWalletAccount>[E][];
    } = {};

    get version() {
        return '1.0.0' as const;
    }

    get name() {
        return this.#name;
    }

    get icon() {
        return this.#icon;
    }

    get chains() {
        return [CHAIN_ETHEREUM, CHAIN_SOLANA_MAINNET];
    }

    get features() {
        return [];
    }

    get extensions() {
        return [];
    }

    get accounts() {
        return this.#accounts;
    }

    get hasMoreAccounts() {
        return this.#hasMoreAccounts;
    }

    #request(method: string, params?: any[]) {
        return window._channel.sendMessage(method, params);
    }

    async connect<
        Chain extends MultiChainWalletAccount['chain'],
        FeatureName extends WalletAccountFeatureName<MultiChainWalletAccount>,
        ExtensionName extends WalletAccountExtensionName<MultiChainWalletAccount>,
        Input extends ConnectInput<MultiChainWalletAccount, Chain, FeatureName, ExtensionName>
    >(input?: Input): Promise<ConnectOutput<MultiChainWalletAccount, Chain, FeatureName, ExtensionName, Input>> {
        const accounts = await this.#request('connect');

        if (accounts === null) {
            // TODO: Use custom errors.
            throw new Error('The user rejected the request.');
        }

        this.#accounts = accounts.map((account: { chain: string; publicKey: Uint8Array }) => {
            const { chain, publicKey } = account;
            switch (chain) {
                case 'ethereum':
                    return new EthereumWalletAccount(publicKey);
                case 'solana':
                    return new SolanaWalletAccount(publicKey);
                default:
                    throw new Error(`Unknown chain: '${chain}'`);
            }
        });

        return {
            accounts: this.accounts as any,
            hasMoreAccounts: false,
        };
    }

    on<E extends WalletEventNames<MultiChainWalletAccount>>(
        event: E,
        listener: WalletEvents<MultiChainWalletAccount>[E]
    ): () => void {
        this.#listeners[event]?.push(listener) || (this.#listeners[event] = [listener]);
        return (): void => this.#off(event, listener);
    }

    #off<E extends WalletEventNames<MultiChainWalletAccount>>(
        event: E,
        listener: WalletEvents<MultiChainWalletAccount>[E]
    ): void {
        this.#listeners[event] = this.#listeners[event]?.filter((existingListener) => listener !== existingListener);
    }
}
