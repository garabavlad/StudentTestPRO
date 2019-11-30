import React, { Fragment, useContext } from 'react';

import UserContext from '../../context/userTest/userContext';

const TestsTable = (props) => {
	const userContext = useContext(UserContext);

	const { tests, results } = userContext;
	const { onClick } = props;

	return (
		<Fragment>
			{tests.map((test) => {
				return (
					<div className='card user-card' style={{ minHeight: '30px' }} key={test._id}>
						<div className='grid-2' style={{ width: '100%' }}>
							<h2 className='user-card-title' style={{ justifyContent: 'center' }}>
								{test.name}
							</h2>
							<div className='grid-2'>
								<div>Numar de intrebari: {' ' + test.subtests.length}</div>
								{results.find((result) => result.test === test._id) ? (
									<h3>Test luat</h3>
								) : (
									<button className='btn btn-light' onClick={(e) => onClick(test)}>
										Incepe testul
									</button>
								)}
							</div>
						</div>
					</div>
				);
			})}
		</Fragment>
	);
};

export default TestsTable;
