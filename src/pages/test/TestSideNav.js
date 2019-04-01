import React, {Component} from 'react';

import './test-side-nav.css';
/**
 *
 */
export default class TestSideNav extends Component {
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
      <div className="container">
        <div className="columns">
          <div className="column is-3">
            <aside className="menu is-hidden-mobile">
              <p className="menu-label">
                General
              </p>
              <ul className="menu-list">
                <li><a className="is-active">Dashboard</a></li>
                <li><a>Customers</a></li>
              </ul>
              <p className="menu-label">
                Administration
              </p>
              <ul className="menu-list">
                <li><a>Team Settings</a></li>
                <li>
                  <a>Manage Your Team</a>
                  <ul>
                    <li><a>Members</a></li>
                    <li><a>Plugins</a></li>
                    <li><a>Add a member</a></li>
                  </ul>
                </li>
                <li><a>Invitations</a></li>
                <li><a>Cloud Storage Environment Settings</a></li>
                <li><a>Authentication</a></li>
              </ul>
              <p className="menu-label">
                Transactions
              </p>
              <ul className="menu-list">
                <li><a>Payments</a></li>
                <li><a>Transfers</a></li>
                <li><a>Balance</a></li>
              </ul>
            </aside>
          </div>
          <div className="column is-9">
            <section>
              right side section
            </section>
          </div>
        </div>
      </div>
    );
  }
}

// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
/* (function() {
  var burger = document.querySelector('.burger');
  var menu = document.querySelector('#'+burger.dataset.target);
  burger.addEventListener('click', function() {
      burger.classList.toggle('is-active');
      menu.classList.toggle('is-active');
  });
})(); */
