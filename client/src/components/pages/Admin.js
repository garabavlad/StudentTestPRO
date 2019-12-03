import React, { useContext, useEffect, Fragment } from 'react';

import Tests from '../adminTests/Tests';
import TestForm from '../adminTests/TestForm';
import TestFilter from '../adminTests/TestFilter';
import AssignmentButton from '../asignments/AssignmentButton';
import AssignmentModal from '../asignments/AssignmentModal';
import ResultsButton from '../results/ResultsButton';
import ResultsModal from '../results/ResultsModal';

import AuthContext from '../../context/auth/authContext';
import AdminContext from '../../context/adminTest/adminContext';
import AlertContext from '../../context/alert/alertContext';

export const Admin = (props) => {
	const authContext = useContext(AuthContext);
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { loadUser, isAdmin, user } = authContext;
	const { error, clearErrors } = adminContext;
	const { setAlert } = alertContext;

	useEffect(
		() => {
			if (!user) loadUser();

			if (isAdmin === false) {
				props.history.push('/');
			}

			//Displaying alerts
			if (error === 'Contact updated sucessfully') {
				setAlert('Testul a fost editat cu succes', 'success');
			}
			if (error === 'Contact deleted sucessfully') {
				setAlert('Testul a fost sters cu succes', 'success');
			}
			if (error === 'Testul a fost adaugat cu succes') {
				setAlert(error, 'success');
			}
			if (error === 'Contact updated sucessfully') {
				setAlert('Testul a fost editat cu succes', 'success');
			}
			clearErrors();

			// Some js for handling the modal
			handleModal();
		},
		// eslint-disable-next-line
		[ isAdmin, error ]
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
