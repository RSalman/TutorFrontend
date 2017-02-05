import React, { Component } from 'react';
import { ListView, StyleSheet, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateTutors } from '../actions/tutors';
import TutorRow from './TutorRow';

class TutorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }) };
  }

  componentWillMount() {
    this.props.updateTutors();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      dataSource: this.state.dataSource.cloneWithRows(nextProps.allTutors)
    });
  }

  render() {
    return (
      <ListView
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(row) => <TutorRow {...row} />}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

var separatorColor = '#8E8E8E';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: separatorColor,
  }
});

const mapStateToProps = (state) => {
  return {
    allTutors: state.tutors.allTutors,
    isLoading: state.isLoading
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  updateTutors
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorsComponent);
