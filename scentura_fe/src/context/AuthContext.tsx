import React, { createContext, useContext, useState, useEffect } from 'react';

export const API_BASE_URL =
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? ''
    : 'https://scentura-be.onrender.com';

export interface User {
  id: number;
  username: string;
  email: string;
  phone: string;
  avatarUrl?: string;
}

export interface CartItem {
  name: string;
  price: string;
  image: string;
  quantity: number;
}

interface AuthContextType {
  token: string | null;
  user: User | null;
  cart: CartItem[];
  login: (token: string, user: User) => void;
  logout: () => void;
  addToCart: (product: { name: string; price: string; image: string }) => void;
  changeQty: (index: number, change: number) => void;
  deleteItem: (index: number) => void;
  clearCart: () => void;
  showToastMessage: (message: string, type?: 'success' | 'error') => void;
  toast: { message: string; type: 'success' | 'error'; visible: boolean };
  isCartOpen: boolean;
  setCartOpen: (open: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('scentura_token'));
  const [user, setUser] = useState<User | null>(() => {
    const userStr = localStorage.getItem('scentura_user');
    return userStr ? JSON.parse(userStr) : null;
  });
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setCartOpen] = useState(false);
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error'; visible: boolean }>({
    message: '',
    type: 'success',
    visible: false,
  });

  // Load cart when user changes
  useEffect(() => {
    if (user) {
      const savedCart = localStorage.getItem(`scentura_cart_${user.username}`);
      setCart(savedCart ? JSON.parse(savedCart) : []);
    } else {
      setCart([]);
    }
  }, [user]);

  const showToastMessage = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type, visible: true });
  };

  // Hide toast after 3 seconds
  useEffect(() => {
    if (toast.visible) {
      const timer = setTimeout(() => {
        setToast((prev) => ({ ...prev, visible: false }));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.visible]);

  const login = (newToken: string, newUser: User) => {
    localStorage.setItem('scentura_token', newToken);
    localStorage.setItem('scentura_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
    showToastMessage('Đăng nhập thành công!');
  };

  const logout = () => {
    localStorage.removeItem('scentura_token');
    localStorage.removeItem('scentura_user');
    setToken(null);
    setUser(null);
    setCart([]);
    setCartOpen(false);
    showToastMessage('Đăng xuất thành công!');
  };

  const saveCartToStorage = (newCart: CartItem[]) => {
    if (user) {
      localStorage.setItem(`scentura_cart_${user.username}`, JSON.stringify(newCart));
    }
    setCart(newCart);
  };

  const addToCart = (product: { name: string; price: string; image: string }) => {
    if (!user) {
      showToastMessage('Vui lòng đăng nhập để sử dụng giỏ hàng!', 'error');
      return;
    }

    const newCart = [...cart];
    const existing = newCart.find((item) => item.name === product.name);

    if (existing) {
      existing.quantity += 1;
    } else {
      newCart.push({
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    }

    saveCartToStorage(newCart);
    showToastMessage(`Đã thêm "${product.name}" vào giỏ hàng!`);
    setCartOpen(true);
  };

  const changeQty = (index: number, change: number) => {
    const newCart = [...cart];
    if (!newCart[index]) return;

    newCart[index].quantity += change;
    if (newCart[index].quantity <= 0) {
      newCart.splice(index, 1);
    }
    saveCartToStorage(newCart);
  };

  const deleteItem = (index: number) => {
    const newCart = [...cart];
    if (!newCart[index]) return;

    const removedName = newCart[index].name;
    newCart.splice(index, 1);
    saveCartToStorage(newCart);
    showToastMessage(`Đã xóa "${removedName}" khỏi giỏ hàng.`, 'error');
  };

  const clearCart = () => {
    saveCartToStorage([]);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        cart,
        login,
        logout,
        addToCart,
        changeQty,
        deleteItem,
        clearCart,
        showToastMessage,
        toast,
        isCartOpen,
        setCartOpen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
