import React, { useContext, useEffect, Fragment } from 'react';

import Tests from '../adminTests/Tests';
import TestForm from '../adminTests/TestForm';
import TestFilter from '../adminTests/TestFilter';

import AuthContext from '../../context/auth/authContext';
import AssignmentButton from '../asignments/AssignmentButton';
import AssignmentModal from '../asignments/AssignmentModal';
import ResultsButton from '../results/ResultsButton';
//import AlertContext from '../../context/alert/alertContext';

export const Admin = (props) => {
	const authContext = useContext(AuthContext);
	//const alertContext = useContext(AlertContext);

	const { loadUser, isAdmin } = authContext;
	//const { error, setAlert, clearErrors } = alertContext;

	useEffect(
		() => {
			loadUser();

			if (isAdmin === false) {
				props.history.push('/');
			}

			// Some js for handling the modal
			handleModal();
		},
		// eslint-disable-next-line
		[ isAdmin ]
	);

	return (
		<Fragment>
			<AssignmentModal />

			<div className='grid-2'>
				<div>
					<TestForm />
				</div>
				<div>
					<TestFilter />
					<Tests />
				</div>
				<ResultsButton />
				<AssignmentButton />
			</div>
		</Fragment>
	);
};

// function for hadling the assignment modal
const handleModal = () => {
	let modal = document.getElementById('assignmentModal');
	let btn = document.getElementById('assignmentProc');
	let span = document.getElementsByClassName('modal-close')[0];

	btn.onclick = function() {
		modal.style.display = 'block';
	};

	span.onclick = function() {
		modal.style.display = 'none';
	};

	window.onclick = function(event) {
		if (event.target === modal) {
			modal.style.display = 'none';
		}
	};
};

export default Admin;
