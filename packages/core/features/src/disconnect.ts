/** TODO: docs */
export type DisconnectFeature = {
    /** Namespace for the feature. */
    'standard:disconnect': {
        // TODO: think about removing feature versions
        /** Version of the feature API. */
        version: DisconnectVersion;

        /**
         * Disconnect from the wallet.
         */
        disconnect: DisconnectMethod;
    };
};

/** TODO: docs */
export type DisconnectVersion = '1.0.0';

/** TODO: docs */
export type DisconnectMethod = () => Promise<void>;
