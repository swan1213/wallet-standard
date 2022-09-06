import type { FC } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';

export const Home: FC = () => {
    return (
        <div>
            <h1>dApp Example</h1>
            <Link to="/connect">Connect Wallet</Link>
        </div>
    );
};
