import React from 'react';
import StarRating from 'react-native-star-rating';
import { Image, View, Text, StyleSheet } from 'react-native';

// Use image URI instead of static image
const TutorRow = (tutor) => (
  <View style={styles.container}>
    <Image source={require('./img/test.png')} style={styles.photo} />
    <View style={styles.informationContainer}>
      <View style={styles.row}>
        <StarRating
          style={styles.stars}
          disabled={true}
          maxStars={5}
          rating={tutor.rating}
          starSize={20}
          selectedStar={function() {}}
          starColor={'gold'}
        />
        <Text style={styles.degreeText}> {`${tutor.degree}`} </Text>
      </View>
      <View style={styles.row}>
      </View>
      <View style={styles.row}>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 20,
  }
});

export default TutorRow;
