import React, { Component } from 'react';
import { StyleSheet,TouchableHighlight, Text, View, Navigator } from 'react-native';

import HomeView from './views/HomeView';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';

export default class TutoringApp extends Component {
  render() {
    return (
  		<Navigator
        	initialRoute={{screen: 'HomeView'}}
        	renderScene={(route, nav) => {return this.renderScene(route, nav)}}  />
    );
  }

 renderScene(route,nav) {
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
