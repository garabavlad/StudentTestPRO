import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alerts';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import About from './components/pages/About';
import Test from './components/userTests/Test';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import AssignmentsState from './context/assignments/AssignmentsState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AdminState from './context/adminTest/AdminState';
import UserState from './context/userTest/UserState';

//setting token
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<AlertState>
				<AdminState>
					<UserState>
						<AssignmentsState>
							<Router>
								<Fragment>
									<Navbar />
									<div className='container'>
										<Alert />
										<Switch>
											<PrivateRoute exact path='/' component={Home} />
											<PrivateRoute exact path='/test' component={Test} />
											<PrivateRoute exact path='/admin' component={Admin} />
											<Route exact path='/about' component={About} />
											<Route exact path='/register' component={Register} />
											<Route exact path='/login' component={Login} />
										</Switch>
									</div>
								</Fragment>
							</Router>
						</AssignmentsState>
					</UserState>
				</AdminState>
			</AlertState>
		</AuthState>
	);
}

export default App;
