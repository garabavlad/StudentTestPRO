import {
	ADD_ASSIGNMENT,
	DELETE_ASSIGNMENT,
	GET_ASSIGNMENT,
	UPDATE_ASSIGNMENT,
	CLEAR_ASSIGNMENT,
	ASSIGNMENTS_FAIL,
	CLEAR_ERRORS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_ASSIGNMENT:
			return {
				...state,
				assignments : [ action.payload, ...state.assignments ],
				loading     : false
			};

		case GET_ASSIGNMENT:
			return {
				...state,
				assignments : action.payload,
				loading     : false
			};

		case DELETE_ASSIGNMENT:
			return {
				...state,
				error   : action.payload.msg,
				loading : false
			};

		case UPDATE_ASSIGNMENT:
			return {
				...state,
				error   : action.payload.msg,
				loading : false
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error : null
			};

		case CLEAR_ASSIGNMENT:
			return {
				tests    : null,
				current  : null,
				filtered : null,
				error    : null,
				loading  : false
			};

		case ASSIGNMENTS_FAIL:
			return {
				...state,
				error : action.payload
			};

		default:
			return state;
	}
};
