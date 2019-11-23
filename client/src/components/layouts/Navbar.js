import React, { Fragment, useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import AdminContext from '../../context/adminTest/adminContext';

const Navbar = ({ title, icon }) => {
	const authContext = useContext(AuthContext);
	const adminContext = useContext(AdminContext);

	const { logout, user, isAuthenticated } = authContext;
	const { clearTests } = adminContext;

	const onLogout = () => {
		clearTests();
		logout();
	};

	const authLinks = (
		<Fragment>
			<li>Salut, {user && user.name}</li>
			<li>
				<a href='#!' onClick={onLogout}>
					<i className='fas fa-sign-out-alt' />
					<span className='hide-sm'>Deconectare</span>
				</a>
			</li>
		</Fragment>
	);

	const guestLinks = (
		<Fragment>
			<li>
				<Link to='/register'>Inregistrare</Link>
			</li>
			<li>
				<Link to='/login'>Logare</Link>
			</li>
		</Fragment>
	);

	return (
		<div className='navbar bg-primary'>
			<Link to='/'>
				<h1>
					<i className={icon} /> {title}
				</h1>
			</Link>

			<ul> {isAuthenticated ? authLinks : guestLinks} </ul>
		</div>
	);
};

Navbar.propTypes = {
	title : PropTypes.string.isRequired,
	icon  : PropTypes.string
};

Navbar.defaultProps = {
	title : 'Student Test PRO',
	icon  : 'fas fa-book'
};

export default Navbar;
