import React from 'react';
import StarRating from 'react-native-star-rating';
import { Image, StyleSheet, Text, View } from 'react-native';

// TODO: Use image URI instead of static image
const TutorRow = (tutor) => {
  var image = require('./img/test.png');
  return (
    <View style={styles.container}>
      <Image source={image} style={styles.photo} />
      <View style={styles.informationContainer}>
        <View style={styles.row}>
          <StarRating
            style={styles.stars}
            disabled
            maxStars={5}
            rating={tutor.rating}
            starSize={20}
            selectedStar={function () {}}
            starColor={'gold'}
          />
          <Text style={styles.degreeText}> {`${tutor.degree}`} </Text>
        </View>
        <View style={styles.row} />
        <View style={styles.row} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  informationContainer: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 15
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between'
  },
  photo: {
    height: 100,
    width: 100,
    borderRadius: 20
  }
});

export default TutorRow;
