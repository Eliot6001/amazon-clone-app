import React, { useEffect, useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { connect } from 'react-redux';
import userReducer from "../reducers/userReducer";
import {auth} from '../firebase'
function NavbarFull({ user }) {
	console.log(`user user user user user user is ${user}`)
	return (
		<div className="navbar">
			<div className="navbar__logoContainer">
				<Link to={'/'}>
					<img
						src="http://pngimg.com/uploads/amazon/amazon_PNG11.png"
						alt="amazonLogo"
						className="navbar__logo"
					/>
				</Link>
				<span style={{ marginLeft: '10px', marginBottom: '6px' }}>
					<span>
						<small>
							Deliver to<br></br>
						</small>
					</span>
					<span>
						<strong>[County]</strong>
					</span>
				</span>
			</div>
			<div className="navbar__searchbar">
				<input type="text" className="navbar__searchbarInput" />
				<button className="navbar__searchbarIcon">
					<SearchIcon />
				</button>
			</div>
			<div className="navbar__inputs">
				{user === null ? (
					<Link
						to="/login"
						activeStyle={{
							textDecoration: 'none',
						}}
						style={{
							textDecoration: 'none',
						}}
					>
						<span className="navbar__inputText">
							<small>Your account</small>
							<strong>Login</strong>
						</span>
					</Link>
				) : (
					<span
						className="navbar__inputText"
						style={{ userSelect: 'none', cursor: 'pointer' }}
						onClick={async () => {
							auth.signOut()
						}}	
					>
						<small>{user.email}</small>
						<strong>disconnect</strong>
					</span>
				)}

				<Link
					to="/orders"
					activeStyle={{
						textDecoration: 'none',
					}}
					style={{
						textDecoration: 'none',
					}}
				>
					<span className="navbar__inputText">
						<small>Your Orders</small>
						<strong>& Returns</strong>
					</span>
				</Link>
				<Link to={'/cart'}>
					<ShoppingCartIcon
						style={{ fontSize: 35, marginRight: '16px', color: 'white' }}
					/>
				</Link>
			</div>
		</div>
	);
}
const mapStateToProps = (state) =>  {
	const { user } = state.userReducer;
	return {
		user: user
	};
}

export default connect(mapStateToProps)(NavbarFull);
