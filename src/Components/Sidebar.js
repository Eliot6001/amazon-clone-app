import React, { useState } from 'react';
import './Sidebar.css';
import { AnimatedList } from 'react-animated-list';
import { Slider, Typography } from '@material-ui/core';

function Sidebar({isShowing=false}) {
	const [show, setShow] = useState(false);
	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	const [value, setValue] = React.useState([20, 100]);
	function valuetext(value) {
		return `${value}$`;
	}
	return (
		<div className="SidebarDiv">
			<div className="placeholder"></div>
			<ul style={{ listStyle: 'none' }} className="SidebarInputs">
				<li>Electronics</li>
				<li>Clothing</li>
				<li>Kids and Baby</li>
				<li>Pets</li>

				<li onClick={() => setShow(!show)}>
					Filter Products &nbsp; &nbsp; &nbsp; {show ? '▽' : '◁'}
				</li>
				{show && (
					<ul
						style={{
							listStyle: 'none',
							transition: '400ms',
							marginTop: '-52px',
						}}
						className="dropdown"
					>
						<AnimatedList>
							<li>Test</li>
							<p style={{ marginTop: '10px' }}>
								<small>price:</small>
							</p>
						</AnimatedList>

						<Slider
							value={value}
							onChange={handleChange}
							valueLabelDisplay="auto"
							aria-labelledby="range-slider"
							getAriaValueText={valuetext}
							max={500}
							style={{ marginRight: '0.3em', width: '90%' }}
						/>
					</ul>
				)}
			</ul>
		</div>
	);
}

export default Sidebar;
