import React from 'react';

const ModalTests = (props) => {
	const { tests, onChange, selected } = props;
	return (
		<ul className='list'>
			{tests &&
				tests.map((test) => (
					<li key={test._id}>
						<input
							type='checkbox'
							value={test._id}
							checked={selected && selected.find((id) => id === test._id)}
							onChange={onChange.bind(this, test._id)}
						/>
						<span style={{ marginLeft: '5px', fontSize: '18px' }}>{' ' + test.name}</span>
					</li>
				))}
		</ul>
	);
};

export default ModalTests;
