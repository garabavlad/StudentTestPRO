import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);

	const { setAlert } = alertContext;
	const { login, error, clearErrors, isAuthenticated, isAdmin } = authContext;

	useEffect(
		() => {
			if (isAuthenticated) {
				if (isAdmin) {
					props.history.push('/admin');
				}
				else {
					props.history.push('/');
				}
			}

			if (error === 'Invalid email and / or password') {
				setAlert(error, 'danger');

				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error, isAuthenticated, props ]
	);

	const [ user, setUser ] = useState({
		email    : '',
		password : ''
	});

	const { email, password } = user;

	const onSubmit = (e) => {
		e.preventDefault();

		if (email === '' || password === '') {
			setAlert('Please complete all fields', 'danger');
		}
		else if (password.length < 6) setAlert('Password have to be more than 6 characters', 'danger');
		else
			login({
				email,
				password
			});
	};

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='form-container'>
			<h1 className='text-primary'>Autentificare</h1>

			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='email'>Adresa email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Parola</label>
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>

				<input type='submit' className='btn btn-primary btn-block' value='Logare' />
			</form>
		</div>
	);
};

export default Login;
