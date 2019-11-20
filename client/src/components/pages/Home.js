import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import ContactContext from '../../context/contact/contactContext';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const contactContext = useContext(ContactContext);

	const { error, clearErrors } = contactContext;
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

	return <div className='card bg-light text-center'>Momentan, nu ti s-a atribuit nici un test</div>;
};

export default Home;
