import { Keypair } from '@solana/web3.js';
import * as bip39 from 'bip39';
import { derivePath } from 'ed25519-hd-key';
import * as ethers from 'ethers';

export type Mnemonic = string;

export interface Account {
    address: string;
    publicKey: Uint8Array;
    privateKey: Uint8Array;
}

export function generateMnemonic(): Mnemonic {
    return bip39.generateMnemonic();
}

export function deriveEthereumAccount(mnemonic: Mnemonic): Account {
    const { address, publicKey, privateKey } = ethers.Wallet.fromMnemonic(mnemonic);
    return {
        address,
        publicKey: ethers.utils.arrayify(publicKey),
        privateKey: ethers.utils.arrayify(privateKey),
    };
}

export function deriveSolanaAccount(mnemonic: Mnemonic): Account {
    const seed = bip39.mnemonicToSeedSync(mnemonic, '');
    const path = "m/44'/501'/0'/0'";
    const { publicKey, secretKey } = Keypair.fromSeed(derivePath(path, seed.toString('hex')).key);
    return {
        address: publicKey.toBase58(),
        publicKey: new Uint8Array(publicKey.toBytes()),
        privateKey: secretKey,
    };
}
