import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Menu from './Menu';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import ProductDetail from './ProductDetail';
import { getProducts, getCategory } from '../api';
import axios from 'axios';
import { BASE_URL } from '../api';
import { addToCart } from '../api';

const { width } = Dimensions.get('window');

interface Product {
  category_id: number;
  id: number;
  title: string;
  name: string;
  price: number;
  description: string;
  image: string;
  categoryId: number;
}

interface Category {
  id: number;
  name: string;
}

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchText, setSearchText] = useState('');
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchProducts = async () => {
    try {
      const productsData = await getProducts();
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoriesData = await getCategory();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleCategorySelect = async (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (categoryId !== null) {
      try {
        const productsData = await axios.get(`${BASE_URL}/products/category/${categoryId}`);
        setProducts(productsData.data);
      } catch (error) {
        console.error('Error fetching products by category:', error);
      }
    } else {
      fetchProducts();
    }
  };

  const handleAddToCart = async (productId: number) => {
    const quantity = quantities[productId] || 1;
    try {
      await addToCart(productId, quantity);
      const successText = `Bạn đã thêm ${quantity} sản phẩm vào giỏ hàng thành công!`;
      setSuccessMessage(successText);
  
      // Reset quantity input after adding to cart
      setQuantities((prev) => ({ ...prev, [productId]: 1 }));
  
      // Hide the success message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000); // Hide after 3 seconds
    } catch (error) {
      console.error('Error adding product to cart:', error);
      setSuccessMessage('Có lỗi xảy ra khi thêm sản phẩm vào giỏ hàng. Vui lòng thử lại!');
  
      // Hide the error message after a delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    }
  };
  const handleQuantityChange = (productId: number, change: number) => {
    setQuantities((prev) => {
      const currentQuantity = prev[productId] || 1;
      const newQuantity = Math.max(currentQuantity + change, 1);
      return { ...prev, [productId]: newQuantity };
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === null || product.category_id === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const bannerImages = [
    'https://theme.hstatic.net/200000602133/1000977626/14/slider_21_pc.jpg?v=2233',
    'https://theme.hstatic.net/200000602133/1000977626/14/slider_11_pc.jpg?v=2233',
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => setIsMenuVisible(true)}>
          <Icon name="menu" size={24} color="#333" />
        </TouchableOpacity>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm sản phẩm..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.navigate('CartScreen')}
        >
          <Icon name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <Menu visible={isMenuVisible} onClose={() => setIsMenuVisible(false)} />

      <Image
        source={{ uri: bannerImages[currentIndex] }}
        style={styles.bannerImage as any}
      />

      <View style={styles.categoryContainerWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContainer}
        >
          <TouchableOpacity
            style={selectedCategory === null ? styles.categoryButtonSelected : styles.categoryButton}
            onPress={() => handleCategorySelect(null)}
          >
            <Text style={styles.categoryText}>Tất cả</Text>
          </TouchableOpacity>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={selectedCategory === category.id ? styles.categoryButtonSelected : styles.categoryButton}
              onPress={() => handleCategorySelect(category.id)}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.productListTitle}>Danh sách sản phẩm</Text>
        <View style={styles.productGrid}>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <View key={product.id} style={styles.productCard}>
                <TouchableOpacity onPress={() => setSelectedProduct(product)}>
                  <Image
                    source={{ uri: product.image }}
                    style={styles.productImage as any}
                    resizeMode="contain"
                  />
                  <View style={styles.productInfo}>
                    <Text
                      style={styles.productName}
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {product.title}
                    </Text>
                    <Text style={styles.productPriceLabel}>Giá:</Text>
                    <Text style={styles.productPrice}>
                      {new Intl.NumberFormat('vi-VN').format(product.price)} VNĐ
                    </Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, -1)}>
                    <Text style={styles.quantityButton}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityText}>{quantities[product.id] || 1}</Text>
                  <TouchableOpacity onPress={() => handleQuantityChange(product.id, 1)}>
                    <Text style={styles.quantityButton}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.addButton} onPress={() => handleAddToCart(product.id)}>
                  <Text style={styles.buttonText1}>Thêm vào giỏ hàng</Text>
                </TouchableOpacity>
              </View>
            ))
          ) : (
            <Text style={styles.noProductsText}>Không có sản phẩm nào phù hợp.</Text>
          )}
        </View>

        {/* Show the success message */}
        {successMessage && (
  <View style={styles.successMessageContainer}>
    <Text style={styles.successMessageText}>{successMessage}</Text>
  </View>
)}


      </ScrollView>

      <Modal
        visible={!!selectedProduct}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={() => handleAddToCart(selectedProduct.id)}
          />
        )}
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
  },
  successMessageContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#4CAF50', // Green background for success
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#388E3C',
  },
  successMessageText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#dcdcdc',
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: '#f0ffff',
    borderWidth: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginLeft: 10,
  },
  iconButton: {
    marginLeft: 10,
  },
  bannerImage: {
    width: width,
    height: 180,
  },
  categoryContainerWrapper: {
    padding: 10,
    backgroundColor: '#dcdcdc',
  },
  categoryContainer: {
    flexDirection: 'row',
    borderRadius: 50,
  },
  categoryButton: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  categoryButtonSelected: {
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#708090',
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#708090',
  },
  categoryText: {
    fontSize: 16,
    color: '#333',
    fontStyle:'italic',
    maxWidth: width * 0.25,
    textAlign: 'center',
  },
  scrollView: {
    paddingBottom: 100,
  },
  cartQuantity: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FF6347', // Màu đỏ
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartQuantityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  productListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 15,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: width * 0.45,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginRight:10,
    marginLeft:10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  productInfo: {
    marginTop: 10,
    marginBottom: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    overflow: 'hidden', // Ensures overflow is hidden when text exceeds space
  },
  productPriceLabel: {
    fontSize: 14,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#708090',
    marginTop: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 18,
    color: '#708090',
    paddingHorizontal: 30,
  },
  quantityText: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 10,
  },
  addButton: {
    backgroundColor: '#708090',
    paddingVertical: 10,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText1: {
    fontSize: 16,
    color: '#f5f5f5',
    textAlign:'center',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});

export default HomeScreen;
