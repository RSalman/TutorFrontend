import React, { Component } from 'react';
import { Platform, View, ListView, StyleSheet } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { updateTutors } from '../actions/tutors';
import TutorRow from './TutorRow';
import StyledText from './StyledText';

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
    this.props.updateTutors(text);
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
        {
          this.props.error ? (
            <View style={styles.errorContainer}>
              <Icon name="exclamation-triangle" size={30} color={errorIconColor} />
              <StyledText style={styles.errorText}>{ this.props.error }</StyledText>
            </View>
          ) : (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(row) => <TutorRow tutor={row} />}
            />
          )
        }
      </View>
    );
  }
}

const searchBarBackgroundColor = 'transparent';
const errorIconColor = '#E6E6E6';
const errorTextColor = '#ADADAD';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({ ios: { marginTop: 20 } })
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
