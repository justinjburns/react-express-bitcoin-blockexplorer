import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles'
import { Provider } from 'react-redux';
import CssBaseLine from '@material-ui/core/CssBaseline';
// import store from './store';
import { store } from 'shared';
import theme from './styles/theme';
import Nav from './components/Nav';
import Dashboard from './components/Dashboard';
import Blocks from './components/Blocks';

export default function App () {
	return (
		<Provider store={store}>
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<CssBaseLine />
					<Nav />
					<Switch>
						<Route path='/dashboard' component={Dashboard} />
						<Route path='/blocks/:height?' component={Blocks} />
					</Switch>
				</BrowserRouter>
			</MuiThemeProvider>
		</Provider>
	);
}
