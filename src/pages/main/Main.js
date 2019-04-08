import React from 'react';
import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainToolBar from 'components/navs/main_nav/MainToolBar';
import ResponsiveDrawer from 'components/navs/side_nav/ResponsiveDrawer';
import ContentMain from './ContentMain';

// styles
import {withStyles} from '@material-ui/core/styles';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

/** */
class Main extends React.Component {
  /** @param {object} props */
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
    };

    this.toggleNavigationDrawer = this.toggleNavigationDrawer.bind(this);
  }

  /** */
  toggleNavigationDrawer() {
    this.drawerRef.handleDrawerToggleFromParent();
  };

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <MainToolBar handleDrawerToggle = {this.toggleNavigationDrawer} />
        <ResponsiveDrawer onRef={(ref) => (this.drawerRef = ref)} />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <ContentMain />
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Main);
