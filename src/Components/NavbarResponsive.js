import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Input } from '@material-ui/core';
function NavbarResponsive() {
	const [isEnabled, setEnabled] = useState(false);
	return (
		<div className="navbar">
			<div className="navbar__wrapper">
				<div className="navbar__logoContainer">
					<Link to="/">
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
				<button
					className="navbar__searchbarIcon"
					onClick={() => setEnabled(!isEnabled)}
				>
					<SearchIcon />
				</button>
				<div className="navbar__inputs">
					<Link
						to="/Login"
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
					<Link to="/cart">
						<ShoppingCartIcon
							style={{ fontSize: 35, marginRight: '16px', color: 'white' }}
						/>
					</Link>
				</div>
			</div>
			{isEnabled ? (
				<div className="navbar__search" style={{ Transition: '400ms' }}>
					<Input
						color="primary"
						autoFocus
						fullWidth
						textIndent
						style={{
							backgroundColor: 'white',
							textIndent:'5px !important'
						}}
					></Input>
				</div>
			) : (
				''
			)}
		</div>
	);
}

export default NavbarResponsive;
