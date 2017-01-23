import React, { Component } from 'react';
import { Navigator, StyleSheet } from 'react-native';

import HomeView from './views/HomeView';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';

export default class TutoringApp extends Component {
 renderScene(route, nav) {
    switch (route.screen) {
    case 'HomeView':
      return <HomeView navigator={nav} />;
    case 'TutorsComponent':
      return <TutorsComponent navigator={nav} />;
    case 'SalmanFeature':
      return <SalmanFeatureView navigator={nav} />;
    case 'LeilaFeature':
      return <LeilaFeatureView navigator={nav} />;
    case 'MuraadFeature':
      return <MuraadFeatureView navigator={nav} />;
    }
  }

  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{ screen: 'HomeView' }}
        renderScene={(route, nav) => this.renderScene(route, nav)}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  },
});
