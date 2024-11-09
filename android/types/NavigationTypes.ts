// types/NavigationTypes.ts
export type CartItem = {
    id: string;  // or 'number' depending on your database
    name: string;
    price: number;
    quantity: number;
  };
  
  export type RootStackParamList = {
    CartScreen: undefined;
    PaymentScreen: { cartItems: CartItem[]; totalAmount: number };
  };
  