import React, { useContext, useRef, useEffect } from 'react';
import AdminContext from '../../context/adminTest/adminContext';

const TestFilter = () => {
	const adminContext = useContext(AdminContext);
	const { filterTests, clearFilter, filtered } = adminContext;

	const text = useRef('');

	useEffect(() => {
		if (filtered === null) text.current.value = '';
	});

	const onChange = () => {
		if (text.current.value !== '') {
			filterTests(text.current.value);
		}
		else {
			clearFilter();
		}
	};

	return (
		<form>
			<input type='text' ref={text} placeholder='Find A Test...' onChange={onChange} />
		</form>
	);
};

export default TestFilter;
