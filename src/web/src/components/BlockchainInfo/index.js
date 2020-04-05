import React from 'react';
import * as R from 'ramda';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FolderIcon from '@material-ui/icons/Folder';


const BlockchainInfo = (props) => {
    
    const keys = R.without(['softforks', 'warning'], R.keys(props.blockchaininfo));

    // const itemComp = (key) => {
    //     return (
    //         <ListItem>
    //             <ListItemText 
    //                 primary={`${key}:  ${props.blockchaininfo[key]}`}
    //             />
    //         </ListItem>
    //     );
    // }

    const formatValues = (key) => {
        switch(key) {
            case 'bestblockhash':
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
                    <ListItemText 
                        primary={key}
                        secondary={formatValues(key)}
                    />
                </ListItem>
            )) }
        </List>
    );
}

export default BlockchainInfo;