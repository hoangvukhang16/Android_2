import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from '../../api'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, StatusBar, Image, Alert } from 'react-native';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
    .then(res => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Email hoặc mật khẩu không chính xác');
        }
        throw new Error('Đăng nhập không thành công');
      }
      return res.json();
    })
    .then(data => {
      console.log(data); // Kiểm tra dữ liệu trả về từ API
      if (data.id && data.token) { // Kiểm tra xem có token không
        AsyncStorage.setItem('user_id', data.id.toString()); // Lưu user_id
        AsyncStorage.setItem('userToken', data.token); // Lưu token
        Alert.alert('Thông báo', 'Đăng nhập thành công!', [{ text: 'OK' }]);
        router.push('/Home');
      } else {
        Alert.alert('Lỗi', 'Email hoặc mật khẩu không chính xác.');
      }
    })
    .catch(err => {
      Alert.alert('Lỗi', err.message || 'Đã xảy ra lỗi trong quá trình đăng nhập. Vui lòng thử lại.');
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#20b2aa" />
      
      <Image
        source={{ uri: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExY210Y3ZtdHFjbnoybmdxNDJoZGNpdm52NjJqa2h6M3Z5M3lnZnZiYSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/Bm60a5GrS3A1OJvJXN/giphy-downsized-large.gif' }}
        style={styles.gif}
        resizeMode="cover"
      />

      <View style={styles.overlay}>
        <Text style={styles.banner}>GYM STORE</Text>
        <Text style={styles.title}>Đăng nhập tài khoản</Text>
        
        <Text style={styles.label}>Email *</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        <Text style={styles.label}>Mật khẩu*</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={styles.link}>Bạn chưa có tài khoản? Đăng ký tại đây</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  banner: {
    fontSize: 40,
    marginBottom: 50,
    textAlign: 'center',
    color: '#FFE4C4',
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
  gif: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    borderRadius: 10,
  },
  label: {
    marginBottom: 5,
    color: '#20b2aa',
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    color: '#20b2aa',
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderColor: '#B0BEC5',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#20b2aa',
    borderRadius: 5,
    paddingVertical: 15,
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    color: '#20b2aa',
    textAlign: 'center',
    marginTop: 10,
  },
});

export default Login;
