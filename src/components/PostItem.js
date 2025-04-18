import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const PostItem = ({ post }) => {
  const [liked, setLiked] = useState(false);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [comment, setComment] = useState('');

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleCommentSend = () => {
    if (comment.trim() !== '') {
      console.log('Gửi bình luận:', comment);
      setComment('');
    }
  };

  return (
    <View style={styles.postContainer}>
      {/* Header */}
      <View style={styles.header}>
      <Image source={post.avatar} style={styles.avatar} />
        <Text style={styles.username}>{post.username}</Text>
      </View>

      {/* Image */}
      <Image source={post.image} style={styles.image} />

      {/* Actions */}
      <View style={styles.actions}>
        <TouchableOpacity onPress={handleLike}>
          <Ionicons
            name={liked ? 'heart' : 'heart-outline'}
            size={24}
            color={liked ? 'red' : 'black'}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setShowCommentInput(!showCommentInput)}>
          <Ionicons name="chatbubble-outline" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>

      {/* Caption */}
      <Text style={styles.caption}>{post.caption}</Text>

      {/* Comment Input */}
      {showCommentInput && (
        <View style={styles.commentBox}>
          <TextInput
            placeholder="Viết bình luận..."
            value={comment}
            onChangeText={setComment}
            style={styles.commentInput}
          />
          <TouchableOpacity onPress={handleCommentSend}>
            <Ionicons name="send" size={20} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
  },
  username: {
    marginLeft: 10,
    fontWeight: 'bold',
  },
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    flexDirection: 'row',
    padding: 10,
  },
  icon: {
    marginRight: 15,
  },
  caption: {
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  commentBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    gap: 10,
  },
  commentInput: {
    flex: 1,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
});

export default PostItem;
