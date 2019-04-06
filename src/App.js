import React, {Component} from 'react';

/* router */
import {Switch, Route} from 'react-router-dom';

/* utils */
import Logger from 'utils/logger/logger';

/* styles */
import './App.css';

/* components */
import LoginPage from 'pages/login/LoginPage';
import Main from 'pages/main/Main';

/**
 * the root app component
 */
class App extends Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    this.componentName = 'App ';
    Logger.log(this.componentName + ' contructor');
    this.state = {};
  }

  /**
   * update caused by a history change
   * @param {*} props
   * @param {*} state
   * @return {*}
   */
  static getDerivedStateFromProps(props, state) {
    Logger.log('App getderivedtstate = state, props', state);
    Logger.log('props =', props);
    return state;
  }

  /**
   * @return {ReactNode}
   */
  render() {
    Logger.log(this.componentName + 'render method called');
    return (
      <div className="App">
        <Switch>
          <Route exact path='/login' component={LoginPage}/>
          {/* <Route path='/' component={requireAuth(Main)}/> */}
          <Route path='/' component={(Main)}/>
        </Switch>
      </div>
    );
  }
}

export default App;


// export default App;
