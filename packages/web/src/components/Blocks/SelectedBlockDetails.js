import React from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import styles from './styles';


function SelectedBlockDetails({ selectedBlock, classes }) {

    const col1 = ['confirmations', 'size', 'weight', 'height', 'version', 'versionHex' ,'merkleroot'];
    const col2 = ['time', 'nonce', 'difficulty', 'bits', 'chainwork', 'nTx', 'previousblockhash'];
    const skeletonArr = Array.from(Array(6).keys());

    const formatValues = (key) => {
        switch(key) {
            case 'hash':
            case 'chainwork':
            case 'previousblockhash':
            case 'nextblockhash':
                return `0...${selectedBlock[key].replace(/^0+/,'').substr(0, 8)}`;
            case 'merkleroot':
                return `${selectedBlock[key].substr(0, 8)}..`;
            case 'difficulty':
                return selectedBlock[key].toExponential(3);
            case 'time':
                return moment.unix(selectedBlock[key]).format('MM/DD/YY HH:mm');
            case 'tx':
                return `[ ${selectedBlock[key].length} ]`;
            case 'size':
                return ` ${( selectedBlock[key] / 1000000 ).toFixed(3)} MB `;
            default: 
                return selectedBlock[key];
        }
    }

    return (
        <Grid container className={classes.selectedBlockContainer}>
            <Grid item xs={12}>
            { selectedBlock ?
                (<Typography variant="body1" className={classes.blockHash} >
                    Block Hash: 
                        <span style={{fontWeight: 'bold', marginLeft: 15}} >
                        { selectedBlock && `0...${selectedBlock['hash'].replace(/^0+/,'')}` } 
                        </span>
                </Typography>) : (<Skeleton animation="wave" width='100%' height={40} />)
            }
            </Grid>
			<Grid item xs={12} sm={6} >
                <List>
                    { selectedBlock ? col1.map((key) => (
                        <ListItem key={key}>
                            <ListItemText primary={key} />
                            <ListItemSecondaryAction>
                                { formatValues(key) }
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) :( 
                        <>
                            { skeletonArr.map((key) => (<Skeleton key={key} animation="wave" width='100%' height={24} />)) }
                        </> 
                        )
                    }
                </List>
            </Grid>
            <Grid item xs={12} sm={6} >
                <List>
                    { selectedBlock ? col2.map((key) => (
                        <ListItem key={key}>
                            <ListItemText primary={key} />
                            <ListItemSecondaryAction>
                                { formatValues(key) }
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) : (
                        <>
                            { skeletonArr.map((key) => (<Skeleton key={key} animation="wave" width='100%' height={24} />)) }
                        </>
                        )
                    }
                </List>                
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    selectedBlock: state.selectedBlock
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, null)
)(SelectedBlockDetails);