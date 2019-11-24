import React, { useEffect, useContext, useState } from 'react';

import AdminContext from '../../context/adminTest/adminContext';
import AssignmentsContext from '../../context/assignments/assignmentsContext';
import ModalUsers from './ModalUsers';
import ModalTests from './ModalTests';

const AssignmentModal = () => {
	const adminContext = useContext(AdminContext);
	const assignmentModal = useContext(AssignmentsContext);

	const { getUsers, users_list, tests } = adminContext;
	const { getAssignments, assignments, addAssignment, updateAssignment, deleteAssignment } = assignmentModal;

	const [ selectedUser, setSelectedUser ] = useState(null);
	const [ selectedTests, setSelectedTests ] = useState([]);

	//onLoad
	useEffect(
		() => {
			getUsers();
		},
		// eslint-disable-next-line
		[]
	);
	// Setting selected tests as assignments obj change
	useEffect(
		() => {
			setSelectedTests(assignments ? assignments.testList : []);
		},
		[ assignments ]
	);

	const onChangeUsers = (_id) => {
		setSelectedUser(_id);
		getAssignments(_id);
	};

	const onChangeTests = (changedTestId) => {
		let array = selectedTests.slice();
		let index = array.indexOf(changedTestId);
		if (index > -1) {
			array.splice(index, 1);
		}
		else {
			array.push(changedTestId);
		}
		setSelectedTests(array);
	};

	const onSubmit = (e) => {
		e.preventDefault();

		//some pre Context logic
		if (selectedUser) {
			if (selectedTests.length < 1) {
				if (assignments && assignments.testList) {
					// Case : No selected tests but it had before
					// Use : Delete Assignment
					deleteAssignment(assignments._id);
				}
				else {
					// Case : No selected tests and it did not have any before
					// Use : Ignore
					// -------
					// @todo : alert display no tests selected
				}
			}
			else {
				if (assignments && assignments.testList) {
					// Case : There are selected tests and it had before
					// Use : Edit assignment
					const newAssignment = {
						...assignments,
						testList : selectedTests
					};
					updateAssignment(newAssignment);
				}
				else {
					// Case : There are selected tests but it did not have any before
					// Use : Add assignment
					addAssignment(selectedUser, selectedTests);
				}
			}
		}
		// else return error == No user selected
	};

	const onClickRevoke = (e) => setSelectedTests([]);

	return (
		<div id='assignmentModal' className='assignmentModal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<span className='modal-close-assig'>&times;</span>
					<h2>Atribuirea testelor pentru utilizatori</h2>
				</div>
				<div className='modal-body'>
					<form onSubmit={onSubmit}>
						<div className='grid-2'>
							<div>
								<ModalUsers users={users_list} onChange={onChangeUsers} selected={selectedUser} />
							</div>
							<div>
								<ModalTests tests={tests} onChange={onChangeTests} selected={selectedTests} />
							</div>
						</div>
						<div className='grid-2'>
							<div>
								<input
									type='button'
									value={'Revoca testele'}
									className='btn btn-primary btn-block'
									style={{ font: 'inherit' }}
									onClick={onClickRevoke}
								/>
							</div>
							<div>
								<input type='submit' value={'Atribuie testele'} className='btn btn-primary btn-block' />
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AssignmentModal;
