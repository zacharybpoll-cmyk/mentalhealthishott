"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";
import type { Product, ProductSize, ProductColor } from "./products";

export interface CartItem {
  product: Product;
  size: ProductSize;
  color: ProductColor;
  quantity: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; item: CartItem }
  | { type: "REMOVE_ITEM"; slug: string; size: ProductSize; color: ProductColor }
  | { type: "UPDATE_QUANTITY"; slug: string; size: ProductSize; color: ProductColor; quantity: number }
  | { type: "CLEAR_CART" };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.findIndex(
        (i) =>
          i.product.slug === action.item.product.slug &&
          i.size === action.item.size &&
          i.color === action.item.color
      );
      if (existing >= 0) {
        const updated = [...state.items];
        updated[existing] = {
          ...updated[existing],
          quantity: updated[existing].quantity + action.item.quantity,
        };
        return { items: updated };
      }
      return { items: [...state.items, action.item] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter(
          (i) =>
            !(
              i.product.slug === action.slug &&
              i.size === action.size &&
              i.color === action.color
            )
        ),
      };
    case "UPDATE_QUANTITY": {
      if (action.quantity <= 0) {
        return {
          items: state.items.filter(
            (i) =>
              !(
                i.product.slug === action.slug &&
                i.size === action.size &&
                i.color === action.color
              )
          ),
        };
      }
      return {
        items: state.items.map((i) =>
          i.product.slug === action.slug && i.size === action.size && i.color === action.color
            ? { ...i, quantity: action.quantity }
            : i
        ),
      };
    }
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, size: ProductSize, color: ProductColor) => void;
  updateQuantity: (slug: string, size: ProductSize, color: ProductColor, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  totalSessions: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const addItem = (item: CartItem) => dispatch({ type: "ADD_ITEM", item });
  const removeItem = (slug: string, size: ProductSize, color: ProductColor) =>
    dispatch({ type: "REMOVE_ITEM", slug, size, color });
  const updateQuantity = (slug: string, size: ProductSize, color: ProductColor, quantity: number) =>
    dispatch({ type: "UPDATE_QUANTITY", slug, size, color, quantity });
  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = state.items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  const totalSessions = state.items.reduce(
    (sum, i) => sum + i.product.therapySessions * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        totalSessions,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
