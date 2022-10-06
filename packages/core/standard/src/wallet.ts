import type { WalletAccount } from './account.js';
import type { IconString, IdentifierArray, IdentifierRecord } from './types.js';

/** TODO: docs */
export type WalletVersion = '1.0.0';

/** TODO: docs */
export interface Wallet {
    /**
     * Version of the Wallet API.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly version: WalletVersion;

    /**
     * Name of the wallet, to be displayed by apps.
     * Must be canonical to the wallet extension.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly name: string;

    /**
     * Icon of the wallet, to be displayed by apps.
     * Must be a data URI containing a base64-encoded SVG or PNG image.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly icon: IconString;

    // TODO: consider adding chain type
    /**
     * Chains supported by the wallet.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly chains: IdentifierArray;

    /**
     * Features supported by the wallet.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly features: IdentifierRecord<unknown>;

    /**
     * Events supported by the wallet.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly events: IdentifierArray;

    /**
     * List of accounts the app is authorized to use.
     * This can be set by the wallet so the app can use authorized accounts on the initial page load.
     * If this changes, the wallet must emit a `standard:change` event.
     */
    readonly accounts: ReadonlyArray<WalletAccount>;

    /**
     * Add an event listener to subscribe to events.
     *
     * @param event    Event name to listen for.
     * @param listener Function that will be called when the event is emitted.
     *
     * @return Function to remove the event listener and unsubscribe.
     */
    on<E extends WalletEventNames>(event: E, listener: WalletEvents[E]): () => void;

    // TODO: think about unregister/destructor
}

/** TODO: docs */
export type WalletPropertyName = NonNullable<
    {
        [K in keyof Wallet]: Wallet[K] extends (...args: any) => any ? never : K;
    }[keyof Wallet]
>;

/** TODO: docs */
export type WalletProperties = Pick<Wallet, WalletPropertyName>;

/** Events emitted by wallets. */
export type WalletEvents = IdentifierRecord<(...args: unknown[]) => void> & {
    /**
     * Emitted when properties of the wallet have changed.
     *
     * @param properties Names of the properties that changed.
     */
    'standard:change'(properties: ReadonlyArray<'chains' | 'features' | 'events' | 'accounts'>): void;
};

/** TODO: docs */
export type WalletEventNames = keyof WalletEvents;

/** TODO: docs */
export type WalletWithFeatures<Features extends Wallet['features']> = Omit<Wallet, 'features'> & {
    features: Features;
};
