import React from 'react';

const ResultsButton = () => {
	return (
		<i
			id='resultsProc'
			className='fas fa-chart-bar'
			aria-hidden='true'
			style={{
				fontSize   : '60px',
				position   : 'fixed',
				bottom     : '5px',
				right      : '13px',
				cursor     : 'pointer',
				textShadow : '3px 3px 16px #272634'
			}}
		/>
	);
};

export default ResultsButton;
