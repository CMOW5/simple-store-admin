import React from 'react';
import PropTypes from 'prop-types';
import MainToolBar from 'components/navs/main_nav/MainToolBar';
import SideNav from 'components/navs/side_nav/ResponsiveDrawer';
import ContentMain from './ContentMain';

// styles
import {withStyles} from '@material-ui/core/styles';
import styles from './main-styles';

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
        <MainToolBar handleDrawerToggle = {this.toggleNavigationDrawer} />
        <SideNav onRef={(ref) => (this.drawerRef = ref)} />
        <ContentMain {...this.props} />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Main);
