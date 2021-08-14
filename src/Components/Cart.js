import { Button } from '@material-ui/core';
import { ShoppingBasket } from "@material-ui/icons";
import React, { useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './Cart.css';
import ProductCart from './ProductCart';
export const Cart = ({ items }) => {
	console.log(items);
	const history = useHistory();
	const subtotal = items.length
		? items?.map((item) => item.price * item.count)?.reduce((x, y) => x + y)
		: 0;
	const handleCheckout = () => {
		history.push('/Checkout');
	};
	const [render, setRender] = useState(false);
	return (
		<div className="Cart">
			<div className="CartLeft">
				<img
					src="https://www.adweek.com/wp-content/uploads/2019/12/hulu-cheez-it-ad-CONTENT-2019.jpg"
					className="AdImage"
				></img>
				<div
					className="CartText"
					style={{ display: 'flex', alignItems: 'flex-end', paddingTop: '1em' }}
				>
					<span style={{ fontSize: '46px', flexGrow: '1' }}>
						{items.length ? 'Your Cart [Mister]' : ''}
					</span>
					<span>
						<small>{items.length ? 'Price:' : ''}</small>
					</span>
				</div>
				{items.length ? (
						items?.map((item) => (
						<ProductCart
							key={item.id}
							id={item.id}
							img={item.image}
							name={item.name}
							price={item.price}
							rating={item.rating}
							count={item.count}
							funcRender={setRender}
						/>
						))
				) : (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<ShoppingBasket style={{ fontSize: '250px', color: '#f8bd69' }} />
						<span
							style={{
								fontSize: '36px',
								padding: '1em',
							}}
						>
							Cart Empty!{`\n`}
							<br />
							<strong>
								<Link to="/" style={{ textDecoration: 'none' }}>
									Grab some Items!
								</Link>
							</strong>
						</span>
					</div>
				)}
			</div>
			<div className="CartRight">
				<span>
					<small>Cart has: </small>
					{items.length
						? items?.map((item) => item.count)?.reduce((x, y) => x + y)
						: '0'}{' '}
					items <br />
				</span>
				<span>
					<small>Subtotal:</small>&nbsp;&nbsp;
					<NumberFormat
						value={subtotal.toFixed(2)}
						className="foo"
						displayType={'text'}
						thousandSeparator={true}
						prefix={'$'}
						renderText={(value, props) => <span {...props}>{value}</span>}
					/>
				</span>
				<span style={{ display: 'flex', alignItems: 'center' }}>
					<input type="checkbox" />
					&nbsp;&nbsp;
					<small>This item has a gift</small>
				</span>
				{/*[History] pushes to a new page where you put your stripe payment */}
				<button className="CheckoutButton" onClick={handleCheckout}>
					Proceed to checkout
				</button>
			</div>
		</div>
	);
};;

const mapStateToProps = (state) => {
	return {
		items: state.storeReducer.items,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {

	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
