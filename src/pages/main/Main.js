import React, {Component} from 'react';

/* styles */
import './main.css';

/* components */
import MainNavBar from 'components/navs/main_nav/MainNavBar';
import SideNav from 'components/navs/side_nav/SideNav';
import ContentMain from './ContentMain';

// import Footer from 'components/footer/Footer';

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
    this.state = {};
  }

  /**
   * @return {ReactNode}
   */
  render() {
    return (
      <React.Fragment>

        <MainNavBar history={this.props.history} />

        <div className = "container">
          <div className="columns">

            <div className="column is-3">
              <SideNav />
            </div>

            <div className="column">
              <ContentMain />
              {/* <Footer /> */}
            </div>

          </div>
        </div>


      </React.Fragment>
    );
  }
}
