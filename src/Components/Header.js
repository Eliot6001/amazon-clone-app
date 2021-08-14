import React from 'react'
import './Header.css'
import { BrowserRouter as Router } from 'react-router-dom';
import useWindowDimensions from '../Hooks/viewport';
import NavbarFull from './NavbarFull'
import NavbarResponsive from './NavbarResponsive'
function Header() {

	const { width } = useWindowDimensions();

	return (
	<div>
		{ width > 600 ?
			(<NavbarFull/> ) : (
				<NavbarResponsive/>
			)
				}
			
			</div>)
}

export default Header
