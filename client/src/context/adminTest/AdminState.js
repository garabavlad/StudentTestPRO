import React, { useReducer } from 'react';
import axios from 'axios';
import adminContext from './adminContext';
import adminReducer from './adminReducer';
import {
	ADD_TEST,
	DELETE_TEST,
	UPDATE_TEST,
	FILTER_TESTS,
	TESTS_FAIL,
	CLEAR_TESTS,
	GET_TESTS,
	SET_CURRENT,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	CLEAR_ERRORS
} from '../types';

const AdminState = (props) => {
	const initialState = {
		tests    : null,
		current  : null,
		filtered : null,
		error    : null,
		loading  : false
	};

	const [ state, dispatch ] = useReducer(adminReducer, initialState);

	//ADD TEST
	const addTest = async (test) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/tests', test, config);

			dispatch({ type: ADD_TEST, payload: res.data });
		} catch (err) {
			dispatch({ type: TESTS_FAIL, payload: err.response.data.msg });
		}
	};

	//GET TESTS
	const getTests = async () => {
		try {
			const res = await axios.get('/api/tests');

			dispatch({ type: GET_TESTS, payload: res.data });
		} catch (err) {
			dispatch({ type: TESTS_FAIL, payload: err.response.data.msg });
		}
	};

	//DELETE TEST
	const deleteTest = async (_id) => {
		try {
			const res = await axios.delete(`/api/tests/${_id}`);

			dispatch({ type: DELETE_TEST, payload: res.data, _id: _id });
			getTests();
		} catch (err) {
			dispatch({ type: TESTS_FAIL, payload: err.response.data.msg });
		}
	};

	//UPDATE TEST
	const updateTest = async (test) => {
		try {
			const config = {
				headers : {
					'Content-Type' : 'application/json'
				}
			};

			const res = await axios.put(`/api/tests/${test._id}`, test, config);

			dispatch({ type: UPDATE_TEST, payload: res.data });
			getTests();
		} catch (err) {
			dispatch({ type: TESTS_FAIL, payload: err.response.data.msg });
		}
	};

	//SET CURRENT TEST
	const setCurrent = (test) => {
		dispatch({ type: SET_CURRENT, payload: test });
	};

	//CLEAR CURRENT TEST
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};

	//FILTER TESTS
	const filterTests = (text) => {
		dispatch({ type: FILTER_TESTS, payload: text });
	};

	//CLEAR FILTER
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};

	//CLEAR ERRORS
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	//CLEAR TESTS or  ON LOGOUT
	const clearTests = () => {
		dispatch({ type: CLEAR_TESTS });
	};

	return (
		<adminContext.Provider
			value={{
				tests        : state.tests,
				current      : state.current,
				filtered     : state.filtered,
				error        : state.error,
				loading      : state.loading,

				addTest,
				deleteTest,
				setCurrent,
				clearCurrent,
				updateTest,
				filterTests,
				clearFilter,
				getTests,
				clearErrors,
				clearTests
			}}>
			{props.children}
		</adminContext.Provider>
	);
};

export default AdminState;
