import React, { useContext } from 'react';

import UserContext from '../../context/userTest/userContext';

const ResultsTable = (props) => {
	const userContext = useContext(UserContext);

	const { tests } = userContext;
	const { results } = props;

	return (
		<table style={{ width: '100%', background: 'white' }}>
			<tbody>
				<tr>
					<th>Numele Testului</th>
					<th>Data</th>
					<th>Raspunsuri Corecte</th>
					<th>Raspunsuri Totale</th>
					<th>Randament</th>
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

						return (
							<tr key={index}>
								<td>{testName}</td>
								<td>{date}</td>
								<td>{result.scoreTaken}</td>
								<td>{result.scoreMax}</td>
								<td>{result.percent}</td>
							</tr>
						);
					})}
			</tbody>
		</table>
	);
};

export default ResultsTable;
