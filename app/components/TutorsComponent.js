import React, { Component } from 'react';
import { Platform, View, ListView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { updateTutors } from '../actions/tutors';
import TutorRow from './TutorRow';

class TutorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.allTutors) };
  }

  componentWillMount() {
    this.props.updateTutors();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.allTutors) });
  }

  onSearchBarTextEntered(text) {
    // TODO(sarmad): Connect to actions/reducers
  }

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          round
          lightTheme
          containerStyle={styles.searchBarContainerStyle}
          inputStyle={styles.searchBarText}
          onChangeText={(text) => this.onSearchBarTextEntered(text)}
          placeholder="Enter a course code or subject..."
        />
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(row) => <TutorRow tutor={row} />}
        />
      </View>
    );
  }
}

const searchBarBackgroundColor = 'transparent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({ ios: { marginTop: 20 } })
  },
  searchBarText: { paddingVertical: 0 },
  searchBarContainerStyle: { backgroundColor: searchBarBackgroundColor }
});

const mapStateToProps = (state) => {
  return {
    allTutors: state.tutors.allTutors,
    isLoading: state.tutors.isLoading
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateTutors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorsComponent);
