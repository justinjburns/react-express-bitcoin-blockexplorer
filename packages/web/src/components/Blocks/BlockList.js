import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Skeleton from '@material-ui/lab/Skeleton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import CheckCircleRoundedIcon from '@material-ui/icons/CheckCircleRounded';
import ListItemText from '@material-ui/core/ListItemText';
import { actions } from 'shared';
import styles from './styles';

function BlockList({ 
        blockList, 
        selectedBlockHeight, 
        setSelectedBlockHeight,
        getBlockFromSelectedBlockHeight,
        classes, 
        pageSize,
        history,
        match
    }) {

    const handleSelectedBlockHeight = block => e => {
        setSelectedBlockHeight(block);
        getBlockFromSelectedBlockHeight(block);
        // loadBlock(block);
    };

    const loadBlock = block => {
        history.push(`/blocks/${block}`);

    }

    return (
        <div>
            <Typography className={classes.blockListHeading} variant="body1" >
                Block Height
            </Typography>
                <List className={classes.blockListContainer}>
                    { blockList ?
                        blockList.map((block) => (
                            <ListItem 
                                button
                                key={block}
                                className={classes.blockListItem}
                                selected={selectedBlockHeight === block}
                                onClick={handleSelectedBlockHeight(block)}
                            >
                                <ListItemIcon> 
                                    { selectedBlockHeight === block ? 
                                        <CheckCircleRoundedIcon className={classes.selectedIcon} /> : 
                                        <RadioButtonUncheckedRoundedIcon /> 
                                    } 
                                </ListItemIcon>
                                <ListItemText className={classes.blockListItemText}>
                                    <span style={{color: '#aaa', fontSize: '12px', marginRight: 10}}>BLOCK #: </span> { block > 0 ? block : 'loading...' }
                                </ListItemText>
                                <ChevronRightIcon style={{color: '#aaa'}}/>
                            </ListItem>
                        )) :
                        Array.from(Array(pageSize).keys()).map(key => (
                            <ListItem  key={key} style={{padding:0}}>
                                {/* <Skeleton animation="wave" height={50} /> */}
                                <Skeleton animation="wave" width='100%' height={40} />
                            </ListItem>
                        ))
                    }
                </List>
                
        </div>
    );
}

const mapStateToProps = state => ({
    blockList: state.blockList,
    selectedBlockHeight: state.selectedBlockHeight,
    selectedBlock: state.selectedBlock,
    pageSize: state.pageSize
});

const { setSelectedBlockHeight, getBlockFromSelectedBlockHeight } = actions;

const mapDispatchToProps = {
    setSelectedBlockHeight,
    getBlockFromSelectedBlockHeight
};

export default compose(
    withRouter,
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps)
)(BlockList);

