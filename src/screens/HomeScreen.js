import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PostItem from '../components/PostItem';
import StoryItem from '../components/StoryItem';
import { getPosts } from '../services/api'; // ✅ Import hàm API

const HomeScreen = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const stories = [/* ... */]; // giữ nguyên stories mock

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const data = await getPosts();
  
      // 👉 Map lại để phù hợp với PostItem
      const mapped = data.slice(0, 10).map((item, index) => ({
        id: item.id,
        username: `Người dùng ${item.userId}`,
        caption: item.title,
        avatar: require('../../assets/image/profile1.jpg'), // ảnh local
        image: require('../../assets/image/image1.jpg'),     // ảnh local
      }));
  
      setPosts(mapped);
    } catch (error) {
      console.error('Lỗi khi load bài viết:', error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.storiesWrapper}>
        <FlatList
          data={stories}
          renderItem={({ item }) => <StoryItem story={item} />}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={posts}
          renderItem={({ item }) => <PostItem post={item} />}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#eee' },
  storiesWrapper: {
    paddingVertical: 10,
    paddingLeft: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
});

export default HomeScreen;
