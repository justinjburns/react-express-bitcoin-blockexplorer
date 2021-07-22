import React from 'react';
import * as R from 'ramda';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Chip from '@material-ui/core/Chip';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';


const BlockchainInfo = (props) => {
    
    const remove = ['softforks', 'warnings', 'pruned', 'initialblockdownload', 'bestblockhash'];
    const keys = R.without(remove, R.keys(props.blockchaininfo));

    const formatValues = (key) => {
        switch(key) {
            case 'chainwork':
                return props.blockchaininfo[key].replace(/^0+/,'');
            default: 
                return props.blockchaininfo[key];
        }
    }

    return (
        <List dense={true}>
            { keys.map((key) => (
                <ListItem key={key}>
                    <ListItemText primary={key} />
                    <ListItemSecondaryAction>
                        <Chip label={formatValues(key)} />
                    </ListItemSecondaryAction>
                </ListItem>
            )) }
        </List>
    );
}

export default BlockchainInfo;