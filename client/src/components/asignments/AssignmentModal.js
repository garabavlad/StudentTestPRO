import React from 'react';

const AssignmentModal = () => {
	return (
		<div id='assignmentModal' className='assignmentModal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<span className='modal-close-assig'>&times;</span>
					<h2>Atribuirea testelor pentru utilizatori</h2>
				</div>
				<div className='modal-body'>
					<p>Some text in the Modal Body</p>
					<p>In dev</p>
				</div>
			</div>
		</div>
	);
};

export default AssignmentModal;
