import React, { Component } from 'react';
import { View, StyleSheet, Alert, ListView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { updatePendingRequests, acceptPendingRequest } from '../actions/profile';
import StyledText from './StyledText';

import TopNavBar from './TopNavBar';

class PendingRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.pendingRequests) };

    setInterval(() => this.props.updatePendingRequests(this.props.user_id), 2000);
  }

  componentDidMount() {
    this.props.updatePendingRequests(this.props.user_id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.pendingRequests) });
  }

  renderRow(u) {
    return (
      <ListItem
        key={u.user_id}
        title={u.first_name + ' ' + u.last_name}
        titleStyle={style.title}
        wrapperStyle={style.listItem}
        hideChevron
        subtitle={u.course_prefix + u.course_code}
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
                name="reply"
                color="#42bcf4"
                size={30}
                containerStyle={style.icon}
                onPress={()=>{
                  Alert.alert(
                      'Pending Request',
                      'Do you want to tutor ' + u.first_name + ' ' + u.last_name + '?',
                    [
                        { text: 'Yes', onPress: () => { this.props.acceptPendingRequest(u.id, u.user_id); } },
                        { text: 'No' }
                    ],
                      { cancelable: false }
                    );
                }}
              />
            }
          </View>
        }
      />
    );
  }

  render() {
    const { pendingRequests, tutorMode } = this.props;
    return (
      <View style={style.container}>
        <TopNavBar toggled={this.props.toggled} tabName={this.props.tabName} />
        { tutorMode && <StyledText style={style.text}>You have {pendingRequests.length} request(s) waiting.</StyledText>}
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row)}
        />
      </View>
    );
  }
}

const white = 'white';
const blue = '#8080ff';
const black = 'black';
const green = 'green';
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  text: {
    textAlign: 'center',
    marginTop:10,
    color: green,
    fontSize: 16
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  title:{ color: black, fontSize: 14 }
});

const mapStateToProps = (state) => {
  return {
    user_id: state.profile.current_user.id,
    pendingRequests: state.profile.pendingRequests,
    tutorMode: state.session.tutorMode,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updatePendingRequests, acceptPendingRequest }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PendingRequests);
