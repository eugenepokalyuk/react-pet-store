import React from 'react';
import ReactDOM from 'react-dom/client';
import {HashRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {Theme} from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import App from './components/App/App';
import './index.css';
import {store} from './store';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <Router>
                <Theme>
                    <App/>
                </Theme>
            </Router>
        </Provider>
    </React.StrictMode>,
)
