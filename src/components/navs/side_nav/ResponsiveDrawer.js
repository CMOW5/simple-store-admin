import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailIcon from '@material-ui/icons/Mail';
import Icon from '@material-ui/core/Icon';
import {withStyles} from '@material-ui/core/styles';

// routes
import {withRouter} from 'react-router-dom';
import RouterHandler from 'router/router-handler';
import BaseRoutes from 'router/routes/base-routes';
import ProductRoutes from 'router/routes/products-routes';
import CategoriesRoutes from 'router/routes/categories-routes';
import SettingsRoutes from 'router/routes/settings-routes';

import sideNavOptions from './sidenav-options';

const drawerWidth = 240;

const styles = (theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
});

/** */
class ResponsiveDrawer extends React.Component {
  /** @param {*} props */
  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      selectedItem: '',
    };

    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.handleDrawerToggleFromParent =
      this.handleDrawerToggleFromParent.bind(this);

    // routes
    this.goToRoute = this.goToRoute.bind(this);
    this.goToDahsBoard = this.goToDahsBoard.bind(this);
    this.goToCategories = this.goToCategories.bind(this);
    this.goToProducts = this.goToProducts.bind(this);
    this.goToSettings = this.goToSettings.bind(this);
  }

  /** */
  handleDrawerToggle() {
    this.setState((state) => ({mobileOpen: !state.mobileOpen}));
  };

  /** */
  handleDrawerToggleFromParent() {
    this.setState((state) => ({mobileOpen: !state.mobileOpen}));
  };

  /** */
  componentDidMount() {
    this.props.onRef(this);
  }

  /** */
  componentWillUnmount() {
    this.props.onRef(undefined);
  }

  /**
   * go to the dashboard page
   */
  goToDahsBoard() {
    this.setState({selectedItem: 'dashboard'});
    const route = BaseRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the products list page
   */
  goToProducts() {
    this.setState({selectedItem: 'products'});
    const route = ProductRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the categories list page
   */
  goToCategories() {
    this.setState({selectedItem: 'categories'});
    const route = CategoriesRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /**
   * go to the settings page
   */
  goToSettings() {
    const route = SettingsRoutes.base();
    RouterHandler.goTo(this.props.history, route);
  }

  /** @param {string} route */
  goToRoute(route) {
    switch (route) {
    case 'dashboard':
      this.goToDahsBoard();
      break;
    case 'products':
      this.goToProducts();
      break;
    case 'categories':
      this.goToCategories();
      break;
    case 'setting':
      // this.goToSettings();
      break;
    default:
    }
  }

  /**
   * @return {ReactNode}
   */
  render() {
    const {classes, theme} = this.props;

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        My Admin
        <Divider />
        <List>
          {sideNavOptions.map((option) => (
            <ListItem
              onClick = {() => this.goToRoute(option.route)}
              button key={option.name}>
              <ListItemIcon>
                <Icon color = {option.color}>
                  {option.icon}
                </Icon>
              </ListItemIcon>
              <ListItemText primary={option.text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['Settings', 'Transactions'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO
            duplication of links. */ }
        <Hidden smUp implementation="css">
          <Drawer
            container={this.props.container}
            variant="temporary"
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
            open={this.state.mobileOpen}
            onClose={this.handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRouter(
  withStyles(styles, {withTheme: true})(ResponsiveDrawer)
);
