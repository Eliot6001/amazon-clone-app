import './ShopBody.css';
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import ProductComponent from './ProductComponent';
import Sidebar from './Sidebar';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { v4 as uuid } from 'uuid';
import LoadingComponent from './LoadingComponent';

import MenuIcon from '@material-ui/icons/Menu';
import useWindowDimensions from "../Hooks/viewport";
function ShopBody() {
	const { width } = useWindowDimensions();
	const [itemArray, setItems] = useState([]);
	useEffect(() => {
		const getItems = async () => {
			setLoading(true);

			const arrayOfItems = [];
			await db
				.collection('Products')
				.get()
				.then((snapshot) =>
					snapshot.forEach((doc) => arrayOfItems.push(doc.data()))
				);
			setItems(arrayOfItems);
			setLoading(false);
		};
		getItems();
	}, []);
	const newItemArray = [...itemArray].splice(0, 19);
	const random = () => {
		return uuid();
	};
	const [isLoading, setLoading] = useState(true);
	const [showSidebar, setSideBar] = useState(false);
	useEffect(() => {
		if (width > 460) {
			setSideBar(true);
		} else {
			setSideBar(false);
		}
	}, [width])
	return (
		<div>
			{isLoading ? (
				<LoadingComponent />
			) : (
				<div className="shop__body">
					{width < 405 && (
						<span
							style={{
								width: '100vw',
								zIndex: '9',
								backgroundColor: '#131921',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
							}}
							onClick={() => setSideBar(!showSidebar)}
						>
							<MenuIcon
								style={{
									zIndex: '9',
									backgroundColor: '#131921',
									color: 'white',
								}}
							/>
						</span>
					)}
					{showSidebar && (
						<Sidebar style={{ position: 'absolute', zIndex: '9' }} />
					)}

					<Carousel
						className="bgImageWrap"
						showStatus={false}
						showIndicators={false}
						showThumbs={false}
						infiniteLoop={true}
						interval={3000}
						autoPlay
					>
						<div>
							<img
								src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2021/June/Fuji_TallHero_Gamers_en_US_1x._CB667161802_.jpg"
								className="bgImage"
								alt="bg-transparent"
							/>
						</div>
						<div>
							<img
								src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg"
								className="bgImage"
								alt="bg-transparent"
							/>
						</div>
						<div>
							<img
								src="https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg"
								className="bgImage"
								alt="bg-transparent"
							/>
						</div>
					</Carousel>
					<div className="productsWrapper">
						{newItemArray.map((item) => (
							<ProductComponent
								name={item.title}
								price={item.price}
								image={item.image}
								id={item.id}
								rating={item.rating}
								style={{ zIndex: '8' }}
								key={random()}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
}

export default ShopBody;
