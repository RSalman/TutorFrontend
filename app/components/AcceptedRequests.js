import React, { Component } from 'react';
import { View, StyleSheet, ListView, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { rate } from '../actions/rating';
import StarRating from 'react-native-star-rating';
import { updateAcceptedRequests } from '../actions/profile';
import TopNavBar from './TopNavBar';
import Modal from 'react-native-modal';
import StyledText from './StyledText';

class AcceptedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = {
      starCount: 0,
      ratingSubmitButtonDiabled: true,
      selectedRow: null,
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.acceptedRequests)
    };
    setInterval(() => this.props.updateAcceptedRequests(this.props.user_id), 2000);
  }

  componentDidMount() {
    this.props.updateAcceptedRequests(this.props.user_id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.acceptedRequests) });
  }

  _resetRating() {
    this.setState({ visibleModal: false, starCount: 0 });
  }

  _rateUser() {
    this.props.rate(this.state.selectedRow.id, this.state.starCount);
    this._resetRating();
  }

  _renderSubmitButton() {
    return (
      <TouchableOpacity onPress={() => this._rateUser()} disabled={this.state.starCount === 0}>
        <View style={style.button}>
          <StyledText>Submit</StyledText>
        </View>
      </TouchableOpacity>
    );
  }

  _renderCancelButton() {
    return (
      <TouchableOpacity onPress={() => this._resetRating()}>
        <View style={style.button}>
          <StyledText>Cancel</StyledText>
        </View>
      </TouchableOpacity>
    );
  }

  _renderModalContent() {
    if (!this.state.selectedRow) return;
    return (
      <View style={style.modalContent}>
        <StyledText style={style.rateText}>Please rate how your session went with {this.state.selectedRow.first_name}:</StyledText>
        <StarRating
          halfStarEnabled={true}
          disabled={false}
          maxStars={5}
          starSize={20}
          starColor={'gold'}
          rating={this.state.starCount}
          selectedStar={(rating) => this.setState({ starCount: rating })}
        />
        <View style={style.modalButtons}>
          {this._renderCancelButton()}
          {this._renderSubmitButton()}
        </View>
      </View>
    );
  }

  renderRow(u) {
    // Request is only ratable if not already rated
    // (i.e: student_rating doesn't exist if tutor, tutor_rating doesn't exist if student)
    const ratable = this.props.tutorMode ? !u.student_rating : !u.tutor_rating;
    return (
      <ListItem
        key={u.user_id}
        title={u.first_name + ' ' + u.last_name}
        titleStyle={style.title}
        wrapperStyle={style.listItem}
        hideChevron
        subtitle={
          <View style={style.subtitleView}>
            <StyledText>{u.course_prefix + u.course_code}</StyledText>
            {
              ratable ? <StyledText style={style.yourRating}>Press to rate your session!</StyledText> :
              (
                <View style={style.yourRatingView}>
                  <StyledText style={style.yourRatingText}>Your Rating:</StyledText>
                  <StarRating
                    maxStars={5}
                    rating={this.props.tutorMode ? u.student_rating : u.tutor_rating}
                    starSize={10}
                    starColor={'gold'}
                    selectedStar={function() {}}
                    disabled
                  />
                </View>
              )
            }
          </View>
        }
        onPress={() => !this.props.currentlyRating && ratable && this.setState({ visibleModal: true, selectedRow: u }) }
        label={
          <View>
            <StarRating
              maxStars={5}
              rating={this.props.tutorMode ? (u.agg_user_rating / u.num_user_rating) : (u.agg_tutor_rating / u.num_tutor_rating)}
              starSize={10}
              starColor={'gold'}
              selectedStar={function() {}}
              disabled
            />
            {
              // Only show button when user is in tutor mode
              this.props.tutorMode &&
                <Icon
                  name="textsms"
                  color="#29ce6b"
                  size={30}
                  containerStyle={style.icon}
                  onPress={()=> Communications.text(u.phone_number, 'Hey ' + u.first_name + '!')}
                />
            }
          </View>
        }
      />
    );
  }

  render() {
    return (
      <View style={style.container}>
        <TopNavBar toggled={this.props.toggled} tabName={this.props.tabName} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row)}
        />
        <Modal isVisible={this.state.visibleModal} style={style.bottomModal}>
          {this._renderModalContent()}
        </Modal>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  icon: { width: 50 },
  rateText: { fontSize: 14, },
  yourRatingView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitleView: {
    flexDirection: 'column',
    paddingLeft: 10,
    paddingTop: 5
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  modalButtons: { flexDirection: 'row', },
  button: {
    backgroundColor: 'lightblue',
    padding: 8,
    margin: 10,
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
});

const mapStateToProps = (state) => {
  return {
    user_id: state.profile.current_user.id,
    acceptedRequests: state.profile.acceptedRequests,
    tutorMode: state.profile.tutorMode,
    currentlyRating: state.rating.currentlyRating,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateAcceptedRequests, rate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedRequests);
