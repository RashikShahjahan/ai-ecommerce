import { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductVariant } from '../types/types';

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, variant: ProductVariant, quantity: number) => void;
    removeFromCart: (variantId: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product, variant: ProductVariant, quantity: number) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.variantId === variant.id);

            if (existingItem) {
                return currentItems.map(item =>
                    item.variantId === variant.id
                        ? { ...item, quantity: item.quantity + quantity }
                        : item
                );
            }

            return [...currentItems, {
                productId: product.id,
                variantId: variant.id,
                quantity,
                product,
                variant,
            }];
        });
    };

    const removeFromCart = (variantId: string) => {
        setItems(currentItems => currentItems.filter(item => item.variantId !== variantId));
    };

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) throw new Error('useCart must be used within a CartProvider');
    return context;
}