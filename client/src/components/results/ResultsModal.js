import React, { useContext, useEffect } from 'react';
import UserResultsTable from '../userTests/ResultsTable';
import AdminResultsTable from '../adminTests/ResultsTable';
import Spinner from '../layouts/Spinner';

import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/userTest/userContext';
import AdminContext from '../../context/adminTest/adminContext';

const ResultsModal = () => {
	const authContext = useContext(AuthContext);
	const userContext = useContext(UserContext);
	const adminContext = useContext(AdminContext);

	const { isAdmin, loadUser, user } = authContext;
	const userResults = userContext.results;
	const userGetResults = userContext.getResults;
	const adminResults = adminContext.results;
	const adminGetResults = adminContext.getResults;

	useEffect(
		() => {
			if (!user) loadUser();

			user && !isAdmin && userGetResults(user._id);
			user && isAdmin && adminGetResults();
		},
		// eslint-disable-next-line
		[]
	);

	return (
		<div id='resultsModal' className='resultsModal'>
			<div className='modal-content result-modal'>
				<div className='modal-header'>
					<span className='modal-close-res'>&times;</span>
					{isAdmin ? <h2>Rezultatele utilizatorilor</h2> : <h2>Rezultatele testelor</h2>}
				</div>
				<div className='modal-body'>
					{userResults === null && adminResults === null ? (
						<Spinner />
					) : isAdmin ? (
						<AdminResultsTable results={adminResults} />
					) : (
						<UserResultsTable results={userResults} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ResultsModal;
