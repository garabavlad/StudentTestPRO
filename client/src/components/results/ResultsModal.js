import React, { useContext, useEffect } from 'react';
import UserResultsTable from '../userTests/ResultsTable';
import AdminResultsTable from '../adminTests/ResultsTable';

import AuthContext from '../../context/auth/authContext';
import UserContext from '../../context/userTest/userContext';
import AdminContext from '../../context/adminTest/adminContext';
import Spinner from '../layouts/Spinner';

const ResultsModal = () => {
	const authContext = useContext(AuthContext);
	const userContext = useContext(UserContext);
	const adminContext = useContext(AdminContext);

	const { isAdmin } = authContext;
	const userResults = userContext.results;
	// const adminResults = adminContext.results;
	const adminResults = null;

	useEffect(
		() => {},
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
						<AdminResultsTable /* results={adminResults} */ />
					) : (
						<UserResultsTable results={userResults} />
					)}
				</div>
			</div>
		</div>
	);
};

export default ResultsModal;
