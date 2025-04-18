import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const StoryViewerScreen = ({ route, navigation }) => {
  const { story } = route.params;

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.goBack();
    }, 3000); // story auto close sau 3 giây

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={story.avatar} style={styles.image} />
      <Text style={styles.username}>{story.username}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '90%',
    height: '80%',
    resizeMode: 'contain',
  },
  username: {
    position: 'absolute',
    top: 50,
    left: 20,
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StoryViewerScreen;
