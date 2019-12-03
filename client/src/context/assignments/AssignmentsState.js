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
	ASSIGNMENTS_FAIL,
	UPDATE_ASSIGNMENT
} from '../types';

const AssignmentState = (props) => {
	const initialState = {
		// assignments actually takes an object with{ user: user id, testList with an array of test ids}
		assignments : null,
		error       : null,
		loading     : true
	};

	const [ state, dispatch ] = useReducer(assignmentReducer, initialState);

	//ADD ASSIGNMENT
	const addAssignment = async (user, tests) => {
		const config = {
			headers : {
				'Content-Type' : 'application/json'
			}
		};

		try {
			const res = await axios.post('/api/assignments', { user, testList: tests }, config);

			dispatch({ type: ADD_ASSIGNMENT, payload: res.data });
			getAssignments(user);
		} catch (err) {
			console.error(err);
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data });
		}
	};

	//UPDATE ASSIGNMENT
	const updateAssignment = async (assignment) => {
		try {
			const config = {
				headers : {
					'Content-Type' : 'application/json'
				}
			};

			const res = await axios.put(`/api/assignments/${assignment._id}`, assignment, config);

			dispatch({ type: UPDATE_ASSIGNMENT, payload: res.data });
			getAssignments(assignment.user);
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data });
		}
	};

	//GET ASSIGNMENTS
	const getAssignments = async (_id) => {
		try {
			const res = await axios.get(`/api/assignments/${_id}`);

			dispatch({ type: GET_ASSIGNMENT, payload: res.data });
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data });
		}
	};

	//DELETE ASSIGNMENT
	const deleteAssignment = async (_id) => {
		try {
			const res = await axios.delete(`/api/assignments/${_id}`);

			dispatch({ type: DELETE_ASSIGNMENT, payload: res.data });
		} catch (err) {
			dispatch({ type: ASSIGNMENTS_FAIL, payload: err.response.data });
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
				updateAssignment,
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
