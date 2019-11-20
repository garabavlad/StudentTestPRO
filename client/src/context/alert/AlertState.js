import React, { useReducer } from 'react';
import alertContext from './alertContext';
import alertReducer from './alertReducer';
import uuid from 'uuid';
import { SET_ALERT, REMOVE_ALERT } from '../types';

const AlertState = (props) => {
	const initialState = [];

	const [ state, dispatch ] = useReducer(alertReducer, initialState);

	//SET ALERT
	const setAlert = (msg, type, timeout = 5000) => {
		const id = uuid.v4();

		dispatch({ type: SET_ALERT, payload: { msg, type, id } });

		setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
	};

	//REMOVE ALERT
	const removeAlert = (id) => dispatch({ type: REMOVE_ALERT, payload: id });

	return (
		<alertContext.Provider
			value={{
				alerts      : state,
				setAlert,
				removeAlert
			}}>
			{props.children}
		</alertContext.Provider>
	);
};

export default AlertState;
