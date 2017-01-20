import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import TutorsComponent from './components/TutorsComponent';

export default class TutoringApp extends Component {
  render() {
    return (
      <TutorsComponent styles={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
