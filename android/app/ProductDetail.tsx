import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

// Định nghĩa kiểu cho đối tượng sản phẩm
interface Product {
  id: number;            // ID sản phẩm
  category_id: number;   // ID danh mục
  title: string;        // Tên sản phẩm
  price: number;        // Giá sản phẩm
  description: string;  // Mô tả sản phẩm
  image: string;        // Hình ảnh sản phẩm
}

// Định nghĩa giao diện props
interface ProductDetailProps {
  product: Product;       // Đối tượng sản phẩm để hiển thị
  onClose: () => void;    // Hàm để đóng modal
  onAddToCart: (quantity: number) => void; // Hàm để xử lý thêm vào giỏ hàng với số lượng
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onClose, onAddToCart }) => {
  // State để quản lý số lượng sản phẩm
  const [quantity, setQuantity] = useState(1);

  // Hàm xử lý thêm vào giỏ hàng
  const handleAddToCart = () => {
    onAddToCart(quantity); // Gọi hàm thêm vào giỏ hàng với số lượng
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: `Đã thêm ${quantity} sản phẩm vào giỏ hàng`,
      position: 'top',
      visibilityTime: 3000,
      autoHide: true,
      bottomOffset: 40,
    });
  };

  // Hàm xử lý tăng số lượng
  const increaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  // Hàm xử lý giảm số lượng
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Nút đóng (X) ở góc trên bên trái */}
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeButtonText}>×</Text>
      </TouchableOpacity>

      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Tên sản phẩm:</Text>
        <Text style={styles.productValue}>{product.title}</Text>

        <Text style={styles.productName}>{product.title}</Text>
  <Text style={styles.productPriceLabel}>Giá:</Text>
  <Text style={styles.productPrice}>
    {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
  </Text>
        <Text style={styles.productName}>Mô tả:</Text>
        <Text style={styles.productValue}>{product.description}</Text>

        <Text style={styles.productName}>Số lượng:</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity style={styles.quantityButton} onPress={decreaseQuantity}>
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity style={styles.quantityButton} onPress={increaseQuantity}>
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
          <Text style={styles.buttonText}>Thêm vào giỏ</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
    paddingTop: 70,
  },
  productImage: {
    width: '100%',
    height: 350,
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  productPriceLabel: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  productInfo: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    marginBottom: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  productValue: {
    fontSize: 18,
    color: '#555',
    marginBottom: 12,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  quantityButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  quantity: {
    fontSize: 18,
    color: '#555',
  },
  addButton: {
    backgroundColor: '#333',
    borderRadius: 5,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 20,
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 10,
    padding: 10,
  },
  closeButtonText: {
    color: '#333',
    fontSize: 40,
    fontWeight: 'bold',
  },
});

export default ProductDetail;
