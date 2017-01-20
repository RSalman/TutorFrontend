import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TutorRow = (tutor) => (
  <View style={styles.container}>
    <Text style={styles.text}>
      {`${tutor.name}`}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  }
});

export default TutorRow;
