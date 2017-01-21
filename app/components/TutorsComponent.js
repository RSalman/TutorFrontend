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
      { name: "Sarmad", picture: "" },
      { name: "Mike", picture: "" },
      { name: "John", picture: "" },
      { name: "Dan", picture: "" },
      { name: "Test1", picture: "" },
      { name: "Test2", picture: "" },
      { name: "Test3", picture: "" },
      { name: "Test4", picture: "" },
      { name: "Salman", picture: "" },
      { name: "Muraad", picture: "" },
      { name: "Peng", picture: "" },
      { name: "Leila", picture: "" }
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
