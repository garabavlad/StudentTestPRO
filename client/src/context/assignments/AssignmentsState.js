import React, { useReducer } from 'react';
import axios from 'axios';
import assignmentContext from './assignmentsContext';
import assignmentReducer from './assignmentsReducer';
import {
	ADD_ASSIGNMENT,
	DELETE_ASSIGNMENT,
	GET_ASSIGNMENT,
	CLEAR_ASSIGNMENT,
	CLEAR_ERRORS,
	ASSIGNMENTS_FAIL
} from '../types';

const AssignmentState = (props) => {
	const initialState = {
		assignments : null,
		error       : null,
		loading     : true
	};

	const [ state, dispatch ] = useReducer(assignmentReducer, initialState);

	//ADD ASSIGNMENT
	const addAssignment = async (user, test) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/assignments', { user, test }, config);

			dispatch({ type: ADD_ASSIGNMENT, payload: res.data });
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data.msg });
		}
	};

	//GET ASSIGNMENTS
	const getAssignments = async (_id) => {
		try {
			const res = await axios.get(`/api/assignments/${_id}`);

			dispatch({ type: GET_ASSIGNMENT, payload: res.data });
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data.msg });
		}
	};

	//DELETE ASSIGNMENT
	const deleteAssignment = async (_id) => {
		try {
			const res = await axios.delete(`/api/assignments/${_id}`);

			dispatch({ type: DELETE_ASSIGNMENT, payload: res.data, _id: _id });
			getAssignments();
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data.msg });
		}
	};

	//CLEAR ERRORS
	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};

	//CLEAR TESTS or  ON LOGOUT
	const clearAssignments = () => {
		dispatch({ type: CLEAR_ASSIGNMENT });
	};

	return (
		<assignmentContext.Provider
			value={{
				assignments      : state.assignments,
				current          : state.current,
				error            : state.error,
				loading          : state.loading,

				addAssignment,
				deleteAssignment,
				getAssignments,
				clearAssignments,
				clearErrors
			}}>
			{props.children}
		</assignmentContext.Provider>
	);
};

export default AssignmentState;
