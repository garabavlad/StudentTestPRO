import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Alert from './components/layouts/Alerts';
import Home from './components/pages/Home';
import Admin from './components/pages/Admin';
import About from './components/pages/About';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

import ContactState from './context/contact/ContactState';
import AuthState from './context/auth/AuthState';
import AlertState from './context/alert/AlertState';
import AdminState from './context/adminTest/AdminState';

//setting token
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	return (
		<AuthState>
			<AlertState>
				<AdminState>
					<ContactState>
						<Router>
							<Fragment>
								<Navbar />
								<div className='container'>
									<Alert />
									<Switch>
										<PrivateRoute exact path='/' component={Home} />
										<PrivateRoute exact path='/admin' component={Admin} />
										<Route exact path='/about' component={About} />
										<Route exact path='/register' component={Register} />
										<Route exact path='/login' component={Login} />
									</Switch>
								</div>
							</Fragment>
						</Router>
					</ContactState>
				</AdminState>
			</AlertState>
		</AuthState>
	);
}

export default App;
