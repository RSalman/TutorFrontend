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
      { name: "Sarmad" },
      { name: "Salman" },
      { name: "Muraad" },
      { name: "Peng" },
      { name: "Leila" }
    ];
    return testArray;
  }

  getDataSource(tutors) {
    return this.state.dataSource.cloneWithRows(tutors);
  }

  render() {
    return (
        <ListView
          contentContainerStyle={styles.container}
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
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});
