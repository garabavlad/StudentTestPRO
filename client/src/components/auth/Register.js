import React, { useState, useContext, useEffect } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';

const Register = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	const { setAlert } = alertContext;
	const { register, error, clearErrors, isAuthenticated, isAdmin } = authContext;

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

			if (error === 'User already exists') {
				setAlert('Adresa de email nu este disponibila', 'danger');

				clearErrors();
			}
		},
		// eslint-disable-next-line
		[ error, isAuthenticated, props ]
	);

	const [ user, setUser ] = useState({
		name      : '',
		email     : '',
		password  : '',
		password2 : ''
	});

	const { name, email, password, password2 } = user;

	const onSubmit = (e) => {
		e.preventDefault();

		if (name === '' || email === '' || password === '') {
			setAlert('Completati toate campurile', 'danger');
		}
		else if (password !== password2) setAlert('Parolele nu coincid', 'danger');
		else if (password.length < 6) setAlert('Parola trebuie sa fie de minim 6 caractere', 'danger');
		else
			register({
				name,
				email,
				password
			});
	};

	const onChange = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	return (
		<div className='form-container'>
			<h1 className='text-primary'>Inregistrare</h1>

			<form onSubmit={onSubmit}>
				<div className='form-group'>
					<label htmlFor='name'>Nume</label>
					<input type='text' name='name' value={name} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='email'>Adresa email</label>
					<input type='email' name='email' value={email} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password'>Parola</label>
					<input type='password' name='password' value={password} onChange={onChange} />
				</div>
				<div className='form-group'>
					<label htmlFor='password2'>Confirmare parola</label>
					<input type='password' name='password2' value={password2} onChange={onChange} />
				</div>
				<input type='submit' className='btn btn-primary btn-block' value='Inregisteaza' />
			</form>
		</div>
	);
};

export default Register;
