import React, { Fragment } from 'react';

const Subtests = (props) => {
	const {
		subtest,
		index,
		onClickAddAnswer,
		onChangeSubtestBody,
		onChangeSubtestAnswer,
		onChangeSubtestChecking
	} = props;

	const { body, answers, correct } = subtest;

	return (
		<Fragment key={index}>
			<input type='checkbox' id={'spoiler' + index} />
			<label htmlFor={'spoiler' + index}>Subtestul {index + 1}</label>
			<div className='spoiler'>
				<textarea
					name='body'
					value={body}
					className='textarea-test'
					placeholder='Cuprinsul testului...'
					required
					onChange={(e) => onChangeSubtestBody(e, index)}
				/>

				<br />
				<label value='Raspunsuri:' />
				{answers.map((ans, ind) => (
					<Fragment key={ind}>
						<input
							type='text'
							name={ind}
							required
							placeholder={'Raspunsul ' + (ind + 1).toString()}
							value={answers[ind]}
							onChange={(e) => onChangeSubtestAnswer(e, index, ind)}
							className='input answer'
						/>
						<input
							type='checkbox'
							name={ind}
							value='unic'
							checked={correct[ind]}
							onChange={(e) => onChangeSubtestChecking(e, index, ind)}
						/>
					</Fragment>
				))}
				<br />
				<i
					className='fas fa-plus'
					style={{ fontSize: 30, marginLeft: '47%', cursor: 'pointer' }}
					onClick={onClickAddAnswer.bind(this, index)}
				/>
			</div>
		</Fragment>
	);
};

export default Subtests;
