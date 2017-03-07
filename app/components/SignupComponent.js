import ProgressBar from 'react-native-progress/Bar';
import React, { Component } from 'react';
import { StyleSheet, Text, Platform, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { DefaultRenderer } from 'react-native-router-flux';

class SignupComponent extends Component {
  render() {
    const children = this.props.navigationState.children;
    const state = children[children.length - 1];
    return (
      <Image source={require('./img/signup_background.png')} style={styles.backgroundImage}>
        <ScrollView>
          <Text style={styles.header}>Sign up for Prospr</Text>
          <ProgressBar progress={this.props.progress_status} width={320} style={styles.progressStyling} color={green} />
          <DefaultRenderer
            navigationState={state}
            key={state.key}
            {...state}
            onNavigate={this.props.onNavigate}
          />
        </ScrollView>
      </Image>
    );
  }
}
/* Define colours */
const green = '#61bd4f';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    fontWeight: 'bold',
    ...Platform.select({
      ios: { fontFamily: 'HelveticaNeue-Thin' },
      android: { fontFamily: 'sans-serif-thin' },
    })
  },
  progressStyling: {
    alignSelf: 'center',
    marginTop: 10
  },
  backgroundImage: {
    flex: 1,
    width: null,
    height: null
  }
});

const mapStateToProps = (state) => {
  return { progress_status: state.signup.progress_status };
};

export default connect(mapStateToProps)(SignupComponent);
