import React, { useContext, useState, useEffect, Fragment } from 'react';
import AdminContext from '../../context/adminTest/adminContext';

const TestForm = () => {
	const adminContext = useContext(AdminContext);
	const { addTest, updateTest, current, clearCurrent } = adminContext;

	useEffect(
		() => {
			if (current !== null) {
				const { name, parts } = current;
				const { body, answers, correct } = parts;

				// Distructuring the object to fit our state
				setTest({
					name,
					body,
					answers,
					correct
				});
			}
			else {
				setTest({
					name    : '',
					body    : '',
					answers : [ '', '' ],
					correct : [ false, false ]
				});
			}
		},
		[ adminContext, current ]
	);

	const [ test, setTest ] = useState({
		name    : '',
		body    : '',
		answers : [ '', '' ],
		correct : [ false, false ]
	});

	const { name, body, answers, correct } = test;

	// For Title and Body inputs
	const onChange = (e) => setTest({ ...test, [e.target.name]: e.target.value });
	//Special handle for answers
	const onChangeAnswer = (e) => {
		answers[e.target.name] = e.target.value;
		setTest({ ...test, answers });
	};
	//Handling the answers checkboxes
	const onChangeChecking = (e) => {
		correct[e.target.name] = !correct[e.target.name];
		setTest({ ...test, correct });
	};

	// When we submit
	const onSubmit = (e) => {
		e.preventDefault();

		// we do the opposite of what we did in the useEffect:
		// here we recreate the object to the db standard
		let dbObj = {
			name  : test.name,
			parts : {
				body    : test.body,
				answers : test.answers,
				correct : test.correct
			}
		};

		if (current !== null) {
			dbObj = {
				_id : current._id,
				...dbObj
			};
		}

		if (current !== null) {
			updateTest(dbObj);
			clearCurrent();
		}
		else {
			addTest(dbObj);
		}
	};

	const onClickClear = () => {
		clearCurrent();
	};

	//For new answers
	const onClickAddAnswer = () => {
		setTest({ ...test, answers: [ ...answers, '' ], correct: [ ...correct, false ] });
	};

	return (
		<form onSubmit={onSubmit}>
			<h2 className='text-primary'>{current ? 'Redactare test' : 'Test nou'}</h2>
			<input type='text' name='name' required placeholder='Titlu test' value={name} onChange={onChange} />
			<textarea
				name='body'
				value={body}
				className='textarea-test'
				placeholder='Cuprinsul testului...'
				required
				onChange={onChange}
			/>
			<br />
			<label value='Raspunsuri:' />
			{answers.map((ans, index) => (
				<Fragment key={index}>
					<input
						type='text'
						name={index}
						required
						placeholder={'Raspunsul ' + (index + 1).toString()}
						value={answers[index]}
						onChange={onChangeAnswer}
						className='input answer'
					/>
					<input
						type='checkbox'
						name={index}
						value='unic'
						checked={correct[index]}
						onChange={onChangeChecking}
					/>
				</Fragment>
			))}
			<br />
			<i
				className='fas fa-plus'
				style={{ fontSize: 30, marginLeft: '47%', marginBottom: '20px' }}
				onClick={onClickAddAnswer}
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
