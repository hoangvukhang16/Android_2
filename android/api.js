import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL for API
export const BASE_URL = 'http://172.20.10.2:3000/api';

// Function to get the list of products
export const getProducts = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/products`);
        return response.data;
    } catch (error) {
        console.error('Error fetching products:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to get the list of categories
export const getCategory = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/category`);
        
        // Check if response data is an array
        if (Array.isArray(response.data)) {
            return response.data;
        } else {
            console.error('Category data is not an array:', response.data);
            return [];
        }
    } catch (error) {
        console.error('Error fetching category:', error.response ? error.response.data : error.message);
        throw error;
    }
};

// Function to add a user
export const addUser = async (userData) => {
    try {
        const response = await axios.post(`${BASE_URL}/users`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
// Function to update the user password
export const updateUserPassword = async (newPassword) => {
  const token = await AsyncStorage.getItem('userToken');  // Get the user's token from AsyncStorage
  
  if (!token) {
    throw new Error('User is not authenticated');
  }

  try {
    const response = await axios.put(
      `${BASE_URL}/users/password`,
      { password: newPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data; // Returns updated user info
  } catch (error) {
    throw new Error('Unable to update password: ' + (error.response ? error.response.data : error.message));
  }
};

// Function to add a product to the cart
export const addToCart = async (productId, quantity) => {
  const userId = await AsyncStorage.getItem('user_id'); // Lấy ID người dùng từ AsyncStorage

  if (!userId) {
    throw new Error('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng');
  }

  try {
    const response = await axios.post(`${BASE_URL}/cart`, {
      userId: userId,    // ID người dùng
      productId: productId, // ID sản phẩm
      quantity: quantity  // Số lượng sản phẩm
    });

    return response.data; // Trả về dữ liệu giỏ hàng sau khi thêm thành công
  } catch (error) {
    throw new Error('Không thể thêm sản phẩm vào giỏ hàng: ' + (error.response ? error.response.data : error.message));
  }
};