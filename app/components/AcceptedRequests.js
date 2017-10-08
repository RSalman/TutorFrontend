import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import StarRating from 'react-native-star-rating';
import { updateAcceptedRequests } from '../actions/profile';
import TopNavBar from './TopNavBar';

class AcceptedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.acceptedRequests) };
    setInterval(() => this.props.updateAcceptedRequests(this.props.user_id), 2000);
  }

  componentDidMount() {
    this.props.updateAcceptedRequests(this.props.user_id);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.acceptedRequests) });
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
    const { approvedRequests } = this.props;
    return (
      <View style={style.container}>
        <TopNavBar toggled={this.props.toggled} tabName={this.props.tabName} />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => this.renderRow(row)}
        />
      </View>
    );
  }
}
const emailIconColor = '#00aced';
const textIconColor = '#517fa4';
const white = 'white';
const blue = '#8080ff';
const style = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  icon: { width: 50 },
});

const mapStateToProps = (state) => {
  return {
    user_id: state.profile.current_user.id,
    acceptedRequests: state.profile.acceptedRequests,
    tutorMode: state.profile.tutorMode,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateAcceptedRequests }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedRequests);
