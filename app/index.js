import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import _ from 'underscore';

import './util/globalAxios';
import './util/I18n';
import rootReducer from './reducers';
import HomeScreen from './components/HomeScreen';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './components/LeilaFeatureView';
import TutorProfileComponent from './components/TutorProfileComponent';
import SignupComponent from './components/SignupComponent';
import PhoneVerificationInput from './components/PhoneVerificationInput';
import UserSignupFormComponent from './components/UserSignupFormComponent';
import BecomeATutorComponent from './components/BecomeATutorComponent';
import LoginComponent from './components/LoginComponent';
import TempPushNotification from './components/TempPushNotification';
import TutorFormComponent from './components/TutorFormComponent';

global._ = _;
const store = createStore(rootReducer, applyMiddleware(thunk));
export default class TutoringApp extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene key="root" hideNavBar>
            <Scene key="login" component={LoginComponent} title="LoginComponent" />
            <Scene key="signup" component={SignupComponent} title="SignupComponent">
                <Scene key="userForm" component={UserSignupFormComponent} title="UserForm" />
                <Scene key="phoneVerification" component={PhoneVerificationInput} title="PhoneVerificationInput" />
                <Scene key="becomeATutor" component={BecomeATutorComponent} title="BecomeATutor" />
                <Scene key="tutorForm" component={TutorFormComponent} title="TutorForm" />
              </Scene>
              <Scene key="tutors" component={TutorsComponent} title="TutorsComponent" />
              <Scene key="tempPushNotification" component={TempPushNotification} title="TempPushNotification" />
              <Scene key="tutorinfo" component={TutorProfileComponent} title="TutorProfileComponent" />
              <Scene key="leila" component={LeilaFeatureView} title="LeilaFeatureView" />
              <Scene key="home" component={HomeScreen} title="HomeScreen" />
          </Scene>
        </Router>
      </Provider>
    );
  }
}
