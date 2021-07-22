import React from 'react';
import { slice } from 'ramda';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import MaterialTable from "material-table";
import Skeleton from '@material-ui/lab/Skeleton';
import icons from '../Table/icons';
import Grid from '@material-ui/core/Grid';
import SelectedTransactionDetails from './SelectedTransactionDetails';
// import { getTransaction } from '../../store/actions';
import { actions } from 'shared';
import styles from './styles';


function SelectedBlockTransactions({ selectedBlock, classes, getTransaction }) {

    const tableColumns = [{title: "Transaction ID", field: "txid" }];

    const data = () => selectedBlock['tx'].map( txid => ({ txid: txid }) );

    const handleSelectedTransaction = (e, tx, togglePanel) => {
        // getTransaction(tx.txid);
        togglePanel();
    }

    const transactionDetailsPanel = (tx) => {
        return (<SelectedTransactionDetails selectedTxId={tx.txid} />);
    };

    return (
        <Grid container className={classes.selectedBlockTransactionsContainer}>
            <Grid item xs={12}>
                { selectedBlock ? 
                    <MaterialTable
                        icons={icons}
                        columns={tableColumns}
                        data={data()}
                        title={`Transactions (${selectedBlock.nTx})`}
                        options={{
                            pageSize: 10,
                            pageSizeOptions: [10, 25, 50]
                        }}
                        isFreeAction={true}
                        onRowClick={ handleSelectedTransaction }
                        detailPanel={ transactionDetailsPanel }
                    /> : 
                    <Skeleton animation="wave" width='100%' height={450} style={{transform: 'none'}} />
                }
            </Grid>
        </Grid>
    );
}

const mapStateToProps = (state) => ({
    selectedBlock: state.selectedBlock
});

const {getTransaction } = actions;

const mapStateToDispatch = {
    getTransaction
};

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapStateToDispatch)
)(SelectedBlockTransactions);