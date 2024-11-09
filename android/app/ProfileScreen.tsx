import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, ActivityIndicator, StyleSheet, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { BASE_URL } from '../api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState(null);

  // Lấy thông tin người dùng khi component được render
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        if (token) {
          const decodedToken = decodeJWT(token);
          if (decodedToken) {
            setUserId(decodedToken.id);

            // Lấy thông tin người dùng với token trong header Authorization
            const response = await axios.get(`${BASE_URL}/profile?id=${decodedToken.id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            setUserData(response.data);
          } else {
            setErrorMessage('Token không hợp lệ');
          }
        } else {
          setErrorMessage('Không tìm thấy token');
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin người dùng:', error);
        setErrorMessage('Lỗi khi lấy thông tin người dùng');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const decodeJWT = (token) => {
    try {
      if (!token) {
        throw new Error('Token là bắt buộc');
      }
  
      // Kiểm tra cấu trúc của JWT: Token phải có ba phần phân cách bằng dấu chấm
      const parts = token.split('.');
      if (parts.length !== 3) {
        throw new Error('Cấu trúc token không hợp lệ');
      }
  
      // Lấy phần payload (phần giữa)
      const base64Url = parts[1];
  
      // Thay đổi ký tự URL-safe thành các ký tự base64 chuẩn
      let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  
      // Thêm padding cho base64 để đảm bảo độ dài hợp lệ
      const padding = base64.length % 4;
      if (padding > 0) {
        base64 += '='.repeat(4 - padding); // Thêm padding cần thiết
      }
  
      // Giải mã base64
      const decodedPayload = atob(base64);
  
      // Phân tích chuỗi đã giải mã thành đối tượng JSON
      const parsedPayload = JSON.parse(decodedPayload);
  
      return parsedPayload;
    } catch (error) {
      console.error('Lỗi khi giải mã token:', error);
      return null;
    }
  };    
  // Kiểm tra tính hợp lệ của form
  const validateForm = () => {
    setErrorMessage('');
    setSuccessMessage('');

    if (!oldPassword || !newPassword || !confirmPassword) {
      setErrorMessage('Tất cả các trường là bắt buộc');
      return false;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return false;
    }

    return true;
  };

  // Xử lý thay đổi mật khẩu
  const handleChangePassword = async () => {
    setErrorMessage('');
    setSuccessMessage('');
  
    if (!validateForm()) return;
  
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('userToken');
  
      if (token) {
        console.log("Đang gửi yêu cầu thay đổi mật khẩu với:", {
          userId, oldPassword, newPassword
        });
  
        const response = await axios.post(
          `${BASE_URL}/change-password`,
          { userId, oldPassword, newPassword },
          { headers: { Authorization: `Bearer ${token}` } }
        );
  
        console.log("Phản hồi thay đổi mật khẩu:", response.data);
        
        if (response.data && response.data.message) {
          setSuccessMessage(response.data.message);
        } else {
          setSuccessMessage('Đổi mật khẩu thành công');
        }
  
        setErrorMessage('');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        setErrorMessage('Không tìm thấy token');
      }
    } catch (error) {
      console.log("Lỗi khi thay đổi mật khẩu:", error.response?.data || error.message);
      setErrorMessage(error.response?.data?.message || 'Không thể thay đổi mật khẩu');
    } finally {
      setLoading(false);
    }
  };
  
  // Hiển thị ActivityIndicator khi đang tải
  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Nếu không có dữ liệu người dùng, hiển thị lỗi
  if (!userData) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{errorMessage || 'Không thể tải thông tin người dùng'}</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <Image 
            source={{ uri: userData.avatar || 'https://www.w3schools.com/w3images/avatar2.png' }} 
            style={styles.avatar} 
          />
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{userData.email}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.instruction}>Nhập mật khẩu cũ của bạn:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu cũ"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />

          <Text style={styles.instruction}>Nhập mật khẩu mới của bạn:</Text>
          <TextInput
            style={styles.input}
            placeholder="Mật khẩu mới"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />

          <Text style={styles.instruction}>Xác nhận mật khẩu mới của bạn:</Text>
          <TextInput
            style={styles.input}
            placeholder="Xác nhận mật khẩu mới"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
          {successMessage ? <Text style={styles.success}>{successMessage}</Text> : null}

          <Button title="Đổi mật khẩu" onPress={handleChangePassword} color="#4CAF50" />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 20,
    paddingTop: 30,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  instruction: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    fontStyle: 'italic',
  },
  formContainer: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    textAlign: 'center',
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ProfileScreen;
