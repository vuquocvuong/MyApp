// src/components/StoryItem.js
import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoryItem = ({ story }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('StoryViewer', { story });
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.storyContainer}>
      <Image source={story.avatar} style={styles.avatar} />
      <Text style={styles.username} numberOfLines={1}>
        {story.username}
      </Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  storyContainer: {
    width: 70,
    marginRight: 10,
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#cc3571',
  },
  username: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default StoryItem;
