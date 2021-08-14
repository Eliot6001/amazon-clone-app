import './ProductCart.css';
import React from 'react';
import ReactStars from 'react-rating-stars-component';
import NumberFormat from 'react-number-format';
import { connect } from "react-redux";
import { removeItem } from "../actions/itemActions";
import reactStars from "react-rating-stars-component";

function ProductCart({
	id,
	img,
	name,
	price,
	rating,
	count,
	isOrder = false,
	remove_item,
	funcRender
}) {
	const handleDelete = () => {
		remove_item({
			id,
			count,
		});
		funcRender();
	};
	console.log(count);
	return (
		<div
			className="ProductWrapper"
			style={{ paddingBlock: isOrder ? '0' : '2em' }}
		>
			<img src={img} alt={name} className="ProductImage"></img>
			<div
				className="ProductInfo"
				style={{ fontSize: isOrder ? '15px' : 'unset' }}
			>
				<span>
					{isOrder && `${count}x  `}
					{name}
				</span>
				{!isOrder && <span>Amount: {count}</span>}
				{!isOrder && <span>Shipped by [Company]</span>}
				{!isOrder && (
					<ReactStars
						count={5}
						value={rating}
						edit={false}
						size={22}
						activeColor="#ffd700"
					/>
				)}
				{!isOrder && (
					<div className="ProductChoices">
						<select name="cars" id="cars">
							{Array(20)
								.fill()
								.map((_, i) => (
									<option value={i}>{i}</option>
								))}
						</select>
						<a onClick={() => handleDelete()}>Delete</a>
						<a href={''}>Save for later</a>
						<a href={''}>Compare with other items</a>
					</div>
				)}
			</div>
			<div className="PriceWrapper">
				<NumberFormat
					value={Math.round(price * count * 100) / 100}
					className="foo"
					displayType={'text'}
					thousandSeparator={true}
					prefix={'$'}
					renderText={(value, props) => <div {...props}>{value}</div>}
				/>
				
			</div>
		</div>
	);
}

const mapDispatchToProps = (dispatch) => {
	return {
		remove_item: (item) => {
			dispatch(removeItem(item));
		},
	};
};
export default connect(null, mapDispatchToProps)(ProductCart);
