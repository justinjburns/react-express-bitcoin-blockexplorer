import React, { useEffect } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import WifiIcon from '@material-ui/icons/Wifi';
import DynamicFeedIcon from '@material-ui/icons/DynamicFeed';
import SyncAltIcon from '@material-ui/icons/SyncAlt';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PeopleAltIcon from '@material-ui/icons/PeopleAlt';

import MoreIcon from '@material-ui/icons/MoreVert';
import styles from './styles';
// import { getconnectioncount } from '../../store/actions';
import { actions } from 'shared';
import { Tooltip } from '@material-ui/core';

function Nav ({ classes, connectioncount, getconnectioncount }) {

	const [anchorEl, setAnchorEl] = React.useState(null);
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};

	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	useEffect(() => {
		getconnectioncount();
	}, []);

	const menuId = 'primary-search-account-menu';

	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton aria-label="Blocks">
					<DynamicFeedIcon />						
				</IconButton>
				<p>Blocks</p>
			</MenuItem>
			<MenuItem>
				<IconButton aria-label="Peer Connection count" color="inherit">
					<Badge badgeContent={connectioncount ? connectioncount : '?'} color="secondary">
						<WifiIcon />
					</Badge>
				</IconButton>
			</MenuItem>
		</Menu>
	);

	return (
		<div className={classes.grow}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						edge="start"
						className={classes.menuButton}
						color="inherit"
						aria-label="open drawer"
					>
						<MenuIcon />
					</IconButton>
					<Typography className={classes.title} variant="body1" noWrap>Blockchain Explorer</Typography>
					<div className={classes.search}>
						<div className={classes.searchIcon}>
							<SearchIcon />
						</div>
						<InputBase
							placeholder="Search…"
							classes={{
							root: classes.inputRoot,
							input: classes.inputInput,
							}}
							inputProps={{ 'aria-label': 'search' }}
						/>
					</div>
					<div className={classes.grow} />
					<div className={classes.sectionDesktop}>
						<IconButton aria-label="Blocks" color="inherit">
							<DynamicFeedIcon />						
						</IconButton>
						<Tooltip title="Peer Connection count">
							<IconButton aria-label="Peer Connection count" color="inherit">
								<Badge badgeContent={connectioncount ? connectioncount : '?'} color="secondary">
									<WifiIcon />
								</Badge>
							</IconButton>
						</Tooltip>		
					</div>
					<div className={classes.sectionMobile}>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
						>
							<MoreIcon />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
		</div>
	);
}

const mapStateToProps = state => ({
    connectioncount: state.connectioncount
});

const { getconnectioncount } = actions;

const mapDispatchToProps = {
    getconnectioncount
};

export default compose(
	withStyles(styles),
	connect(mapStateToProps, mapDispatchToProps)
)(Nav);