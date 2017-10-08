import React, { Component } from 'react';
import { ActivityIndicator, Platform, View, ListView, StyleSheet, Image, Dimensions } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import { updateTutors } from '../actions/tutors';
import TutorRow from './TutorRow';
import ErrorView from './ErrorView';

class TutorsComponent extends Component {
  constructor(props) {
    super(props);
    this.loadingRowObj = { loadingRow: true };
    this.updateTutors = _.throttle(this.props.updateTutors, 100, { trailing: false }); // Prevent spam calls
    this.state = {
      dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => (r1 !== r2 || r1.loadingRow || r2.loadingRow) })
      .cloneWithRows([...this.props.allTutors, this.loadingRowObj])
    };
  }

  componentDidMount() {
    this.updateTutors();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ dataSource: this.state.dataSource.cloneWithRows([...nextProps.allTutors, this.loadingRowObj]) });
  }

  onSearchBarTextEntered(text) {
    this.searchBarText = text;
    this.updateTutors(text);
  }

  onEndReached() {
    const nTutors = this.props.allTutors.length;
    if (nTutors > 0)
      this.updateTutors(this.searchBarText, this.props.allTutors[nTutors - 1].id);
  }

  renderErrorView() {
    return (
      <ErrorView error={this.props.error} />
    );
  }

  renderLoadingView() {
    return (
      <ActivityIndicator animating style={styles.loading} size="large" />
    );
  }

  renderRow(row) {
    if (row.loadingRow)
      return this.props.isLoading ? this.renderLoadingView() : null;
    return <TutorRow tutor={row} />;
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        onEndReachedThreshold={20}
        onEndReached={() => this.onEndReached()}
        renderRow={(row) => this.renderRow(row)}
      />
    );
  }

  render() {
    return (
      <Image source={background} style={styles.background} resizeMode="cover">
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
      </Image>
    );
  }
}

const searchBarBackgroundColor = 'transparent';
const background = require('./img/white_background.png');

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({ ios: { marginTop: 20 } })
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10
  },
  searchBarText: { paddingVertical: 0 },
  searchBarContainerStyle: { backgroundColor: searchBarBackgroundColor },
  background: {
    width,
    height,
  }
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
