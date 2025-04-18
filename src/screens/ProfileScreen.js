import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import StatItem from '../components/StatItem'; // ✅ thêm dòng này

const mockPosts = [
  require('../../assets/image/image1.jpg'),
  require('../../assets/image/image2.jpg'),
  require('../../assets/image/image1.jpg'),
  require('../../assets/image/image2.jpg'),
  require('../../assets/image/image1.jpg'),
  require('../../assets/image/image2.jpg'),
];

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();
  const [postCount, setPostCount] = useState(mockPosts.length); // ✅ dùng state

  const renderPost = ({ item }) => (
    <Image source={item} style={styles.postImage} />
  );

  const handleLogout = () => {
    Alert.alert('Xác nhận', 'Bạn có chắc muốn đăng xuất?', [
      { text: 'Hủy', style: 'cancel' },
      {
        text: 'Đăng xuất',
        style: 'destructive',
        onPress: () => {
          signOut();
          navigation.replace('Login');
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Header info */}
      <View style={styles.header}>
        <Image
          source={require('../../assets/image/profile1.jpg')}
          style={styles.avatar}
        />
        <View style={styles.stats}>
          <StatItem number={postCount} label="Bài viết" />
          <StatItem number="1.2k" label="Người theo dõi" />
          <StatItem number="1" label="Đang theo dõi" />
        </View>
      </View>

      {/* Username + Edit button */}
      <View style={styles.info}>
        <Text style={styles.username}>@JamScd</Text>
        <TouchableOpacity style={styles.editBtn}>
          <Text style={styles.editText}>Chỉnh sửa trang cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* Post grid */}
      <FlatList
        data={mockPosts}
        numColumns={3}
        renderItem={renderPost}
        keyExtractor={(_, index) => index.toString()}
        style={styles.postList}
        scrollEnabled={false}
      />

      {/* Logout button */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </View>
  );
};

const screenWidth = Dimensions.get('window').width;
const imageSize = screenWidth / 3;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginLeft: 20,
  },
  info: {
    paddingHorizontal: 16,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
  },
  editBtn: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingVertical: 6,
    alignItems: 'center',
  },
  editText: {
    fontSize: 14,
  },
  postList: {
    marginTop: 16,
  },
  postImage: {
    width: imageSize,
    height: imageSize,
  },
  logoutBtn: {
    backgroundColor: '#cc4823',
    paddingVertical: 12,
    borderRadius: 8,
    margin: 16,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
