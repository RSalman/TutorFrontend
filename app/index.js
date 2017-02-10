import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import HomeScreen from './components/HomeScreen';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import TutorProfileComponent from './components/TutorProfileComponent';
import MuraadFeatureView from './views/MuraadFeatureView';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default class TutoringApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="home" component={HomeScreen} title="HomeScreen" />
            <Scene key="tutors" component={TutorsComponent} title="TutorsComponent" />
            <Scene key="tutorinfo" component={TutorProfileComponent} title="TutorProfileComponent" />
            <Scene key="leila" component={LeilaFeatureView} title="LeilaFeatureView" />
            <Scene key="muraad" component={MuraadFeatureView} title="MuraadFeatureView" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
