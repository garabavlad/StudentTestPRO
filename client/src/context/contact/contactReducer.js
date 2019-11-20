import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CLEAR_FILTER,
	GET_CONTACTS,
	CONTACTS_FAIL,
	CLEAR_ERRORS,
	CLEAR_CONTACTS
} from '../types';

export default (state, action) => {
	switch (action.type) {
		case ADD_CONTACT:
			return {
				...state,
				contacts : [ action.payload, ...state.contacts ],
				loading  : false
			};

		case GET_CONTACTS:
			return {
				...state,
				contacts : action.payload,
				loading  : false
			};

		case DELETE_CONTACT:
			return {
				...state,
				error   : action.payload.msg,
				loading : false
			};

		case UPDATE_CONTACT:
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

		case FILTER_CONTACTS:
			return {
				...state,
				filtered : state.contacts.filter((contact) => {
					const regex = new RegExp(`${action.payload}`, 'gi');
					return contact.name.match(regex) || contact.email.match(regex) || contact.phone.match(regex);
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

		case CLEAR_CONTACTS:
			return {
				contacts : null,
				current  : null,
				filtered : null,
				error    : null,
				loading  : false
			};

		case CONTACTS_FAIL:
			return {
				...state,
				error : action.payload
			};

		default:
			return state;
	}
};
