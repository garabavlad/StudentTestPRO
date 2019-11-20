import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AdminContext from '../../context/adminTest/adminContext';

const TestItem = (props) => {
	const adminContext = useContext(AdminContext);

	const { _id, name, subtests } = props.test;
	// const { body, answers, correct } = parts;

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
				<li>
					<i className='fas fa-tasks' /> <b>Subteste: {subtests.length}</b>
				</li>
				<li>
					<ul className='list answer-list'>
						{subtests.map((sbt, index) => (
							<li key={index}>
								<i className='fas fa-file-alt' />{' '}
								{sbt.body.length < 60 ? sbt.body : sbt.body.substring(0, 60) + ' ...'}
							</li>
						))}
					</ul>
				</li>
			</ul>
			<p>
				<button className='btn btn-dark btn-sm' onClick={onClickEdit}>
					Detalii
				</button>
				<button className='btn btn-danger btn-sm' onClick={onClickDelete}>
					Sterge
				</button>
			</p>
		</div>
	);
};

TestItem.propTypes = {
	test : PropTypes.object.isRequired
};

export default TestItem;
