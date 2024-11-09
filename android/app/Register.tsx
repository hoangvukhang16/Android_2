import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, StatusBar, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { BASE_URL } from '../api';

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    setError('');

    if (!name || !email || !password || !confirmPassword) {
      setError('Vui lòng nhập đầy đủ tên, email, mật khẩu và nhập lại mật khẩu.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    fetch(`${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Đăng ký không thành công');
        }
        return res.json();
      })
      .then(() => {
        Alert.alert('Thông báo', 'Đăng ký thành công!', [{ text: 'OK' }]);
        router.push('/');
      })
      .catch(() => {
        Alert.alert('Lỗi', 'Đã xảy ra lỗi trong quá trình đăng ký.');
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
        <Text style={styles.title}>Đăng ký tài khoản</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        <Text style={styles.label}>Tên*</Text>
        <TextInput
          style={styles.input}
          placeholder="Tên người dùng"
          value={name}
          onChangeText={setName}
        />
        
        <Text style={styles.label}>Email*</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Text style={styles.label}>Nhập mật khẩu*</Text>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Text style={styles.label}>Nhập lại mật khẩu*</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập lại mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Đăng ký</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Text style={styles.link}>Bạn đã có tài khoản? Đăng nhập tại đây</Text>
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
    textShadowColor: 'red',
    textShadowOffset: { width: 2, height: 2 },
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
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
});

export default Register;
