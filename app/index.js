import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import HomeScreen from './components/HomeScreen';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';
import PhoneVerificationInput from './components/PhoneVerificationInput';

const store = createStore(rootReducer, applyMiddleware(thunk));
export default class TutoringApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="home" component={HomeScreen} title="HomeScreen" />
            <Scene key="tutors" component={TutorsComponent} title="TutorsComponent" />
            <Scene key="tutorinfo" component={SalmanFeatureView} title="SalmanFeatureView" />
            <Scene key="leila" component={LeilaFeatureView} title="LeilaFeatureView" />
            <Scene key="muraad" component={MuraadFeatureView} title="MuraadFeatureView" />
            <Scene key="phoneVerification" component={PhoneVerificationInput} title="PhoneVerificationInput" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
