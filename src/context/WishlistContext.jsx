import React, { createContext, useContext, useReducer } from 'react';

const WishlistContext = createContext(null);

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_WISHLIST': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) return state;
      return { ...state, items: [...state.items, action.payload] };
    }
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, items: state.items.filter(item => item.id !== action.payload) };
    case 'TOGGLE_WISHLIST': {
      const existing = state.items.find(item => item.id === action.payload.id);
      if (existing) {
        return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, { items: [] });

  const addToWishlist = (product) => dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
  const removeFromWishlist = (id) => dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: id });
  const toggleWishlist = (product) => dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
  const isInWishlist = (id) => state.items.some(item => item.id === id);

  return (
    <WishlistContext.Provider value={{ items: state.items, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, totalItems: state.items.length }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
};
