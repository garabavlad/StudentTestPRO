import React, { useContext, useEffect, Fragment } from 'react';

import Tests from '../adminTests/Tests';
import TestForm from '../adminTests/TestForm';
import TestFilter from '../adminTests/TestFilter';

import AuthContext from '../../context/auth/authContext';
import AssignmentButton from '../asignments/AssignmentButton';
import AssignmentModal from '../asignments/AssignmentModal';
import ResultsButton from '../results/ResultsButton';
import ResultsModal from '../results/ResultsModal';
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
			<ResultsModal />

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
	// for assignment modal
	let assignmentModal = document.getElementById('assignmentModal');
	let assignmentBtn = document.getElementById('assignmentProc');
	let assignmentClose = document.getElementsByClassName('modal-close-assig')[0];

	assignmentBtn.onclick = function() {
		assignmentModal.style.display = 'block';
	};

	assignmentClose.onclick = function() {
		assignmentModal.style.display = 'none';
	};

	// for result modal
	let resultsModal = document.getElementById('resultsModal');
	let resultsBtn = document.getElementById('resultsProc');
	let resultsClose = document.getElementsByClassName('modal-close-res')[0];

	resultsBtn.onclick = function() {
		resultsModal.style.display = 'block';
	};

	resultsClose.onclick = function() {
		resultsModal.style.display = 'none';
	};

	window.onclick = function(event) {
		if (event.target === assignmentModal || event.target === resultsModal) {
			resultsModal.style.display = 'none';
			assignmentModal.style.display = 'none';
		}
	};
};

export default Admin;
