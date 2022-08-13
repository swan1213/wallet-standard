import type { UnionToIntersection } from '@wallet-standard/types';
import { WalletAccount } from '../wallet';
import { DecryptFeature } from './decrypt';
import { EncryptFeature } from './encrypt';
import { SignAndSendTransactionFeature } from './signAndSendTransaction';
import { SignMessageFeature } from './signMessage';
import { SignTransactionFeature } from './signTransaction';

export * from './decrypt';
export * from './encrypt';
export * from './signAndSendTransaction';
export * from './signMessage';
export * from './signTransaction';

/** TODO: docs */
export type Feature =
    | SignTransactionFeature
    | SignAndSendTransactionFeature
    | SignMessageFeature
    | EncryptFeature
    | DecryptFeature;

/** TODO: docs */
export type Features = UnionToIntersection<Feature>;

/** TODO: docs */
export type FeatureName = keyof Features;

/** TODO: docs */
export type WalletAccountFeatures<Account extends WalletAccount> = UnionToIntersection<Account['features']>;

/** TODO: docs */
export type WalletAccountFeatureName<Account extends WalletAccount> = keyof WalletAccountFeatures<Account>;

/** TODO: docs */
export type WalletAccountExtensions<Account extends WalletAccount> = UnionToIntersection<Account['extensions']>;

/** TODO: docs */
export type WalletAccountExtensionName<Account extends WalletAccount> = keyof WalletAccountExtensions<Account>;
