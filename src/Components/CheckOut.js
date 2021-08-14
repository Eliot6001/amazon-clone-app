import './CheckOut.css';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import ProductCart from './ProductCart';
import { CardElement } from '@stripe/react-stripe-js';
import { useElements, useStripe } from '@stripe/react-stripe-js';
import { db } from '../firebase';
import axios from "../axios";
import { useHistory } from "react-router-dom";
import { emptycart } from "../actions/itemActions";

const CheckOut = ({ items, user, EmptyCart }) => {
	var today = new Date();
	const DATE =
		today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
	const stripe = useStripe();
	const elements = useElements();
	const [secret, setSecret] = useState('');
	const [processing, setProcessing] = useState(false);
	const [status, setStatus] = useState('Ready');

	const subtotal = items.length
		? items?.map((item) => item.price * item.count)?.reduce((x, y) => x + y)
		: 0;
	useEffect(() => {
		const getPaySecret = async () => {
			const response = await axios({
				method: 'post',
				url: `/payment/create?total=${Math.floor(
					Math.floor(subtotal * 10000) / 100
				)}`,
			});
			setSecret(response.data.clientSecret);
		};
		getPaySecret();
	}, [items]);
	console.log(...items);
	const handleSubmit = async (event) => {
		event.preventDefault();
		setProcessing(true);
		setStatus('Processing');
		if (!stripe || !elements || !secret) {
			return;
		}

		// Get a reference to a mounted CardElement. Elements knows how
		// to find your CardElement because there can only ever be one of
		// each type of element.
		const cardElement = elements.getElement(CardElement);

		// Use your card Element with other Stripe.js APIs
		await stripe
			.confirmCardPayment(secret, {
				payment_method: {
					card: cardElement,
				},
			})
			.then(({ paymentIntent }) => {
				console.log(paymentIntent);
				db.collection('users')
					.doc(user.uid)
					.collection('orders')
					.doc(secret)
					.set({
						amount: paymentIntent.amount / 100,
						items: { ...items },
						created: paymentIntent.created,
						customer: paymentIntent.receipt_email,
					});
				setProcessing(false);
                EmptyCart();
				history.push('/orders');
			});
	};
	const history = useHistory();
	return (
		<div className="checkout">
			<div className="checkoutHeader">
				<span style={{ fontSize: '48px' }}>Checkout</span>
				<span>Date: {DATE}</span>
			</div>
			<div className="checkoutItems">
				<span>Please Check your Cart before checkout.</span>

				{items.map((item) => (
					<ProductCart
						key={item.id}
						img={item.image}
						name={item.name}
						price={item.price}
						rating={item.rating}
						count={item.count}
					/>
				))}
			</div>
			<div className="BillingInfo" style={{ padding: '2em' }}>
				<form onSubmit={handleSubmit}>
					<CardElement
						options={{
							style: {
								base: {
									fontSize: '18px',
									color: '#424770',
									'::placeholder': {
										color: '#aab7c4',
									},
								},
								invalid: {
									color: '#9e2146',
								},
							},
						}}
					/>
					<button type="submit" disabled={!stripe || processing}>
						{status || 'Pay'}
					</button>
				</form>
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		items: state.storeReducer.items,
		user: state.userReducer.user
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		EmptyCart: () => {
			dispatch(emptycart());
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckOut);
