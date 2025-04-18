import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet,
  Alert, Image, ActivityIndicator
} from 'react-native';
import { useAuth } from '../context/AuthContext';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureText, setSecureText] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (email === '1' && password === '1') {
        signIn();
        navigation.replace('Main');
      } else {
        Alert.alert('Sai thông tin', 'Email hoặc mật khẩu không đúng');
      }
    }, 1000);
  };

  return (
    <LinearGradient colors={['#1f1c2c', '#928dab']} style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../../assets/image/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Đăng nhập</Text>
      </View>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Mật khẩu"
        placeholderTextColor="#ccc"
        secureTextEntry={secureText}
        value={password}
        onChangeText={setPassword}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => setSecureText(!secureText)}>
        <Text style={{ color: '#aaa', marginBottom: 16 }}>
          {secureText ? 'Hiện mật khẩu' : 'Ẩn mật khẩu'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginText}>Đăng nhập</Text>
        )}
      </TouchableOpacity>
    </LinearGradient>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  form: {
    width: '100%',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#ffffff55',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 16,
  },
  loginButton: {
    backgroundColor: '#fca311',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
  },
  loginText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  registerLink: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LoginScreen;
