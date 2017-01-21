import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import TutorRow from './TutorRow';

export default class TutorsComponent  extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 != r2});
    this.state = {
      dataSource: ds.cloneWithRows(this.getTutors())
    };
  }

  getTutors() {
    var testArray = [
      { picture: "", rating: 5, degree: "Masters" },
      { picture: "", rating: 5, degree: "Bachelors" },
      { picture: "", rating: 4.5, degree: "PhD" },
      { picture: "", rating: 3.9, degree: "PhD" },
      { picture: "", rating: 3.5, degree: "PhD"},
      { picture: "", rating: 2.5, degree: "PhD"},
      { picture: "", rating: 1, degree: "PhD"},
      { picture: "", rating: 2, degree: "PhD" },
      { picture: "", rating: 4, degree: "PhD" },
      { picture: "", rating: 5, degree: "PhD" },
      { picture: "", rating: 3, degree: "PhD" },
      { picture: "", rating: 2, degree: "PhD" }
    ];
    return testArray;
  }

  getDataSource(tutors) {
    return this.state.dataSource.cloneWithRows(tutors);
  }

  render() {
    return (
      <ListView
        navigator={this.props.navigator}
        style={styles.container}
        dataSource={this.state.dataSource}
        renderRow={(row) => <TutorRow {...row}/>}
        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
