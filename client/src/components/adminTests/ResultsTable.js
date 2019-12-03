import React, { useContext, useEffect } from 'react';

import AdminContext from '../../context/adminTest/adminContext';
import AlertContext from '../../context/alert/alertContext';

const ResultsTable = (props) => {
	const adminContext = useContext(AdminContext);
	const alertContext = useContext(AlertContext);

	const { getUsers, users_list, tests, deleteResult } = adminContext;
	const { setAlert } = alertContext;
	const { results } = props;

	//onLoad
	useEffect(
		() => {
			getUsers();
		},
		// eslint-disable-next-line
		[]
	);

	const onClickDeleteResult = (_id) => {
		deleteResult(_id);
		setAlert('Rezultatul a fost sters cu succes', 'success');
	};

	return (
		<table style={{ width: '100%', background: 'white' }}>
			<tbody>
				<tr>
					<th>Numele Utilizator</th>
					<th>Numele Testului</th>
					<th>Data</th>
					<th>Raspunsuri Corecte</th>
					<th>Raspunsuri Totale</th>
					<th>Randament</th>
					<th>Sterge</th>
				</tr>
				{results &&
					tests &&
					results.map((result, index) => {
						//formatting date to display
						const event = new Date(result.date);
						const options = { year: 'numeric', month: 'long', day: 'numeric' };
						const date = event.toLocaleDateString('ro-RO', options);

						// getting test name to display
						let testName = '';
						tests.forEach((itm) => {
							if (itm._id === result.test) testName = itm.name;
						});

						// getting user name to display
						let userName = '';
						users_list.forEach((itm) => {
							if (itm._id === result.user) userName = itm.name;
						});

						return (
							<tr key={index}>
								<td>{userName}</td>
								<td>{testName}</td>
								<td>{date}</td>
								<td>{result.scoreTaken}</td>
								<td>{result.scoreMax}</td>
								<td>{result.percent} </td>
								<td style={{ textAlign: 'center' }}>
									<i
										className='fas fa-times'
										style={{ cursor: 'pointer', fontSize: '20px' }}
										onClick={() => onClickDeleteResult(result._id)}
									/>
								</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

export default ResultsTable;
