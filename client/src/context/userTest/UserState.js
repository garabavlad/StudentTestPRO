import React, { useReducer } from 'react';
import axios from 'axios';
import userContext from './userContext';
import userReducer from './UserReducer';
import {
	TESTS_FAIL,
	CLEAR_TESTS,
	GET_TESTS,
	CLEAR_ERRORS,
	SET_SELECTED_TEST,
	CLEAR_SELECTED_TEST,
	FILTER_TESTS,
	CLEAR_FILTER,
	GET_RESULTS,
	ADD_RESULT,
	RESULTS_FAIL
} from '../types';

const UserState = (props) => {
	const initialState = {
		tests        : null,
		error        : null,
		loading      : true,
		filtered     : null,
		selectedTest : null,
		results      : null
	};

	const [ state, dispatch ] = useReducer(userReducer, initialState);

	//GET TESTS
	const getTests = async (userId) => {
		try {
			const res = await axios.get(`/api/tests/${userId}`);

			dispatch({ type: GET_TESTS, payload: res.data });
		} catch (err) {
			dispatch({ type: TESTS_FAIL, payload: err.response.data });
		}
	};

	//SET SELECTED TEST
	const setSelected = (test) => dispatch({ type: SET_SELECTED_TEST, payload: test });

	//CLEAR SELECTED TEST
	const clearSelected = () => dispatch({ type: CLEAR_SELECTED_TEST });

	//GET USER RESULTS
	const getResults = async (id) => {
		try {
			const res = await axios.get(`/api/results/${id}`);

			dispatch({ type: GET_RESULTS, payload: res.data });
		} catch (err) {
			dispatch({ type: RESULTS_FAIL, payload: err.response.data });
		}
	};

	//ADD RESULT
	const addResult = async (result) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/results', result, config);

			dispatch({ type: ADD_RESULT, payload: res.data });
		} catch (err) {
			dispatch({ type: RESULTS_FAIL, payload: err.response.data });
		}
	};

	//SET FILTERED
	const setFiltered = (text) => dispatch({ type: FILTER_TESTS, payload: text });

	//CLEAR FILTERED
	const clearFiltered = () => dispatch({ type: CLEAR_FILTER });

	//CLEAR ERRORS
	const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

	//CLEAR TESTS or  ON LOGOUT
	const clearTests = () => dispatch({ type: CLEAR_TESTS });

	return (
		<userContext.Provider
			value={{
				tests         : state.tests,
				error         : state.error,
				loading       : state.loading,
				filtered      : state.filtered,
				selectedTest  : state.selectedTest,
				results       : state.results,

				getTests,
				getResults,
				addResult,
				clearErrors,
				clearTests,
				setSelected,
				clearSelected,
				setFiltered,
				clearFiltered
			}}>
			{props.children}
		</userContext.Provider>
	);
};

export default UserState;
