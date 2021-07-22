import React, { useState, useEffect } from 'react';
import * as R from 'ramda';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Grid from '@material-ui/core/Grid';
import Skeleton from '@material-ui/lab/Skeleton';
import moment from 'moment';
// import { getTransaction } from '../../store/actions';
import { actions } from 'shared';
import styles from './styles';


function SelectedTransactionDetails({ selectedTxId, getTransaction, classes }) {

    const [transactionDetails, setTransactionDetails] = useState();

    const fields1 = ['hash', 'confirmations', 'time', 'size', 'version', 'weight'];
    const fields2 = ['vin', 'vout'];
    const skeletonArr = Array.from(Array(6).keys());

    const formatValues = (tx, key) => {
        switch(key) {
            case 'hash':
            case 'blockhash':
                // return `0...${tx[key].replace(/^0+/,'')}`;
                return tx[key];
            case 'time':
            case 'blocktime':
                return moment.unix(tx[key]).format('MM/DD/YY HH:mm');
            case 'size':
            case 'vsize':
                return ` ${tx[key]} B `;
            default: 
                return tx[key];
        }
    };

    useEffect(() => {
        getTransaction(selectedTxId).then((tx) => {
            setTransactionDetails(tx);
        });
    }, []);


    const vincol =[ 'txid', 'coinbase', 'vout',  'sequence' ]; //'scriptSig', 'txwitness',
    const voutcol = ['value', 'n', 'type']; //, 'addresses'
    
    // txid: "e44d65619d450e37a1e592439c278c70ba92512e61855ad07c3530d77ed38c3c"
    // vout: 0
    // scriptSig: {asm: "002032ea8ab742434bd1f5f3b05b4f73f7dbb8ac849c0aecb6c0c907b1cf8c74b5ed",…}
    // asm: "002032ea8ab742434bd1f5f3b05b4f73f7dbb8ac849c0aecb6c0c907b1cf8c74b5ed"
    // hex: "22002032ea8ab742434bd1f5f3b05b4f73f7dbb8ac849c0aecb6c0c907b1cf8c74b5ed"
    // txinwitness: ["",…]
    // 0: ""
    // 1: "304502210099137ee6f7f2f77a1a6fc90190b5d66258c6613ffb0ea4cbc0da4ef4e254760a0220378dd0deafbabb856394dad20a4de677a4ef92115d6b2996a225bc2c1268b48a01"
    // 2: "304402202d2ad8839ff69cf8bbb6c05cf983f6e6866b10aa704ae9cb5278a50a1a643ea902207d771cf9d519ba77f9d91f257ea3933390e03320aa2bacdd7eefcde26765a9f701"
    // 3: "522102423800e59430af36ad1a1cc43ae43c69300550d9f3ce4c68e598d8836d5e9f1a210209e8202f3b6e8bdb8e51f1014c9565d9185555016748168e080df82572d9dde1210339b4b9a3b598c6a3238ee391b3ed175e8ea3127897063cbae93ffb7b1aef802153ae"
    // sequence: 4294967295

    // value: 12.66054222
    // n: 0
    // scriptPubKey: {asm: "OP_HASH160 6e8ea702743a672edf2ee1d0c21737faf2b2aa84 OP_EQUAL",…}
    // asm: "OP_HASH160 6e8ea702743a672edf2ee1d0c21737faf2b2aa84 OP_EQUAL"
    // hex: "a9146e8ea702743a672edf2ee1d0c21737faf2b2aa8487"
    // reqSigs: 1
    // type: "scripthash"
    // addresses: ["3Bmb9Jig8A5kHdDSxvDZ6eryj3AXd3swuJ"]
    // 0: "3Bmb9Jig8A5kHdDSxvDZ6eryj3AXd3swuJ"



    return (
        <Grid container className={classes.selectedTransactionContainer} spacing={2}>
			<Grid item xs={12}>
                <List>
                    { transactionDetails ? fields1.map((key) => (
                        <ListItem key={key}>
                            <ListItemText primary={key} />
                            <ListItemSecondaryAction>
                                { formatValues(transactionDetails, key) }
                            </ListItemSecondaryAction>
                        </ListItem>
                    )) :( 
                        <>
                            { skeletonArr.map((key) => (
                                <Skeleton 
                                    key={key}
                                    animation="wave"
                                    width='100%'
                                    height={24} 
                                />)) 
                            }
                        </> 
                        )
                    }
                </List>
            </Grid>
            <Grid item xs={6} >
                vin
                { transactionDetails ? transactionDetails.vin.map((vinObj) => {
                    console.log('vinObj==' + JSON.stringify(vinObj));
                    window.vinObj = vinObj;
                    vincol.map((key) => (
                        (vinObj[key] !== undefined) && <ListItem key={key}>
                            <ListItemText primary={key} />
                            <ListItemSecondaryAction>
                                { formatValues(vinObj, key) }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }): (
                        <>
                            { skeletonArr.map((key) => (
                                <Skeleton 
                                    key={key}
                                    animation="wave"
                                    width='100%'
                                    height={24} 
                                />)) 
                            }
                        </> 
                        )
                }
            </Grid>
            <Grid item xs={6} >
                vout
                    { transactionDetails ? transactionDetails.vout.map((voutObj) => {
                        console.log('voutObj==' + JSON.stringify(voutObj));
                        voutcol.map((key) => (
                            (voutObj[key] !== undefined) && <ListItem key={key}>
                                <ListItemText primary={key} />
                                <ListItemSecondaryAction>
                                    { formatValues(voutObj, key) }
                                </ListItemSecondaryAction>
                            </ListItem>
                        ))
                    }): (
                        <>
                            { skeletonArr.map((key) => (
                                <Skeleton 
                                    key={key}
                                    animation="wave"
                                    width='100%'
                                    height={24} 
                                />)) 
                            }
                        </> 
                        )
                }
            </Grid>
        </Grid>
    );
}

const { getTransaction } = actions;

const mapDispatchToProps = {
    getTransaction
};

export default compose(
    withStyles(styles),
    connect(null, mapDispatchToProps)
)(SelectedTransactionDetails);