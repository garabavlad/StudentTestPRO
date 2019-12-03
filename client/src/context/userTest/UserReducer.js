import {
	GET_TESTS,
	TESTS_FAIL,
	CLEAR_TESTS,
	CLEAR_ERRORS,
	SET_SELECTED_TEST,
	CLEAR_SELECTED_TEST,
	FILTER_TESTS,
	CLEAR_FILTER,
	GET_RESULTS,
	RESULTS_FAIL,
	ADD_RESULT
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case GET_TESTS:
			return {
				...state,
				tests   : action.payload,
				loading : false
			};

		case GET_RESULTS:
			return {
				...state,
				results : action.payload,
				loading : false
			};

		case CLEAR_ERRORS:
			return {
				...state,
				error : null
			};

		case SET_SELECTED_TEST:
			return {
				...state,
				selectedTest : action.payload
			};

		case CLEAR_SELECTED_TEST:
			return {
				...state,
				selectedTest : null
			};

		case FILTER_TESTS:
			return {
				...state,
				filtered : state.tests.filter((test) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return test.name.match(regex);
				})
			};

		case CLEAR_FILTER:
			return {
				...state,
				filtered : null
			};

		case CLEAR_TESTS:
			return {
				tests    : null,
				current  : null,
				filtered : null,
				error    : null,
				loading  : false
			};

		case TESTS_FAIL:
		case RESULTS_FAIL:
		case ADD_RESULT:
			return {
				...state,
				error : action.payload.msg
			};

		default:
			return state;
	}
};
