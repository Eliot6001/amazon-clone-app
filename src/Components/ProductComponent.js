import React from 'react';
import './ProductComponent.css';
import NumberFormat from 'react-number-format';
import ReactStars from 'react-rating-stars-component';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';

function ProductComponent({ state,name, price, image, rating, id, style, add_item }) {
	const handleAdd = () => {
		add_item(
			{	name,
				price,
				image,
				rating,
				id,
			}
		);
	};
	return (
		<div className="productWrapper" style={style}>
			<img src={image} alt={name} className="productImage" />
			<div className="productInformation">
				<span className="title">{name}</span>

				<NumberFormat
					value={price}
					className="foo"
					displayType={'text'}
					thousandSeparator={true}
					prefix={'$'}
					renderText={(value, props) => <div {...props}>{value}</div>}
				/>
				<ReactStars
					count={5}
					value={rating ? rating : 0}
					edit={false}
					size={22}
					activeColor="#ffd700"
				/>
				<button className="ProductBuyButton" onClick={() => handleAdd()}>
					Buy now
				</button>
			</div>
		</div>
	);
}


const mapDispatchToProps = (dispatch) => {
	return {
		add_item: (item) => {
			dispatch(addItem(item));
		},
	};
};
export default connect(null, mapDispatchToProps)(ProductComponent);
