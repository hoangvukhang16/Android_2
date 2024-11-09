// toastConfig.js
import Toast from 'react-native-toast-message';

const toastConfig = {
  success: ({ text1, text2 }) => (
    <View style={{ width: '90%', backgroundColor: 'green', padding: 10, borderRadius: 10 }}>
      <Text style={{ color: 'white', fontWeight: 'bold' }}>{text1}</Text>
      <Text style={{ color: 'white' }}>{text2}</Text>
    </View>
  ),
};

export { toastConfig };
