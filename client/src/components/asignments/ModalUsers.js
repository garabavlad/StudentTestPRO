import React from 'react';

const ModalUsers = (props) => {
	const { users, onChange, selected } = props;
	return (
		<ul className='list'>
			{users &&
				users.map((usr) => (
					<li key={usr._id}>
						<input
							type='radio'
							value={usr._id}
							checked={selected === usr._id}
							onChange={onChange.bind(this, usr._id)}
						/>
						<span style={{ marginLeft: '5px', fontSize: '18px' }}>{' ' + usr.name}</span>
					</li>
				))}
		</ul>
	);
};

export default ModalUsers;
