import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import BlockList from './BlockList';
import SelectedBlockDetails from './SelectedBlockDetails';
import SelectedBlockTransactions from './SelectedBlockTransactions';

// import { getbestblock } from '../../store/actions';
import { actions } from 'shared';
import styles from './styles';

function Blocks({ classes, getbestblock, match }) {

	useEffect(() => {
		if (!match.params.height) {
			getbestblock();
		} 
	}, []);

	return (
		<Grid container justify='center'>
			<Grid item xs={12} md={11} >
				<Paper elevation={1} style={{marginTop: 30}} >
					<Grid container className={classes.container} spacing={3}>
						<Grid item xs={12} sm={3}>
							<BlockList />
						</Grid>
						<Grid item xs={9}>
							<SelectedBlockDetails />
							<Grid container spacing={2}>
								<Grid item xs={12}>
									<SelectedBlockTransactions />
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Grid>
		</Grid>
	);
};

const getbestblock = actions.getbestblock;

const mapDispatchToProps = ({ 
	getbestblock
});

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(Blocks);