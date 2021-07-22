import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
// import { 
//     getblockchaininfo,
//     getconnectioncount
//  } from '../../store/actions';

 import { actions } from 'shared';

import BlockchainInfo from '../BlockchainInfo';
import styles from './styles';

const Dashboard = ({ 
        blockchaininfo,
        connectioncount,
        getblockchaininfo,
        getconnectioncount,
        classes 
    }) => {

    useEffect(() => {
        getblockchaininfo();
        getconnectioncount();
    }, []);

    console.log('connectioncount==', connectioncount);
    console.log('blockchaininfo==', blockchaininfo);

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} sm={6} >
                <Paper elevation={1} className={classes.paper}>
                    <BlockchainInfo blockchaininfo={blockchaininfo} />
                </Paper>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = state => ({
    blockchaininfo: state.blockchaininfo,
    connectioncount: state.connectioncount
});

const { getblockchaininfo, getconnectioncount } = actions;

const mapDispatchToProps = ({ 
    getblockchaininfo,
    getconnectioncount
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);