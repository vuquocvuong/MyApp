import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';

const FirestoreTestScreen = () => {
  const [status, setStatus] = useState('🕵️‍♂️ Đang kiểm tra Firestore...');

  useEffect(() => {
    const testFirestore = async () => {
      try {
        // ✅ Ghi dữ liệu test
        await firestore().collection('test').doc('ping').set({ hello: 'world' });

        // ✅ Đọc lại dữ liệu
        const doc = await firestore().collection('test').doc('ping').get();
        const data = doc.data();

        setStatus(`✅ Firestore OK: hello = ${data.hello}`);
      } catch (err) {
        console.error(err);
        setStatus('❌ Firestore lỗi hoặc chưa cấu hình đúng.');
      }
    };

    testFirestore();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{status}</Text>
      {status.includes('Đang') && <ActivityIndicator size="large" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141517',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FirestoreTestScreen;
