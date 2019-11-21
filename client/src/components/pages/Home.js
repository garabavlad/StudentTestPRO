import React, { useContext, useEffect, Fragment } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import AdminContext from '../../context/adminTest/adminContext';
import Spinner from '../layouts/Spinner';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const contactContext = useContext(AdminContext);

	const { error, clearErrors, loading } = contactContext;
	const { setAlert } = alertContext;
	const { loadUser, isAdmin } = authContext;

	useEffect(
		() => {
			loadUser();

			if (isAdmin) {
				props.history.push('/admin');
			}

			if (error === 'Contact updated sucessfully' || error === 'Contact deleted sucessfully')
				setAlert(error, 'success');
			clearErrors();
		},
		// eslint-disable-next-line
		[ error, isAdmin ]
	);

	return (
		<Fragment>
			{true && !loading ? (
				<div className='card bg-light text-center'>Momentan, nu ti s-a atribuit nici un test</div>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Home;
