import React, { Component } from 'react';
import { StyleSheet,TouchableHighlight, Text, View, Navigator, BackAndroid} from 'react-native';

import HomeView from './views/HomeView';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';

var _navigator; // we fill this up upon first navigation.

export default class TutoringApp extends Component {
  render() {
    return (
  		<Navigator
          style={styles.container}
        	initialRoute={{screen: 'HomeView'}}
        	renderScene={(route, nav) => {return this.renderScene(route, nav)}}  />
    );
  }

 renderScene(route,nav) {
    _navigator = nav;
    switch (route.screen) {
      	case "HomeView":
        	return <HomeView navigator={nav} />
      	case "TutorsComponent":
        	return <TutorsComponent navigator={nav} />
      	case "SalmanFeature":
        	return <SalmanFeatureView navigator={nav} /> 
        case "LeilaFeature":
        	return <LeilaFeatureView navigator={nav} /> 
        case "MuraadFeature":
        	return <MuraadFeatureView navigator={nav} /> 
      }
  }
}

BackAndroid.addEventListener('hardwareBackPress', () => {
  if (_navigator.getCurrentRoutes().length === 1  ) {
     return false;
  }
  _navigator.pop();
  return true;
});

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
  }
});
