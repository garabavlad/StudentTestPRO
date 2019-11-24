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
		case UPDATE_ASSIGNMENT:
			return {
				...state,
				error   : action.payload.msg,
				loading : false
			};

		case GET_ASSIGNMENT:
			return {
				...state,
				assignments : action.payload[0],
				loading     : false
			};

		case DELETE_ASSIGNMENT:
			return {
				...state,
				error       : action.payload.msg,
				loading     : false,
				assignments : null
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
				error : action.payload.msg
			};

		default:
			return state;
	}
};
