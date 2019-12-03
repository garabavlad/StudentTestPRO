import React, { useContext, useRef, useEffect } from 'react';
import UserContext from '../../context/userTest/userContext';

const TestFilter = () => {
	const userContext = useContext(UserContext);
	const { setFiltered, clearFiltered, filtered } = userContext;

	const text = useRef('');

	useEffect(() => {
		if (filtered === null) text.current.value = '';
	});

	const onChange = () => {
		if (text.current.value !== '') {
			setFiltered(text.current.value);
		}
		else {
			clearFiltered();
		}
	};

	return (
		<form>
			<input type='text' ref={text} placeholder='Cauta un test...' onChange={onChange} />
		</form>
	);
};

export default TestFilter;
