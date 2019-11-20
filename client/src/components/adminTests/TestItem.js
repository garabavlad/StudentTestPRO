import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AdminContext from '../../context/adminTest/adminContext';

const TestItem = (props) => {
	const adminContext = useContext(AdminContext);

	const { _id, name, parts } = props.test;
	const { body, answers, correct } = parts;

	const { deleteTest, setCurrent, clearCurrent } = adminContext;

	const onClickDelete = () => {
		clearCurrent();
		deleteTest(_id);
	};

	const onClickEdit = () => {
		setCurrent(props.test);
	};

	return (
		<div className='card bg-light'>
			<h3 className='text-left text-primary'>{name} </h3>
			<ul className='list'>
				{body && (
					<li>
						<i className='fas fa-file-alt' />{' '}
						{body.length > 250 ? body.substring(0, 250) + ' (more...)' : body}
					</li>
				)}
				<br />
				<li>
					<i className='fas fa-tasks' />{' '}
					<u>
						<b>Answers:</b>
					</u>
				</li>
				<li>
					<ul className='list answer-list'>
						{answers.map((ans, index) => (
							<li key={index}>
								<i className={correct[index] ? 'fas fa-check' : 'fas fa-times'} /> {' ' + ans}
							</li>
						))}
					</ul>
				</li>
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={onClickEdit}>
					Edit
				</button>
				<button className='btn btn-danger btn-sm' onClick={onClickDelete}>
					Delete
				</button>
			</p>
		</div>
	);
};

TestItem.propTypes = {
	test : PropTypes.object.isRequired
};

export default TestItem;
