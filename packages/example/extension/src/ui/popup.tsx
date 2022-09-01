import type { FC } from 'react';
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';

import { AppContext } from './context';
import { ApproveConnection } from './pages/ApproveConnection';
import { Home } from './pages/Home';

const Root: FC = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const isApproveConnection = queryParams.get('approveConnection') !== null;
    const Route = isApproveConnection ? ApproveConnection : Home;

    return (
        <StrictMode>
            <AppContext>
                <Route />
            </AppContext>
        </StrictMode>
    );
};

const rootNode = document.getElementById('root');
ReactDOM.render(<Root />, rootNode);
