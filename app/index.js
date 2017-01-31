import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';

import HomeView from './views/HomeView';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';

export default class TutoringApp extends Component {
  render() {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="home" component={HomeView} title="HomeView" />
          <Scene key="tutors" component={TutorsComponent} title="TutorsComponent" />
          <Scene key="tutorinfo" component={SalmanFeatureView} title="SalmanFeatureView" />
          <Scene key="leila" component={LeilaFeatureView} title="LeilaFeatureView" />
          <Scene key="muraad" component={MuraadFeatureView} title="MuraadFeatureView" />
        </Scene>
      </Router>
    );
  }
}
