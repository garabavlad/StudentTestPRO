import React, { useReducer } from 'react';
import axios from 'axios';
import contactContext from './contactContext';
import contactReducer from './contactReducer';
import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	CONTACTS_FAIL,
	GET_CONTACTS,
	CLEAR_ERRORS,
	CLEAR_CONTACTS
} from '../types';

const ContactState = (props) => {
	const initialState = {
		contacts : null,
		current  : null,
		filtered : null,
		error    : null,
		loading  : false
	};

	const [ state, dispatch ] = useReducer(contactReducer, initialState);

	//ADD CONTACT
	const addContact = async (contact) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/contacts', contact, config);

			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACTS_FAIL, payload: err.response.data.msg });
		}
	};

	//GET CONTACTS
	const getContacts = async () => {
		try {
			const res = await axios.get('/api/contacts');

			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (err) {
			dispatch({ type: CONTACTS_FAIL, payload: err.response.data.msg });
		}
	};

	//DELETE CONTACT
	const deleteContact = async (_id) => {
		try {
			const res = await axios.delete(`/api/contacts/${_id}`);

			dispatch({ type: DELETE_CONTACT, payload: res.data, _id: _id });
			getContacts();
		} catch (err) {
			dispatch({ type: CONTACTS_FAIL, payload: err.response.data.msg });
		}
	};

	//UPDATE CONTACT
	const updateContact = async (contact) => {
		try {
			const config = {
				headers : {
					'Content-Type' : 'application/json'
				}
			};

			const res = await axios.put(`/api/contacts/${contact._id}`, contact, config);

			dispatch({ type: UPDATE_CONTACT, payload: res.data });
			getContacts();
		} catch (err) {
			dispatch({ type: CONTACTS_FAIL, payload: err.response.data.msg });
		}
	};

	//SET CURRENT CONTACT
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};

	//CLEAR CURRENT CONTACT
	const clearCurrent = (contact) => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//FILTER CONTACTS
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};

	//CLEAR FILTER
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	//CLEAR ERRORS
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	//CLEAR CONTACTS or  ON LOGOUT
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};

	return (
		<contactContext.Provider
			value={{
				contacts       : state.contacts,
				current        : state.current,
				filtered       : state.filtered,
				error          : state.error,
				loading        : state.loading,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearErrors,
				clearContacts
			}}>
			{props.children}
		</contactContext.Provider>
	);
};

export default ContactState;
