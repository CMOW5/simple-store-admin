import React, {Component} from 'react';

/* styles */
import './main.css';

/* components */
import MainNavBar from 'components/navs/main_nav/MainNavBar';
import SideNav from 'components/navs/side_nav/SideNav';
import ContentMain from './ContentMain';
import Footer from 'components/footer/Footer';

/**
 * main page
 */
export default class Main extends Component {
  /**
   *
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.state = {
      showSideNav: false,
    };
  }

  toggleSideNav = () => {
    this.child.toggleDrawerFromParent(true);
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <React.Fragment>
        <MainNavBar toggleSideNav = {this.toggleSideNav} />
        <div className = "container">
          <div className="columns">

            <aside className="column is-3">
              <SideNav
                onRef={(ref) => (this.child = ref)}
              />
            </aside>

            <section className="column">
              <ContentMain />
              <Footer />
            </section>

          </div>
        </div>
      </React.Fragment>
    );
  }
}
