import React, { useContext, useEffect, Fragment } from 'react';

import Spinner from '../layouts/Spinner';
import TestsTable from '../userTests/TestsTable';
import ResultsButton from '../results/ResultsButton';
import ResultsModal from '../results/ResultsModal';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/userTest/userContext';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const userContext = useContext(UserContext);

	const { error, clearErrors, loading, getTests, tests, setSelected, getResults } = userContext;
	const { setAlert } = alertContext;
	const { loadUser, isAdmin, user } = authContext;

	//OnLoad
	useEffect(
		() => {
			if (!user) loadUser();

			//Transfer to admin page if it is an admin
			if (isAdmin) {
				props.history.push('/admin');
			}

			user && getTests(user._id);
			user && getResults(user._id);

			//Displaying alerts
			if (error === 'Test updated sucessfully' || error === 'Test deleted sucessfully') {
				setAlert(error, 'success');
			}
			clearErrors();

			//modal handling
			handleModal();
		},
		// eslint-disable-next-line
		[ error, isAdmin, user ]
	);

	/* Case when no tests are available */
	if (tests && tests.length === 0 && !loading) {
		return <div className='card bg-light text-center user-card'>Momentan, nu ti s-a atribuit nici un test</div>;
	}

	const onClickTest = (test) => {
		setSelected(test);
		props.history.push('/test');
	};

	return (
		<Fragment>
			<ResultsModal />
			{tests !== null && !loading ? (
				<Fragment>
					<TestsTable onClick={onClickTest} />
				</Fragment>
			) : (
				<Spinner />
			)}
			<ResultsButton />
		</Fragment>
	);
};

// function for hadling the assignment modal
const handleModal = () => {
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
		if (event.target === resultsModal) {
			resultsModal.style.display = 'none';
		}
	};
};

export default Home;
