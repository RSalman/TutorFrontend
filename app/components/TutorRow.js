import React from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

// Use image URI instead of static image
const TutorRow = (tutor) => (
  <View style={styles.container}>
    <Image source={require('./img/test.png')} style={styles.photo} />
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
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 20,
  },
});

export default TutorRow;
