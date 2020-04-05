import React, { useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { 
    getblockchaininfo,
    getconnectioncount
 } from '../../store/actions';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';

import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

import BlockchainInfo from '../BlockchainInfo';
import styles from './styles';

const Dashboard = ({ 
        blockchaininfo,
        connectioncount,
        getblockchaininfo,
        getconnectioncount,
        classes 
    }) => {

    useState(() => {
        getblockchaininfo();
        getconnectioncount();
    }, []);

    console.log('connectioncount==', connectioncount);
    console.log('blockchaininfo==', blockchaininfo);

    return (
        <Grid container spacing={2} className={classes.container}>
            <Grid item xs={12} sm={6} >
                {/* <Paper elevation={1} className={classes.paper}>
                    <BlockchainInfo blockchaininfo={blockchaininfo} />
                </Paper> */}

                <Paper elevation={1} className={classes.paper}>
                    <div className={classes.headerLeft}>
                        {/* <Avatar className={classes.avatar}>{ connectioncount }</Avatar> */}
                        <div>
                            <Typography variant='h5' >
                                Peer Connections
                            </Typography>
                            <Typography variant='subtitle1' >
                                Blocks: {
                                    blockchaininfo && (
                                    <span>
                                        <Chip color='primary' label={blockchaininfo.blocks} /> / 
                                        {/* <Chip label={blockchaininfo.headers} /> */}
                                    </span>
                                    )
                                }
                            </Typography>
                        </div>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    );
}
const mapStateToProps = state => ({
    blockchaininfo: state.blockchaininfo,
    connectioncount: state.connectioncount
});

const mapDispatchToProps = ({ 
    getblockchaininfo,
    getconnectioncount
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(Dashboard);