import React from 'react';

const ResultsModal = () => {
	return (
		<div id='assignmentModal' className='assignmentModal'>
			<div className='modal-content'>
				<div className='modal-header'>
					<span className='modal-close'>&times;</span>
					<h2>Desemnarea testelor catre utilizatori</h2>
				</div>
				<div className='modal-body'>
					<p>Some text in the Modal Body</p>
					<p>Some other text...</p>
				</div>
			</div>
		</div>
	);
};

export default ResultsModal;
