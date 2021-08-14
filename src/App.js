import './App.css';
import Header from './Components/Header';
import ShopBody from './Components/ShopBody';
import CheckOut from './Components/CheckOut';
import Login from './Components/Login';
import Cart from './Components/Cart';
import Orders from './Components/Orders';
import { setUser } from './actions/userActions';

import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, Route, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { auth } from './firebase';
function App({ set_user }) {
	useEffect(() => {
		auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				set_user(authUser);
			} else {
				set_user('');
			}
		});
	}, []);
	const location = useLocation();
	return (
		<div className="App">
			<TransitionGroup>
				<CSSTransition classNames="slide" key={location.key} timeout={400}>
					<Switch location={location}>
						<Route path="/cart">
							<CHECK />
						</Route>
						<Route path="/checkout">
							<CARTCHECKOUT />
						</Route>
						<Route path="/Login">
							<LOGIN />
						</Route>
						<Route path="/orders">
							<ORDERS />
						</Route>
						<Route path="/">
							<SHOP />
						</Route>
					</Switch>
				</CSSTransition>
			</TransitionGroup>
		</div>
	);
}

// Had to create components that combine them in order to fix a bug
// css transition kept applying the classNames to header only
// so comibining them worked.
function CHECK() {
	return (
		<div>
			<Header />
			<Cart />
		</div>
	);
}
function SHOP() {
	return (
		<div>
			<Header />
			<ShopBody />
		</div>
	);
}
function CARTCHECKOUT() {
	return (
		<div>
			<Header />
			<CheckOut />
		</div>
	);
}
function LOGIN() {
	return (
		<div>
			<Login />
		</div>
	);
}
function ORDERS() {
	return (
		<div>
			<Header />
			<Orders />
		</div>
	);
}
const mapDispatchToProps = (dispatch) => {
	return {
		set_user: (user) => {
			dispatch(setUser(user));
		},
	};
};

export default connect(null, mapDispatchToProps)(App);
