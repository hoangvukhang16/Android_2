import React, { useEffect, useRef } from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

interface MenuProps {
  visible: boolean;
  onClose: () => void;
}

const Menu: React.FC<MenuProps> = ({ visible, onClose }) => {
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const navigation = useNavigation();

  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleProfilePress = () => {
    console.log('Thông tin cá nhân');
    navigation.navigate('ProfileScreen'); // Thay thế bằng tên màn hình phù hợp
    onClose(); // Đóng menu sau khi nhấn
  };

  const handleLogoutPress = () => {
    console.log('Đăng xuất');
    // Thêm logic đăng xuất tại đây
    onClose(); // Đóng menu sau khi nhấn
  };

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose} style={styles.overlay} />
        <Animated.View style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}>
          <Text style={styles.menuContent}>Menu</Text>
          <TouchableOpacity style={styles.menuItem} onPress={handleProfilePress}>
            <Icon name="person-outline" size={20} color="#333" />
            <Text style={styles.menuText}>Thông tin cá nhân</Text>
          </TouchableOpacity>
          {/* Đã xóa mục "Xem đơn hàng" và "Đăng xuất" */}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeText}>Đóng</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    width: 300, // Đảm bảo chiều rộng đủ lớn
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    position: 'absolute',
    left: 0,
    top: '10%',
    height: 'auto',
  },
  menuContent: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12, // Đảm bảo padding đủ
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    flexGrow: 1, // Cho phép văn bản mở rộng
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Menu;
