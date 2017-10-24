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
      <Image source={require('./img/login1_bg.png')} style={styles.backgroundImage}>
        <ScrollView>
          <StyledText style={styles.header}>Sign up for Prospr</StyledText>
          <ProgressBar progress={this.props.progress_status} width={320} style={styles.progressStyling} color={progressColor} />
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
const progressColor = '#FF3366';
const white = '#FFF';

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    padding: 10,
    fontSize: 30,
    color: white
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
