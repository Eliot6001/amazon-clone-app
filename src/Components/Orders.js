import React, { useEffect } from 'react';
import './Orders.css';
import HelpSharpIcon from '@material-ui/icons/HelpSharp';import { useState } from 'react';
import ProductCart from './ProductCart';
import FiberManualRecordSharpIcon from '@material-ui/icons/FiberManualRecordSharp';
import AddSharpIcon from '@material-ui/icons/AddSharp';
import MoreHorizSharpIcon from '@material-ui/icons/MoreHorizSharp';
import BoxPrice from './BoxPrice';
import AccountCircleSharpIcon from '@material-ui/icons/AccountCircleSharp';
import { connect } from "react-redux";
import { db } from "../firebase";
import { Link, useHistory } from "react-router-dom";
function Orders({ user }) {
	var myDate = (date) => {
		return new Date(date * 1000).toString().slice(0, 25);
	};
	const [selectedItem, setSelectedItem] = useState({})
	const [selectedItemsItems, setSelectedItemsItems] = useState([]);

	const [fakeOrders, setFakeOrders] = useState([])
	useEffect(() => {
		if (!user) return;
		const getOrders = async () => {
			const arrayOfItems = [];
			await db
				.collection('users')
				.doc(user?.uid)
				.collection('orders')
				.get()
				.then((snapshot) =>
					snapshot.forEach( async (doc) => arrayOfItems.unshift(doc.data()))).then(
						async () => {
							setSelectedItem({
								items: arrayOfItems[0].items,
								total: arrayOfItems[0].amount,
							});
						}
					)

			
			console.log('this is fake orders', fakeOrders, arrayOfItems[0].items);
			console.log('user uid is ', user.uid);
			setFakeOrders(arrayOfItems);
			
		};
		getOrders();
	}, [user]);
	useEffect(() => {
		const selectedItemItems = [];
		const ConvertObjectToArray = async () => {
			for (let item in selectedItem.items) {
				selectedItemItems.unshift({
					...selectedItem.items[item],
				});
			}
		}
		ConvertObjectToArray();
		setSelectedItemsItems(selectedItemItems);
	}, [selectedItem])
	console.log('Selected ITEM ITEMS ARE !!!!! AAAH', selectedItemsItems);
	const ShowFunction = () => {
		setShow(!show)
	}
	const history = useHistory();
	const [show, setShow] = useState(false);
	const [showOrderHelp, setShowOrderHelp] = useState(false);
	console.log(fakeOrders)
	//todo: 
	//I need to grab items from server firebase>user>orders -- done
	//I need to add an Onclick function to replace the info on orderDetail
	// I have to pass orderID, Amount, ---done!
	//I need to add functionalities to the icons ---done!!!
	//if i have extra time tomorrow, i'll mess up with the colors
	return (
		<div className="OrderWrapper">
			<div className="OrdersList">
				<div className="OrdersHeader">
					<span>Orders</span>
					<span
						id="helpText"
						style={{ display: show ? 'block' : 'none', position: 'absolute' }}
					>
						If you have any weird order,{' '}
						<Link to="/Support">Contact Support</Link>
					</span>
					<span
						style={{ padding: '0.6em' }}
						id="addIcon"
						onClick={() => ShowFunction()}
					>
						<HelpSharpIcon />
					</span>
				</div>
				<div className="TheList">
					{fakeOrders.map((order) => (
						<div
							className="ListItem"
							onClick={() => {
								setSelectedItem({
									items: order.items,
									total: order.amount,
								});
							}}
						>
							<img src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" />
							<span
								style={{
									display: 'flex',
									alignItems: 'flex-start',
									flexDirection: 'column',
								}}
							>
								<span>{myDate(order.created)}</span>
								<span
									style={{
										display: 'flex',
										alignItems: 'center',
										flexDirection: 'row',
										justifyContent: 'flex-start',
									}}
								>
									<FiberManualRecordSharpIcon
										style={{
											fontSize: '13px',
											color: '#4BB543',
											marginRight: '0.6em',
										}}
									/>{' '}
									{user.uid}
								</span>
							</span>
						</div>
					))}
				</div>
			</div>
			<div className="OrderDetail">
				<div className="OrderHeader">
					<span style={{ display: 'flex', flexDirection: 'column' }}>
						ORDER #4
						<span
							style={{
								display: 'flex',
								alignItems: 'center',
								marginTop: '0.2em',
							}}
						>
							<FiberManualRecordSharpIcon
								style={{
									fontSize: '13px',
									color: '#4BB543',
									marginRight: '0.6em',
								}}
							/>
							<small>Success</small>{' '}
						</span>
					</span>
					{showOrderHelp && (
						<span
							style={{
								position: 'absolute',
								right: '0',
								bottom: '0',
								backgroundColor: '#d2e3f7',
								padding: '0.3rem',
								marginRight: '1.5rem',
								borderRadius: '0.6em',
								borderTopRightRadius: '0',
								marginBottom: '0.2rem',
								zIndex:'9'
							}}
							onClick={() => {
								history.push('/help');
							}}
						>
							Need help?
						</span>
					)}
					<MoreHorizSharpIcon
						style={{ marginLeft: 'auto' }}
						id="threedotsIcon"
						onClick={() => {
							setShowOrderHelp(!showOrderHelp);
						}}
					/>
				</div>
				<div className="OrderExtraDetails">
					<div className="OrderCoupons">
						<BoxPrice title="Discount" price={15.99} color="#4BB543" />
						<BoxPrice title="Tips" price={15.99} color="#4BB543" />
						<BoxPrice title="Substraction" price={15.99} color="#d74338" />
						<BoxPrice title="Taxes" price={15.99} color="#d74338" />
						<BoxPrice title="Subtotal" price={15.99} color="#ff6700" />
						<BoxPrice
							title="Total"
							price={selectedItem.total}
							color="#ff6700"
						/>
					</div>
					<div className="OrderCustomer">
						<div className="CustomerBox">
							<AccountCircleSharpIcon style={{ fontSize: '52px' }} />
							<span className="name">USER</span>
							<span className="PhoneNumber">+1 888 888 8888</span>
							<span className="email">EMAIL@GMAIL.COM</span>
						</div>
					</div>
				</div>
				<div className="OrderItemsList">
					{selectedItemsItems.map((item) => (
						<ProductCart
							img={item.image}
							id={item.id}
							name={item.name}
							price={item.price}
							rating={item.rating}
							count={item.count}
							isOrder
						/>
					))}
				</div>
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	const { user } = state.userReducer;
	return {
		user: user,
	};
};


export default connect(mapStateToProps)(Orders);
