
import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import configureStore from './storeConfigure';
import { BrowserRouter as Router } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';


const store = configureStore(); //redux store

const promise = loadStripe(process.env.REACT_APP_stripePK)
const RenderApp = () => {
	ReactDOM.render(
		<React.StrictMode>
			<Provider store={store}>
				<Router>
					<Elements stripe={promise}>
						<App />
					</Elements>
				</Router>
			</Provider>
		</React.StrictMode>,
		document.getElementById('root')
	);
};

if (process.env.NODE_ENV !== 'production' && module.hot) {
	module.hot.accept('./App', RenderApp);
}

RenderApp();
