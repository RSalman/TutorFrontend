import ButtonComponent from 'react-native-button-component';
import Modal from 'react-native-modalbox';
import StarRating from 'react-native-star-rating';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Image, View, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { retriveProfile } from '../actions/profile';
import StyledText from './StyledText';


//TODO(Salman) - Use image URI
var image = require('./img/test.png');

class TutorProfileComponent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      animating: true,
      requesting: false,
      requestSent: false,
      messageAcknowledged: false
    };
  }

  componentWillMount() {
    this.props.retriveProfile(this.props.id);
  }


  onClose() {
    if (this.state.requestSent)
      this.setState({ messageAcknowledged: true });
  }

  busySpiner() {
    return (
      <ActivityIndicator
        animating={this.state.animating}
        style={[styles.waitCursorMain, styles.centering]}
        size="large"
      />
    );
  }

  openRequestModal() {
    this.modal.open();
  }

  toggleRequest() {
    this.setState({ requesting: !this.state.requesting });
  }

  mockRequestSent() {
    this.setState({ requestSent: true });
  }

  renderRequest() {
    if (this.state.messageAcknowledged) {
      return (
        <View style={styles.modalView}>
          <StyledText style={styles.modalText}>Ahhh! A request was already sent to {this.props.profile.firstname}!</StyledText>
          <Button onPress={() => this.modal.close()} style={styles.ModalButton} title="Got it!" />
        </View>
      );
    } else if (this.state.requestSent) {
      return (
        <View style={styles.modalView}>
          <StyledText style={styles.modalText}><Icon name="thumbs-up" size={40} color={leafGreenGradient} /> We&apos;ve nudged {this.props.profile.firstname} for you!</StyledText>
          <Button onPress={() => this.modal.close()} style={styles.ModalButton} title="Got it!" />
        </View>
      );
    } else if (this.state.requesting) {
      return (
        <View style={styles.modalView}>
          <StyledText onPress={() => this.mockRequestSent()} style={styles.modalText}> Please wait while we poke {this.props.profile.firstname}</StyledText>
          <ActivityIndicator
            animating={this.state.animating}
            style={[styles.waitCursor, styles.centering]}
            size="large"
          />
        </View>
      );
    }

    return (
      <View style={styles.modalView}>
        <StyledText style={styles.modalText}>A request will be sent to {this.props.profile.firstname}! </StyledText>
        <Button onPress={() => this.toggleRequest()} style={styles.ModalButton} title="Send Request" />
      </View>
    );
  }

  renderRequestStatusBadge() {
    if (this.state.requestSent) {
      return (
        <View style={styles.pendingRequest}>
          <Icon name="check" size={40} color={leafGreenGradient} /><StyledText> Pending Request! </StyledText>
        </View>
      );
    }

    return null;
  }

  //TODO: Smooth rendering / transition
  renderScreenView() {
    if (this.props.isLoading)
      return this.busySpiner();

    //TODO: More than null check required
    else if (this.props.profile)
      return this.renderProfileView();

    //TODO: Error screen
    return null;
  }

  renderProfileView() {
    return (
      <View style={styles.wrapper}>
        <LinearGradient colors={[offWhite, offGrey]}>
          {this.renderRequestStatusBadge()}
          <View style={styles.profileCard}>
            <Image source={image} style={styles.photo} />
            <View >
              <StyledText style={styles.name}>{this.props.profile.firstname} {this.props.profile.lastname}</StyledText>
            </View>
            <View >
              <StarRating
                disabled
                maxStars={5}
                rating={this.props.profile.rating}
                starSize={30}
                selectedStar={function() {}}
                starColor={'gold'}
              />
            </View>
          </View>
          <View style={styles.stripeWrapper}>
            <View style={styles.stripe}>
              <StyledText style={styles.stripeText}>{this.props.profile.tempSample}</StyledText>
            </View>
            <View>
              <LinearGradient colors={[leafGreenGradient, greendFadeGradient, greendFadeGradient]} style={styles.bio}>
                <StyledText style={styles.messageBoxTitleText}>A Little About Me:</StyledText>
                <StyledText style={styles.bioBodyText}>{this.props.profile.bio}</StyledText>
              </LinearGradient>
            </View>
          </View>
          <View>
            <View style={styles.Line} />
            <ButtonComponent style={styles.requestButton} text="Request Tutoring!" onPress={() => this.openRequestModal()} textStyle={styles.requestButtonText} />
            <View style={styles.Line} />
          </View>
        </LinearGradient>
        <Modal style={styles.modal} onClosed={() => this.onClose()} position={'center'} ref={(ref) => this.modal = ref} isDisabled={this.state.isDisabled}>
          {this.renderRequest()}
        </Modal>
      </View>

    );
  }

  render() {
    return this.renderScreenView();
  }
}

const leafGreenGradient = '#3CB371';
const greendFadeGradient = '#4EC8A5';
const stripeRGBBackground = 'rgba(0,0,0,0.65)';
const white = '#fff';
const offWhite = '#E0E0E0';
const offGrey = '#FAFAFA';
const grey = '#808080';
const darkBlue = '#3B5998';
const black = 'black';
const transparent = 'transparent';

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
  stripeWrapper: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bio: {
    width: 325,
    paddingTop:10,
    paddingLeft:20,
    paddingRight:20,
    borderRadius:10,
    paddingBottom:10

  },
  waitCursor:{
    height: 60,
    transform: [{ scale: 1.5 }]
  },

  waitCursorMain:{
    alignItems:'center',
    justifyContent:'center',
    transform: [{ scale: 3 }],
    height: 500
  },
  requestButtonText: {
    color: white,
    fontSize: 20
  },
  pendingRequest: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left:     2,
    top:      4
  },
  modalView: {
    flexDirection: 'column',
    flex: 1,
  },
  stripe: {
    backgroundColor: stripeRGBBackground,
    width: 500,
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 10,
    height: 27,
    justifyContent: 'center',
    alignItems: 'center'
  },
  bioBodyText: {
    color: white,
    fontSize:13
  },
  modal: {
    alignItems: 'center',
    padding: 10,
    height: 175,
    width: 300,
    borderRadius: 15,
    backgroundColor: offWhite
  },
  messageBoxTitleText:{
    fontWeight:'bold',
    color: white,
    textAlign:'left',
    fontSize:16,
    marginBottom:10
  },
  stripeText:{

    color: white,
    textAlign:'center',
    fontSize:15
  },
  Line: {
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
    height: 2,
    backgroundColor: grey
  },
  name:{
    fontWeight:'bold',
    fontSize:18
  },

  ModalButton: {
    backgroundColor: darkBlue,
    color: white,
  },
  modalText: {
    color: black,
    fontSize: 16,
    marginTop: 15,
    marginBottom: 40,
    textAlign: 'center'
  },

  photo: {
    height: 100,
    width: 100,
    borderRadius: 20
  },
  requestButton: { marginTop: 10 }
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile.profile,
    isLoading: state.profile.isLoading
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ retriveProfile }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorProfileComponent);
