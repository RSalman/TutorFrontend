import React, { Component } from 'react';
import { StyleSheet,TouchableHighlight, Text, View, Navigator, BackAndroid} from 'react-native';

import HomeView from './views/HomeView';
import TutorsComponent from './components/TutorsComponent';
import LeilaFeatureView from './views/LeilaFeatureView';
import SalmanFeatureView from './views/SalmanFeatureView';
import MuraadFeatureView from './views/MuraadFeatureView';

export default class TutoringApp extends Component {
  constructor (props){
    super(props);
    this.navigation_stack= {}; 
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.navigation_stack.getCurrentRoutes().length === 1)
         return false;
      this.navigation_stack.pop();
      return true;
    });
  }

  render () {
    return (
  		<Navigator
          style={styles.container}
        	initialRoute={{screen: 'HomeView'}}
        	renderScene={(route, nav) => {return this.renderScene(route, nav)}}  />
    );
  }

 renderScene (route,nav) {
    this.navigation_stack = nav;
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
    marginTop: 20,
    flex: 1,
  }
});
