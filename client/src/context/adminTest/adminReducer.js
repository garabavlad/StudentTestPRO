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
	CLEAR_ERRORS,
	GET_USERS,
	RESULTS_FAIL,
	GET_RESULTS,
	DELETE_RESULT
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_TEST:
			return {
				...state,
				tests   : [ ...state.tests, action.payload ],
				loading : false,
				error   : 'Testul a fost adaugat cu succes'
			};

		case GET_TESTS:
			return {
				...state,
				tests   : action.payload,
				loading : false
			};

		case DELETE_TEST:
		case UPDATE_TEST:
		case DELETE_RESULT:
			return {
				...state,
				error   : action.payload.msg,
				loading : false
			};

		case SET_CURRENT:
			return {
				...state,
				current : action.payload
			};

		case CLEAR_CURRENT:
			return {
				...state,
				current : null
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

		case CLEAR_ERRORS:
			return {
				...state,
				error : null
			};

		case CLEAR_TESTS:
			return {
				tests    : null,
				current  : null,
				filtered : null,
				error    : null,
				loading  : false
			};

		case GET_USERS:
			return {
				...state,
				users_list : action.payload,
				loading    : false
			};

		case GET_RESULTS:
			return {
				...state,
				results : action.payload
			};

		case TESTS_FAIL:
		case RESULTS_FAIL:
			return {
				...state,
				error : action.payload
			};

		default:
			return state;
	}
};
