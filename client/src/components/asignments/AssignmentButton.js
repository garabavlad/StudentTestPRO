import React from 'react';

const AssignmentButton = () => {
	return (
		<i
			id='assignmentProc'
			className='fas fa-users'
			aria-hidden='true'
			style={{
				fontSize   : '55px',
				position   : 'fixed',
				bottom     : '70px',
				right      : '10px',
				cursor     : 'pointer',
				textShadow : '3px 3px 16px #272634'
			}}
		/>
	);
};

export default AssignmentButton;
