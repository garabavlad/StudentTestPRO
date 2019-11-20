import React, { useContext, useState, useEffect } from 'react';
import AdminContext from '../../context/adminTest/adminContext';
import Subtest from './Subtest';

const TestForm = () => {
	const adminContext = useContext(AdminContext);
	const { addTest, updateTest, current, clearCurrent } = adminContext;

	useEffect(
		() => {
			if (current !== null) {
				setTest(current);
			}
			else {
				setTest({
					name     : '',
					subtests : [
						{
							body    : '',
							answers : [ '', '' ],
							correct : [ false, false ]
						}
					]
				});
			}
		},
		[ adminContext, current ]
	);

	const [ test, setTest ] = useState({
		name     : '',
		subtests : [
			{
				body    : '',
				answers : [ '', '' ],
				correct : [ false, false ]
			}
		]
	});

	const { name, subtests } = test;

	// For Title input
	const onChange = (e) => setTest({ ...test, [e.target.name]: e.target.value });
	//Handling subtest bodies
	const onChangeSubtestBody = (e, index) =>
		setTest({
			...test,
			subtests : subtests.map((sbt, i) => {
				if (index !== i) {
					return sbt;
				}
				else {
					return {
						...sbt,
						body : e.target.value
					};
				}
			})
		});
	//Handling subtest answers inputs
	const onChangeSubtestAnswer = (e, index, aIndex) =>
		setTest({
			...test,
			subtests : subtests.map((sbt, i) => {
				if (index !== i) {
					return sbt;
				}
				else {
					const { answers } = sbt;
					answers[aIndex] = e.target.value;
					return {
						...sbt,
						answers
					};
				}
			})
		});
	//Handling the subtest answers checkboxes
	const onChangeSubtestChecking = (e, index, aIndex) => {
		setTest({
			...test,
			subtests : subtests.map((sbt, i) => {
				if (index !== i) {
					return sbt;
				}
				else {
					const { correct } = sbt;
					correct[aIndex] = !correct[aIndex];
					return {
						...sbt,
						correct
					};
				}
			})
		});
	};

	// When we submit
	const onSubmit = (e) => {
		e.preventDefault();

		if (current !== null) {
			setTest({
				_id : current._id,
				...test
			});

			updateTest(test);
			clearCurrent();
		}
		else {
			addTest(test);
		}
	};

	const onClickClear = () => {
		clearCurrent();
	};

	//For new subtest answers
	const onClickAddAnswer = (index) =>
		setTest({
			...test,
			subtests : subtests.map((sbt, i) => {
				if (index !== i) {
					return sbt;
				}
				else {
					const { answers, correct } = sbt;
					return {
						...sbt,
						answers : [ ...answers, '' ],
						correct : [ ...correct, false ]
					};
				}
			})
		});

	//For new subtests
	const onClickAddSubtest = () =>
		setTest({
			...test,
			subtests : [
				...subtests,
				{
					body    : '',
					answers : [ '', '' ],
					correct : [ false, false ]
				}
			]
		});

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Redactare test' : 'Test nou'}</h2>
			<input type='text' name='name' required placeholder='Titlu test' value={name} onChange={onChange} />
			<br />

			{subtests &&
				subtests.map((subtest, index) => (
					<Subtest
						subtest={subtest}
						key={index}
						index={index}
						onClickAddAnswer={onClickAddAnswer}
						onChangeSubtestChecking={onChangeSubtestChecking}
						onChangeSubtestAnswer={onChangeSubtestAnswer}
						onChangeSubtestBody={onChangeSubtestBody}
					/>
				))}
			<i
				className='fas fa-text-height'
				style={{ fontSize: 30, marginLeft: '47%', marginBottom: '20px', cursor: 'pointer' }}
				onClick={onClickAddSubtest}
			/>

			<h5>Nota: Raspunsurile bifate sunt cele care se considera adevarate!</h5>
			<div>
				<input
					type='submit'
					value={current ? 'Editeaza testul' : 'Adauga testul'}
					className='btn btn-primary btn-block'
				/>
			</div>
			{current && (
				<div>
					<button onClick={onClickClear} className='btn btn-light btn-block'>
						Inapoi
					</button>
				</div>
			)}
		</form>
	);
};

export default TestForm;
