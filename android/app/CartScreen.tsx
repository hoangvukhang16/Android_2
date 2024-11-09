import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Image, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { BASE_URL } from '../api';
import { useNavigation } from '@react-navigation/native';
import { CartItem } from '../types/CartItem';  // Adjust the path if necessary // Adjust the path if necessary
import { RootStackParamList } from '../types/NavigationTypes'; // Import the type
import { StackNavigationProp } from '@react-navigation/stack';

// Local declaration - rename it to avoid conflict
interface CartItemLocal {
  id: number;
  quantity: number;
  title: string;
  price: number;
  image: string;
  description: string;
}
const CartScreen = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<CartItem | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  
  // Define navigation type
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'CartScreen'>>();

  const fetchCartItems = async () => {
    const userId = await AsyncStorage.getItem('user_id');
    if (userId) {
      try {
        const response = await fetch(`${BASE_URL}/cart/${userId}`);
        const data = await response.json();
        const uniqueItems = data.reduce((acc: CartItem[], item: CartItem) => {
          const existingItemIndex = acc.findIndex(cartItem => cartItem.id === item.id);
          if (existingItemIndex !== -1) {
            acc[existingItemIndex].quantity += item.quantity;
          } else {
            acc.push(item);
          }
          return acc;
        }, []);
        setCartItems(uniqueItems);
        calculateTotalAmount(uniqueItems);
      } catch (error) {
        console.error('Lỗi khi tải giỏ hàng:', error);
      }
    }
  };

  const calculateTotalAmount = (items: CartItem[]) => {
    const total = items.reduce((sum: number, item: CartItem) => sum + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleQuantityChange = (id: number, increment: boolean) => {
    setCartItems(prevItems => {
      const updatedItems = prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = increment ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      calculateTotalAmount(updatedItems);
      return updatedItems;
    });
  };

  const handleRemoveItem = async (item: CartItem) => {
    Alert.alert(
      'Xác nhận xóa',
      `Bạn có chắc muốn xóa "${item.title}" khỏi giỏ hàng không?`,
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Xóa',
          style: 'destructive',
          onPress: async () => {
            const userId = await AsyncStorage.getItem('user_id');
            if (userId) {
              try {
                const response = await fetch(`${BASE_URL}/cart/remove`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ userId, productId: item.id }),
                });
                const data = await response.json();
                if (data.success) {
                  const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
                  setCartItems(updatedCartItems);
                  calculateTotalAmount(updatedCartItems);
                  Alert.alert('Thông báo', 'Sản phẩm đã được xóa khỏi giỏ hàng.');
                }
              } catch (error) {
                console.error('Lỗi khi xóa sản phẩm:', error);
              }
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleCheckout = () => {
    // Truyền dữ liệu giỏ hàng (cartItems và totalAmount) sang trang thanh toán
    setTimeout(() => {
      navigation.navigate('PaymentScreen', {
        cartItems: cartItems, // Dữ liệu giỏ hàng
        totalAmount: totalAmount, // Tổng tiền
      });
    }, 1000);
  };

  const renderItem = ({ item }: { item: CartItem }) => {
    return (
      <TouchableOpacity onPress={() => openProductDetail(item)}>
        <View style={styles.cartItem}>
          <Image source={{ uri: item.image }} style={styles.productImage} resizeMode="contain" />
          <View style={styles.productInfo}>
            <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
            <Text style={styles.productPrice}>Giá: {new Intl.NumberFormat('vi-VN').format(item.price)} VND</Text>
          </View>
          <View style={styles.quantityControls}>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, false)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{item.quantity}</Text>
            <TouchableOpacity onPress={() => handleQuantityChange(item.id, true)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => handleRemoveItem(item)} style={styles.removeButton}>
            <Icon name="delete" size={28} color="#708090" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  const openProductDetail = (item: CartItem) => {
    setSelectedProduct(item);
    setIsModalVisible(true);
  };

  const closeProductDetail = () => {
    setIsModalVisible(false);
    setSelectedProduct(null);
  };

  return (
    <View style={styles.cartContainer}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Giỏ hàng của bạn đang trống.</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Tổng cộng: {new Intl.NumberFormat('vi-VN').format(totalAmount)} VND</Text>
        <TouchableOpacity style={styles.button} onPress={handleCheckout}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartContainer: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  cartItem: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 3,
    alignItems: 'center',
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    width: '70%',
    overflow: 'hidden',
  },
  productPrice: {
    color: '#708090',
    marginTop: 4,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    padding: 6,
    backgroundColor: '#708090',
    borderRadius: 4,
  },
  quantityButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  quantityText: {
    marginHorizontal: 12,
    fontWeight: 'bold',
    fontSize: 16,
  },
  removeButton: {
    marginLeft: 12,
  },
  emptyCartText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#999',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#708090',
    padding: 12,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  productDetailImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
  },
  productDetailTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  productDetailPrice: {
    color: '#708090',
    fontSize: 18,
    marginTop: 10,
  },
  productDetailDescription: {
    marginTop: 12,
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  closeButton: {
    backgroundColor: '#708090',
    padding: 12,
    marginTop: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CartScreen;
