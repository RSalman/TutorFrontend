import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Image, View, StyleSheet, ActivityIndicator, Text, ScrollView } from 'react-native';
import { Button, ButtonGroup, ListItem, List } from 'react-native-elements';
import Modal from 'react-native-modalbox';
import Icon from 'react-native-vector-icons/FontAwesome';
import Collapsible from 'react-native-collapsible';
import Spinner from 'react-native-loading-spinner-overlay';
import { fetchProfile, requestTutor, resetRequestCycle, cancelRequest } from '../actions/profile';
import StyledText from './StyledText';


//TODO(Salman) - Use image URI
var image = require('./img/profile-sample.png');

//TODO(Salman) - store stings in Locale
class TutorProfileComponent extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: 0,
      collapsedBio: false,
      collapsedCourseList: true,
    };
  }

  componentWillMount() {
    this.props.fetchProfile(this.props.id);
  }

  updateIndex(selectedIndex) {
    if (this.state.selectedIndex !== selectedIndex) {
      this.setState({ selectedIndex });
      this.setState({ collapsedBio: !this.state.collapsedBio });
    }
  }

  openRequestModal() {
    if (this.props.requestError)
      this.props.resetRequestCycle();

    this.modal.open();
  }

  renderNoProfileView() {
    if (this.props.isLoading) {
      return (
        <View style={styles.errorContainer}>
          <Spinner visible textContent={'Loading Tutor Profile...'} textStyle={{ color: white }} />
        </View>
      );
    }

    return (
      <View style={styles.errorContainer} >
        <Icon name="exclamation-triangle" size={30} color={errorIconColor} />
        <StyledText style={styles.errorText}>{ this.props.error }</StyledText>
        <View style={styles.refreshView} >
          <Icon name="refresh" size={40} color={errorIconColor} onPress={() => this.props.fetchProfile(this.props.id)} />
          <Text style={styles.errorText} onPress={() => this.props.fetchProfile(this.props.id)}>Refresh</Text>
        </View>
      </View>
    );
  }

  renderRequest() {
    if (this.props.requestSent || this.props.requestError ) {
      const iconName = this.props.requestError ? 'remove' : 'check';
      const iconColor = this.props.requestError ? errorRed : checkMarkColor;

      const modalText = this.props.requestError ? 'Error sending request, please try again' :
            'A request has been sent to ' + this.props.profile.firstname + '!';

      return (
        <View style={styles.modalView}>
          <Icon style={styles.modalCheck} name={iconName} size={45} color={iconColor} />
          <StyledText style={styles.requestSentModalText}>{modalText}</StyledText>
          <Button raised onPress={() => this.modal.close()} style={styles.ModalButton} borderRadius={25} backgroundColor={modalButtonColor} title="Got it!" />
        </View>
      );
    } else if (this.props.requesting) {
      return (
        <View style={styles.modalView}>
          <Text style={styles.modalText}> Please wait while we poke {this.props.profile.firstname}</Text>
          <ActivityIndicator
            animating style={styles.waitCursor} size="large"
          />
        </View>
      );
    }

    return (
      <View style={styles.modalView}>
        <StyledText style={styles.modalText}>A request will be sent to {this.props.profile.firstname}! </StyledText>
        <Button onPress={() => this.props.requestTutor(this.props.id)} style={styles.ModalButton} borderRadius={25} backgroundColor={modalButtonColor} title="Send Request" />
      </View>
    );
  }

//this.props.requestTutor(this.props.id)
  renderRequestStatus() {
    if (this.props.requestSent) {
      return (
        <Button
          small
          title="Request Sent"
          icon={{ name: 'check', size: 20, color: complement }}
          buttonStyle={styles.requestButtonRequested}
          borderRadius={100}
          textStyle={styles.requestButtonTextRequested}
          onPress={() => this.props.cancelRequest(this.props.id, this.props.user_id, 1)}
        />
      );
    } return (
      <Button
        small
        title="Request Tutor"
        buttonStyle={styles.requestButton}
        borderRadius={100}
        textStyle={styles.requestButtonText}
        onPress={() => this.props.requestTutor(this.props.id, this.props.user_id, 1)}
      />
    );
  }

  renderProfileView() {

    const buttons = ['About Me!', 'Courses Teaching!'];
    const { selectedIndex } = this.state;

    return (
      <View style={styles.wrapper}>
        <Image source={require('./img/profileCardBackground.jpg')} style={styles.backgroundImage}>
          <View style={styles.profileCard}>
            <Image source={image} style={styles.photo} />
            <View style={styles.nameView}>
              <StyledText style={styles.name}>{this.props.profile.firstname} {this.props.profile.lastname}</StyledText>
            </View>
            <View >
              <StyledText style={styles.nameCaption}>{this.props.profile.caption}</StyledText>
            </View>
            {this.renderRequestStatus()}
            <View style={styles.statsCard}>
              <View style={styles.stat}>
                <StyledText style={styles.statTop}>{this.props.profile.degree}</StyledText>
                <StyledText style={styles.statBot}>Credentials</StyledText>
              </View>
              <View style={styles.statSeperator} />
              <View style={styles.stat}>
                <StyledText style={styles.statTop}>${this.props.profile.rate}/hr</StyledText>
                <StyledText style={styles.statBot}>Rate</StyledText>
              </View>
              <View style={styles.statSeperator} />
              <View style={styles.stat}>
                <StyledText style={styles.statTop}>{isNaN(this.props.profile.rating) ? "N/A" : this.props.profile.rating + '/5'  }</StyledText>
                <StyledText style={styles.statBot}>Rating</StyledText>
              </View>
            </View>
          </View>
        </Image>
        <View style={{ backgroundColor: offGrey }}>
          <ButtonGroup
            onPress={(selectedIndex) => this.updateIndex(selectedIndex)}
            selectedIndex={selectedIndex}
            buttons={buttons}
            containerStyle={styles.buttonGroup}
            selectedBackgroundColor={complement}
            selectedTextStyle={styles.selectedButtonText}
            textStyle={styles.unselectedButtonText}
          />
          <Collapsible collapsed={this.state.collapsedBio} align="center">
            <List containerStyle={styles.collapsibleList}>
              <ListItem key={0} subtitle={this.props.profile.biography} hideChevron />
            </List>
          </Collapsible>
          <ScrollView>
            <Collapsible collapsed={!this.state.collapsedBio} align="center">
              <List containerStyle={styles.collapsibleList}>
                { this.props.profile.coursesTeaching.map((course, index) => ( <ListItem key={course} title={course} hideChevron />))}
              </List>
            </Collapsible>
          </ScrollView>
        </View>

        <Modal style={styles.modal} position={'center'} ref={(ref) => this.modal = ref} >
          {this.renderRequest()}
        </Modal>
      </View>
    );
  }

  render() {
    if (this.props.profile)
      return this.renderProfileView();
    return this.renderNoProfileView();
  }
}

const complement = '#5ddeb4';
const checkMarkColor = '#3CB371';
const leafGreenGradient = '#45e99e';
const white = '#fff';
const offWhite = '#E0E0E0';
const offGrey = '#FAFAFA';
const grey = '#808080';
const darkBlue = '#3B5998';
const modalButtonColor = '#469fe9';

const black = 'black';
const transparent = 'transparent';
const errorRed = '#ff0000';
const errorIconColor = '#E6E6E6';
const errorTextColor = '#ADADAD';

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: transparent
  },
  profileCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  collapsibleList: { marginTop: 5 },
  refreshView:{
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  buttonGroup:{
    height: 30,
    backgroundColor: white
  },
  statTop:{
    fontWeight:'bold',
    color: white,
    fontSize:16
  },
  nameView:{ marginTop: 5 },
  statBot:{
    color: offWhite,
    fontSize:12
  },
  statsCard: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  stat: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  waitCursor:{
    height: 60,
    transform: [{ scale: 1.5 }]
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  errorText: {
    color: errorTextColor,
    fontSize: 15,
    textAlign: 'center'
  },
  requestButtonText: {
    color: white,
    fontSize: 16
  },
  requestButtonTextRequested: {
    color: complement,
    fontSize: 16
  },
  unselectedButtonText: { color: complement },
  selectedButtonText: { color: white },
  modalView: {
    flexDirection: 'column',
    flex: 1,
  },
  modal: {
    alignItems: 'center',
    padding: 10,
    height: 175,
    width: 300,
    borderRadius: 15,
    backgroundColor: offWhite
  },
  statSeperator: {
    marginLeft: 20,
    marginRight: 20,
    height: 27,
    opacity: 0.8,
    borderWidth: 0.5,
    borderColor: grey
  },
  name:{
    fontWeight:'bold',
    color: white,
    fontSize:18
  },
  nameCaption:{
    color: offGrey,
    fontSize:14
  },

  ModalButton: {
    backgroundColor: darkBlue,
    color: white,
    borderRadius: 25,
    opacity: 50
  },
  modalCheck: { textAlign: 'center' },
  modalText: {
    color: black,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 40,
    textAlign: 'center'
  },
  requestSentModalText: {
    color: black,
    fontSize: 16,
    marginTop: 7,
    marginBottom: 17,
    textAlign: 'center'
  },
  backgroundImage: {
    width: null,
    height: 300
  },

  photo: {
    marginTop: 10,
    height: 105,
    width: 105,
    borderColor: transparent,
    borderWidth: 1,
    borderRadius: 50

  },
  requestButton: {
    backgroundColor: transparent,
    width: 200,
    borderColor: white,
    borderWidth: 2,
    marginTop: 15
  },
  requestButtonRequested: {
    backgroundColor: transparent,
    width: 200,
    borderColor: complement,
    borderWidth: 2,
    marginTop: 15
  }

});

const mapStateToProps = (state) => {
  return {
    user_id: state.profile.current_user.id,
    profile: state.profile.profile,
    isLoading: state.profile.isLoading,
    requestSent: state.profile.requestSent,
    requesting: state.profile.requesting,
    error: state.profile.error,
    requestError: state.profile.requestError
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProfile, requestTutor, resetRequestCycle, cancelRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorProfileComponent);
