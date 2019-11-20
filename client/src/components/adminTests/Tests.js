import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import TestItem from './TestItem';
import Spinner from '../layouts/Spinner';

import AdminContext from '../../context/adminTest/adminContext';

const Tests = () => {
	const adminContext = useContext(AdminContext);

	const { tests, filtered, getTests, loading } = adminContext;

	useEffect(
		() => {
			getTests();
		},
		// eslint-disable-next-line
		[]
	);

	if (tests && tests.length === 0 && !loading) {
		return <h4>Va rog sa adaugati un test</h4>;
	}

	return (
		<Fragment>
			{tests !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null ? (
						filtered.map((test) => (
							<CSSTransition key={test._id} timeout={500} classNames='item'>
								<TestItem test={test} />
							</CSSTransition>
						))
					) : (
						tests.map((test) => (
							<CSSTransition key={test._id} timeout={500} classNames='item'>
								<TestItem test={test} />
							</CSSTransition>
						))
					)}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Tests;
