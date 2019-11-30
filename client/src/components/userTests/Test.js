import React, { useContext, Fragment, useState, useEffect } from 'react';

import UserContext from '../../context/userTest/userContext';
import Spinner from '../layouts/Spinner';

const Test = (props) => {
	const userContext = useContext(UserContext);
	const { selectedTest, addResult } = userContext;

	const [ inputAnswers, setInputAnswers ] = useState(null);
	const [ correctAnswers, setCorrectAnswers ] = useState(null);

	useEffect(
		() => {
			if (selectedTest) {
				let corr = [];
				let inp = [];

				selectedTest.subtests.forEach((el) => {
					let tt = el.correct.slice();
					corr.push(tt);
				});

				selectedTest.subtests.forEach((el) => {
					inp.push(el.correct.slice().map((_el) => false));
				});

				setInputAnswers(inp);
				setCorrectAnswers(corr);
			}
		},
		// eslint-disable-next-line
		[]
	);

	// Returning to home page if there is no selectedTest
	if (selectedTest === null) {
		props.history.push('/');
		return <div />;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		let result = checkResults(inputAnswers, correctAnswers);
		result = { ...result, test: selectedTest._id };

		addResult(result);
		props.history.push('/');
	};

	const onChangeCheck = (i1, i2) => {
		let array = inputAnswers.slice();
		array[i1][i2] = !array[i1][i2];

		setInputAnswers(array);
	};

	return (
		<Fragment>
			{selectedTest !== null && inputAnswers !== null ? (
				<form onSubmit={onSubmit}>
					<h1 className='form-container'>{selectedTest.name}</h1>
					{selectedTest.subtests.map((sbt, index) => (
						<Fragment key={index}>
							<h3> {index + 1}</h3>
							<div className='card bg-light'>
								<h3>{sbt.body}</h3>
								<br />
								<div>
									{sbt.answers.map((answ, ind) => (
										<div key={ind} className='test-answer'>
											<input
												type='checkbox'
												checked={inputAnswers[index][ind]}
												onChange={() => onChangeCheck(index, ind)}
												style={{ margin: '1.2rem 1.0rem' }}
											/>
											{answ}
										</div>
									))}
								</div>
							</div>
						</Fragment>
					))}
					<div>
						<input type='submit' className='btn btn-primary btn-block' value='Confirma' />
					</div>
					<br />
					<br />
				</form>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

// Checking the submitted results with the correct ones
const checkResults = (input, correct) => {
	let correctTasks = 0;
	let totalTasks = correct.length;
	let correctPercent = 0;

	correct.forEach((item, index) => {
		let isCorrect = true;
		item.forEach((itm, indx) => {
			if (itm !== input[index][indx]) isCorrect = false;
		});

		if (isCorrect) correctTasks++;
	});

	correctPercent = correctTasks / totalTasks * 100;

	return {
		scoreTaken : correctTasks,
		scoreMax   : totalTasks,
		percent    : correctPercent
	};
};

export default Test;
