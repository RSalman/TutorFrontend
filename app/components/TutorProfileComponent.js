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
import { Actions } from 'react-native-router-flux';
import StyledText from './StyledText';

//TODO(Salman) - store stings in Locale
class TutorProfileComponent extends Component {

  constructor(props) {
    super(props);
    
    if(this.props.id == this.props.user_id) //Extra check in case demoProfile is not passed
      this.props.demoProfile = true;

    this.state = {
      selectedIndex: 0,
      collapsedBio: false,
      collapsedCourseList: true,
    };
  }

  componentWillMount() {
    this.props.fetchProfile(this.props.id, this.props.user_id, this.props.demoProfile);
  }

  updateIndex(selectedIndex) {
      this.setState({ selectedIndex });
      this.setState({ collapsedBio: selectedIndex == 0 ? false : true });
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
          <Icon name="refresh" size={40} color={errorIconColor} onPress={() => this.props.fetchProfile(this.props.id, this.props.demoProfile)} />
          <Text style={styles.errorText} onPress={() => this.props.fetchProfile(this.props.id, this.props.demoProfile)}>Refresh</Text>
        </View>
      </View>
    );
  }

  renderRequestButtons(courseInfo) {
    if(this.props.demoProfile)
      return(<View/>);
    
    return (
      <Button
        small
        title={courseInfo.isRequested ? "Cancel" : "Request"}
        buttonStyle={courseInfo.isRequested ? styles.requestCourseButtonRequested : styles.requestCourseButton }
        borderRadius={50}
        textStyle={courseInfo.isRequested ? styles.requestCourseButtonTextRequested : styles.requestCourseButtonText}
        onPress={() => courseInfo.isRequested ?  this.props.cancelRequest(this.props.id, this.props.user_id, courseInfo.subjectID) : this.props.requestTutor(this.props.id, this.props.user_id, courseInfo.subjectID)}
      />  
    );
  }

  renderRequestStatus() {
    if(this.props.demoProfile){
      return (
        <Button
          small
          title="Edit Profile"
          buttonStyle={styles.requestButton}
          borderRadius={100}
          textStyle={styles.requestButtonText}
          onPress={() => Actions.profileupdate({id: this.props.id})}
        />
      );   
    }            
    if(this.props.requesting){
      return (
        <ActivityIndicator
          animating          
          size="large"
          color={leafGreenGradient}
        />
      );
    }            
    if (this.props.requestSent) {
      return (
        <Button
          small
          title="Request Sent"
          icon={{ name: 'check', size: 20, color: complement }}
          buttonStyle={styles.requestButtonRequested}
          borderRadius={100}
          textStyle={styles.requestButtonTextRequested}
          onPress={() => this.updateIndex(1)}
        />
      );
    } 
    return (
      <Button
        small
        title="Request Tutor"
        buttonStyle={styles.requestButton}
        borderRadius={100}
        textStyle={styles.requestButtonText}
        onPress={() => this.updateIndex(1)}
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
            <Image source={ this.props.profile.image ? {uri: this.props.profile.image} :  require('./img/profile-sample.png')} style={styles.photo} />
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
              <ListItem key="bio" subtitle={this.props.profile.biography} hideChevron />
            </List>
          </Collapsible>
          <ScrollView>
            <Collapsible collapsed={!this.state.collapsedBio} align="center">
              <List containerStyle={styles.collapsibleList}>
                { this.props.courses_request_status.map((courseInfo, index) => ( <ListItem key={courseInfo.course} title={courseInfo.course} badge={{element: this.renderRequestButtons(courseInfo)}} hideChevron/>))}
              </List>
            </Collapsible>
          </ScrollView>
        </View>
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
  },
  requestCourseButton: {
    backgroundColor: transparent,
    width: 100,
    height: 35,
    borderColor: complement,
    borderWidth: 2
  },
  requestCourseButtonText: {
    color: complement,
    fontSize: 12
  },
  requestCourseButtonRequested: {
    backgroundColor: complement,
    width: 100,
    height: 35,
    borderColor: white,
    borderWidth: 2
  },
  requestCourseButtonTextRequested: {
    color: white,
    fontSize: 12
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
    requestError: state.profile.requestError,
    courses_request_status: state.profile.courses_request_status
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ fetchProfile, requestTutor, resetRequestCycle, cancelRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorProfileComponent);
