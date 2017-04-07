import React, { Component } from 'react';
import { View, StyleSheet, ListView } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import Communications from 'react-native-communications';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateAcceptedRequests } from '../actions/profile';
import StarRating from 'react-native-star-rating';
import TopNavBar from './TopNavBar';

class AcceptedRequests extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.acceptedRequests) };
  }

  componentDidMount() {
    this.props.updateAcceptedRequests(1);
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
              rating={u.agg_tutor_rating / u.num_tutor_rating}
              starSize={10}
              starColor={'gold'}
              selectedStar={function() {}}
              disabled
            />
            <Icon
              name="textsms"
              color="#29ce6b"
              size={30}
              containerStyle={style.icon}
              onPress={()=> Communications.text(u.phone_number, 'Hey ' + u.first_name + '!')}
            />
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
  list: {
    marginTop: 0,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderBottomColor: white,
  },
  listItem: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom:0
  },
  icon: { width: 50 },
  iconsView: { flexDirection: 'row' },
  text: {
    marginTop:10,
    marginLeft: 25,
    color: blue,
    fontSize: 16
  }
});

const mapStateToProps = (state) => {
  return { acceptedRequests: state.profile.acceptedRequests };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateAcceptedRequests }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AcceptedRequests);