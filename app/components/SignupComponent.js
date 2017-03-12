import ProgressBar from 'react-native-progress/Bar';
import React, { Component } from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { connect } from 'react-redux';
import { DefaultRenderer } from 'react-native-router-flux';
import StyledText from './StyledText';

class SignupComponent extends Component {
  render() {
    const children = this.props.navigationState.children;
    const state = children[children.length - 1];
    return (
      <Image source={require('./img/signup_background.png')} style={styles.backgroundImage}>
        <ScrollView>
          <StyledText style={styles.header}>Sign up for Prospr</StyledText>
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
    fontSize: 30
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
  return { progress_status: state.signup.progressStatus };
};

export default connect(mapStateToProps)(SignupComponent);
