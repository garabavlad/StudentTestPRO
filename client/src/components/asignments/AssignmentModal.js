import React, { useEffect, useContext, useState } from 'react';

import AdminContext from '../../context/adminTest/adminContext';
import ModalUsers from './ModalUsers';
import ModalTests from './ModalTests';

const AssignmentModal = () => {
	const adminContext = useContext(AdminContext);

	const { getUsers, users_list, tests } = adminContext;

	const [ selectedUser, setSelectedUser ] = useState(null);
	const [ selectedTests, setSelectedTests ] = useState([]);

	useEffect(
		() => {
			getUsers();
		},
		// eslint-disable-next-line
		[]
	);

	const onChangeUsers = (_id) => {
		setSelectedUser(_id);

		//GETTING ASSIGNMENTS AND LINK THEM TO SELECTED TESTS LIST
	};

	const onChangeTests = (_id) => {
		if (selectedTests.find((id) => id === _id)) {
		}
		else {
		}
	};

	return (
		<div id='assignmentModal' className='assignmentModal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<span className='modal-close-assig'>&times;</span>
					<h2>Atribuirea testelor pentru utilizatori</h2>
				</div>
				<div className='modal-body'>
					<form>
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
								<input type='submit' value={'Revoca testele'} className='btn btn-primary btn-block' />
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
