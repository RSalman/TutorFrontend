import React, { Component } from 'react';
import { Platform, View, ListView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { updateTutors } from '../actions/tutors';
import TutorRow from './TutorRow';
import ErrorView from './ErrorView';

class TutorsComponent extends Component {
  constructor(props) {
    super(props);
    this.state = { dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }).cloneWithRows(this.props.allTutors) };
  }

  componentDidMount() {
    this.props.updateTutors();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows(nextProps.allTutors) });
  }

  onSearchBarTextEntered(text) {
    this.props.updateTutors(text);
  }

  renderErrorView() {
    return (
      <ErrorView error={this.props.error} />
    );
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(row) => <TutorRow tutor={row} />}
      />
    );
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
          placeholder={I18n.t('tutors.searchPlaceholder')}
        />
        { this.props.error ? this.renderErrorView() : this.renderListView() }
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
    isLoading: state.tutors.isLoading,
    error: state.tutors.error
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({ updateTutors }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(TutorsComponent);
