import React, { useContext, useEffect, Fragment } from 'react';

import Spinner from '../layouts/Spinner';
import TestsTable from '../userTests/TestsTable';
import ResultsButton from '../results/ResultsButton';
import ResultsModal from '../results/ResultsModal';

import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import UserContext from '../../context/userTest/userContext';
import TestFilter from '../userTests/TestFilter';

const Home = (props) => {
	const authContext = useContext(AuthContext);
	const alertContext = useContext(AlertContext);
	const userContext = useContext(UserContext);

	const { error, clearErrors, loading, getTests, tests, setSelected, getResults, results, filtered } = userContext;
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
			if (error === 'Result added successfully!') {
				setAlert('Testul a fost confirmat! Verificati rezultatele', 'success');
			}
			clearErrors();

			//modal handling
			!loading && handleModal();
		},
		// eslint-disable-next-line
		[ error, isAdmin, user, loading ]
	);

	/* Case when no tests are available */
	if (tests && tests.length === 0 && !loading) {
		return (
			<Fragment>
				{!loading && <ResultsModal />}
				<div className='card bg-light text-center user-card'>Momentan, nu ti s-a atribuit nici un test</div>
				<ResultsButton />
			</Fragment>
		);
	}

	const onClickTest = (test) => {
		setSelected(test);
		props.history.push('/test');
	};

	return (
		<Fragment>
			{!loading && <ResultsModal />}
			{tests !== null && !loading ? (
				<Fragment>
					<TestFilter />

					{filtered !== null ? (
						<TestsTable onClick={onClickTest} tests={filtered} results={results} />
					) : (
						<TestsTable onClick={onClickTest} tests={tests} results={results} />
					)}
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
