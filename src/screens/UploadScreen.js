import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

const UploadScreen = () => {
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');

  const handleUpload = async () => {
    if (!title || !caption) {
      Alert.alert('Thiếu thông tin', 'Vui lòng nhập đầy đủ tiêu đề và nội dung');
      return;
    }

    try {
      await firestore().collection('posts').add({
        title,
        caption,
        username: 'JamScd', // Có thể lấy từ Context nếu cần
        createdAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Thành công', 'Bài viết đã được lưu lên Firestore!');
      setTitle('');
      setCaption('');
    } catch (error) {
      console.error('Lỗi khi đăng:', error);
      Alert.alert('Lỗi', 'Không thể đăng bài viết');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.heading}>📸 Tạo bài viết mới</Text>

      <TextInput
        placeholder="Tiêu đề"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Nội dung bài viết"
        style={[styles.input, { height: 100 }]}
        value={caption}
        onChangeText={setCaption}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleUpload}>
        <Text style={styles.buttonText}>Đăng bài</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fefefe',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#cc4823',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default UploadScreen;
