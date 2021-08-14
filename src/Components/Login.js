import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';
import {auth} from '../firebase'
import { useState } from "react";
function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleRegister = (e) => {
		e.preventDefault();
			auth
			.createUserWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				// ...
				console.log(user)
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				// ..
			});
	}
	const handleLogin = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.then((userCredential) => {
				// Signed in
				var user = userCredential.user;
				
				console.log(user);
				history.push('/')
			})
			.catch((error) => {
				var errorCode = error.code;
				var errorMessage = error.message;
				setError(error)
			})
		
	}
	const history = useHistory();
	const handleEmailChange = (e) => {
		setEmail(e.target.value)
	}
	const handlePasswordChange = (e) => {
		setPassword(e.target.value);
	};
	return (
		<div className="LoginWrapper">
			<div className="LoginNav">
				<Link to="/">
					<img
						src="https://www.pikpng.com/pngl/b/103-1037301_amazon-logo-copy-transparent-background-company-logos-clipart.png"
						alt="amazonLogo"
						className="LoginLogo"
					/>
				</Link>
				<div className="NavLinks">
					<Link className="NavLink" style={LinkStyle}>
						Conditions
					</Link>
					<Link className="NavLink" style={LinkStyle}>
						Privacy
					</Link>
					<Link className="NavLink" style={LinkStyle}>
						Help
					</Link>
				</div>
			</div>
			<div className="LoginPageWrapper">
				<div className="LoginPage">
					<div className="LoginRight">
						<span style={{ marginLeft: '0.7em', marginTop: '1em' }}>
							Find Everything you love in <strong>Amazon</strong>
							<br />
							The world's largest <strong>online marketplace</strong>
						</span>
						<div className="NewAccountPrompt">
							<span style={{ marginBottom: '1em', fontSize: '18px' }}>
								<strong>New Here?</strong>
							</span>
							<a
								className="CreateNewAccount"
								style={{ marginBottom: '1em' }}
								onClick={handleRegister}
							>
								Create your free amazon account
							</a>
							<span style={{ fontWeight: '400', fontSize: '15px' }}>
								Shop Anything, from books and groceries to <br />
								gadgets and furniture
							</span>
						</div>
					</div>
					<div className="LoginLeft">
						<p style={{ fontSize: '25px', marginBottom: '15px' }}>
							<strong>
								Log in to your account
								<br />
							</strong>
							<div
								style={{
									backgroundColor: '#dc3545',
									borderRadius: '0.3em',
									padding: '0.2em',
									marginTop: '1em',
									display: !error ? 'none' : 'block',
								}
								}
								className="fade"
							>
								<span
									style={{
										color:'white',
										width: '100%',
										height: '200px',
										fontSize: '3vmin',
										transition:'500ms'
									}}
								>
									{error.message}
								</span>
							</div> 
						</p>
						<form>
							<div className="input-container">
								<input
									className="input-email"
									type="text"
									placeholder="E-mail"
									onChange={handleEmailChange}
									name="usrnm"
									value={email}
								/>
							</div>
							<div className="input-container">
								<input
									value={password}
									className="input-password"
									type="text"
									placeholder="password"
									name="passwd"
									onChange={handlePasswordChange}
								/>
							</div>

							<div className="LoginButtonWrap">
								<button className="loginButton" onClick={handleLogin}>
									<strong>Log in</strong>
								</button>
								<span style={{ fontSize: '13px', fontWeight: '300' }}>
									By logging in, you agree to Amazon's{' '}
									<Link to="Conditions" style={LinkStyle}>
										Conditions of Use
									</Link>{' '}
									and{' '}
									<Link to="Privacy" style={LinkStyle}>
										Privacy Notice
									</Link>
								</span>
							</div>
						</form>
						<span className="additionalOptions">
							<Link style={LinkStyle}>
								<small>I forget my password</small>
							</Link>
							<Link style={LinkStyle}>
								<small>I can't log in</small>
							</Link>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}


const LinkStyle = {
	textDecoration: 'None',
    color: 'rgb(38 156 255)',
    marginTop:'1em'
};
export default Login;
