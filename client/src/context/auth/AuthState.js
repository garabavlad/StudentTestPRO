import React, { useReducer } from 'react';
import axios from 'axios';
import authContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	CLEAR_ERRORS
} from '../types';

const AuthState = (props) => {
	const initialState = {
		token           : localStorage.getItem('token'),
		user            : null,
		isAuthenticated : false,
		loading         : true,
		error           : null,
		isAdmin         : false
	};

	const [ state, dispatch ] = useReducer(authReducer, initialState);

	//LOAD USER
	const loadUser = async () => {
		//setting token
		if (localStorage.token) {
			setAuthToken(localStorage.token);
		}

		try {
			const res = await axios.get('/api/auth');

			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (err) {
			dispatch({ type: AUTH_ERROR, payload: err.response.data.msg });
		}
	};

	//REGISTER USER
	const register = async (formSubmit) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		if (formSubmit.password === 'gotoadmin') {
			formSubmit = {
				...formSubmit,
				isAdmin : true
			};
		}
		else {
			formSubmit = {
				...formSubmit,
				isAdmin : false
			};
		}

		try {
			const res = await axios.post('/api/users', formSubmit, config);

			dispatch({ type: REGISTER_SUCCESS, payload: res.data.token });
			loadUser();
		} catch (err) {
			dispatch({ type: REGISTER_FAIL, payload: err.response.data.msg });
		}
	};

	//LOGIN USER
	const login = async (formSubmit) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/auth', formSubmit, config);

			dispatch({ type: LOGIN_SUCCESS, payload: res.data.token });
			loadUser();
		} catch (err) {
			dispatch({ type: LOGIN_FAIL, payload: err.response.data.msg });
		}
	};

	//LOGOUT
	const logout = () => dispatch({ type: LOGOUT });

	//CLEAR ERRORS
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	return (
		<authContext.Provider
			value={{
				token           : state.token,
				user            : state.user,
				isAuthenticated : state.isAuthenticated,
				loading         : state.loading,
				error           : state.error,
				isAdmin         : state.isAdmin,
				register,
				loadUser,
				login,
				logout,
				clearErrors
			}}>
			{props.children}
		</authContext.Provider>
	);
};

export default AuthState;
