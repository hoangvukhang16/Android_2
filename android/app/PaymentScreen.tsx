import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Animated, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import QRCode from 'react-native-qrcode-svg'; // Add QR code library
import { BASE_URL } from '../api';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface PaymentRouteParams {
  cartItems: CartItem[];
  totalAmount: number;
}

const PaymentScreen = () => {
  const route = useRoute();
  const { cartItems, totalAmount } = route.params as PaymentRouteParams;

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null); // Store payment method
  const [fadeAnim] = useState(new Animated.Value(0)); // Fade animation for the button
  const [creditCardInfo, setCreditCardInfo] = useState({ cardNumber: '', expiry: '', cvv: '' }); // Credit card info
  const [eWalletInfo, setEWalletInfo] = useState({ walletId: '', selectedWallet: '' }); // E-wallet info
  const [codInfo, setCodInfo] = useState({ fullName: '', phoneNumber: '', address: '' }); // COD info

  const handlePayment = async () => {
    try {
        const userId = await AsyncStorage.getItem('user_id');
        if (!userId) {
            console.log('Không tìm thấy ID người dùng');
            return;
        }

        const orderData = {
            user_id: userId, // User ID from AsyncStorage
            total_amount: totalAmount, // Total amount
            payment_method: paymentMethod, // Payment method
            payment_details: paymentMethod === 'bank' ? creditCardInfo :
                             paymentMethod === 'eWallet' ? eWalletInfo :
                             paymentMethod === 'cashOnDelivery' ? codInfo : {},
        };

        // Send order to server
        const response = await fetch(`${BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(orderData),
        });

        const data = await response.json();
        console.log(data);

        if (data.status === 'success') {
            // Send cart items to server
            const orderId = data.orderId; // Get the orderId from server

            const orderItems = cartItems.map(item => ({
                order_id: orderId,
                product_id: item.id,
                quantity: item.quantity,
                price: item.price,
            }));

            const orderItemsResponse = await fetch(`${BASE_URL}/order_items`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderItems),
            });

            const orderItemsData = await orderItemsResponse.json();
            if (orderItemsData.status === 'success') {
                alert('Đơn hàng đã được tạo thành công!');
            } else {
                alert('Có lỗi xảy ra khi tạo các mặt hàng trong đơn hàng.');
            }
        } else {
            alert('Có lỗi xảy ra khi tạo đơn hàng.');
        }
    } catch (error) {
        console.error('Lỗi thanh toán:', error);
        alert('Đã xảy ra lỗi trong quá trình thanh toán.');
    }
};
  // Handle payment method selection
  const handlePaymentMethod = (method: string) => {
    setPaymentMethod(method);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Render the payment form based on selected payment method
  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'bank':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              style={styles.input}
              placeholder="Số thẻ tín dụng"
              value={creditCardInfo.cardNumber}
              onChangeText={(text) => setCreditCardInfo({ ...creditCardInfo, cardNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Ngày hết hạn"
              value={creditCardInfo.expiry}
              onChangeText={(text) => setCreditCardInfo({ ...creditCardInfo, expiry: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              value={creditCardInfo.cvv}
              onChangeText={(text) => setCreditCardInfo({ ...creditCardInfo, cvv: text })}
            />
          </View>
        );
      case 'eWallet':
        return (
          <View style={styles.paymentForm}>
            <TouchableOpacity style={styles.walletOption} onPress={() => setEWalletInfo({ ...eWalletInfo, selectedWallet: 'momo' })}>
              <Text style={styles.walletOptionText}>Momo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.walletOption} onPress={() => setEWalletInfo({ ...eWalletInfo, selectedWallet: 'zaloPay' })}>
              <Text style={styles.walletOptionText}>ZaloPay</Text>
            </TouchableOpacity>
            {eWalletInfo.selectedWallet && (
              <View style={styles.qrCodeContainer}>
                <Text style={styles.qrText}>Mã QR thanh toán {eWalletInfo.selectedWallet === 'momo' ? 'Momo' : 'ZaloPay'}</Text>
                <QRCode value={`${eWalletInfo.selectedWallet}Payment_${totalAmount}`} size={200} />
              </View>
            )}
          </View>
        );
      case 'cashOnDelivery':
        return (
          <View style={styles.paymentForm}>
            <TextInput
              style={styles.input}
              placeholder="Họ tên"
              value={codInfo.fullName}
              onChangeText={(text) => setCodInfo({ ...codInfo, fullName: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Số điện thoại"
              value={codInfo.phoneNumber}
              onChangeText={(text) => setCodInfo({ ...codInfo, phoneNumber: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Địa chỉ giao hàng"
              value={codInfo.address}
              onChangeText={(text) => setCodInfo({ ...codInfo, address: text })}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin đơn hàng</Text>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>
                {new Intl.NumberFormat('vi-VN').format(item.price)} VND x {item.quantity}
              </Text>
            </View>
          </View>
        )}
      />

      <Text style={styles.total}>Thành tiền : {new Intl.NumberFormat('vi-VN').format(totalAmount)} VND</Text>

      <Text style={styles.paymentTitle}>Chọn phương thức thanh toán</Text>
      <View style={styles.paymentMethods}>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'bank' && styles.selected]}
          onPress={() => handlePaymentMethod('bank')}
        >
          <Text style={styles.paymentButtonText}>Thẻ tín dụng / Ghi nợ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'eWallet' && styles.selected]}
          onPress={() => handlePaymentMethod('eWallet')}
        >
          <Text style={styles.paymentButtonText}>Ví điện tử</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.paymentButton, paymentMethod === 'cashOnDelivery' && styles.selected]}
          onPress={() => handlePaymentMethod('cashOnDelivery')}
        >
          <Text style={styles.paymentButtonText}>Thanh toán khi nhận hàng</Text>
        </TouchableOpacity>
      </View>

      {/* Render payment form based on selected method */}
      {renderPaymentForm()}

      {/* Payment button with fade effect */}
      <Animated.View style={[styles.buttonContainer, { opacity: fadeAnim }]}>
        <TouchableOpacity style={styles.button} onPress={handlePayment}>
          <Text style={styles.buttonText}>Thanh toán</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 2,
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 12,
  },
  productTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
  },
  productPrice: {
    fontSize: 16,
    color: '#888',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#333',
  },
  paymentTitle: {
    fontSize: 22,
    marginVertical: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentMethods: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  paymentButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 5,
    elevation: 2,
    alignItems: 'center',
  },
  paymentButtonText: {
    fontSize: 16,
    color: '#333',
  },
  selected: {
    backgroundColor: '#20b2aa',
  },
  paymentForm: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  walletOption: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 2,
  },
  walletOptionText: {
    fontSize: 18,
    color: '#333',
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  qrText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#20b2aa',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default PaymentScreen;
