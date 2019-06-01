import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// router
import {withRouter} from 'react-router-dom';

// redux
import {connect} from 'react-redux';
import {logoutAction} from 'store/actions/user-actions';

const drawerWidth = 240;

const styles = (theme) => ({
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
});

/** */
class MainToolBar extends React.Component {
  /** @param {*} props */
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.onLogoutButtonClicked = this.onLogoutButtonClicked.bind(this);
  }

  /** */
  handleDrawerToggle() {
    this.props.handleDrawerToggle();
  };

  /** */
  onLogoutButtonClicked() {
    this.props.logoutAction();
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    return (
      <React.Fragment >
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              className={classes.menuButton} color="inherit" aria-label="Menu"
              onClick={this.handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
            </Typography>
            <Button
              onClick = {this.onLogoutButtonClicked}
              color="inherit">
            Logout
            </Button>
          </Toolbar>
        </AppBar>
      </React.Fragment>
    );
  }
}

MainToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

// which properties of the global store do i wanna use in this component
const mapStateToProps = (state) => {
  return {
    user: state.userReducer,
    /* router: state.routerReducer, */
  };
};

// map the actions i can execute (send) to the reducers
const mapDispatchToProps = (dispatch) => {
  return {
    logoutAction: () => {
      return dispatch(logoutAction());
    },
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(
    withStyles(styles, {withTheme: true})(MainToolBar))
);
