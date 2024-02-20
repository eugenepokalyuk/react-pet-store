import { Box } from '@radix-ui/themes';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingBag } from '../assets/images/shopping-bag.svg';
import { useAppSelector } from '../hooks';
import { Product } from '../types';
import { PAYMENT_PATH } from '../utils/routePath';

export const CartWidget = () => {
    const cartItems = useAppSelector((store) => store.cart.items);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const products = useAppSelector((store) => store.products.products);
    const groupedItems = groupCartItems(cartItems, products);

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <motion.button
            whileHover={isCartOpen ? {} : { scale: 1.1 }}
            whileTap={isCartOpen ? {} : { scale: 0.9 }}
            className="fixed bottom-5 right-5 bg-[#3b444b]/50 rounded-full p-4 cursor-pointer"
            onClick={handleCartClick}
        >
            <ShoppingBag className="w-8 h-8 fill-white/90" />
            <span className="absolute top-0 right-0 flex justify-center items-center bg-red-500/90 rounded-full w-5 h-5 text-sm text-white">
                {Object.keys(cartItems).reduce((total, key) => total + cartItems[key], 0)}
            </span>
            {isCartOpen && (
                <Box onClick={handlePopupClick} className="absolute bottom-20 right-0 mt-12 w-80 bg-white border-4 border-[#3b444b] rounded-lg shadow p-4 cart-widget">
                    {Object.keys(cartItems).length > 0 ? (
                        <>
                            <ul className='max-h-[400px] overflow-auto'>
                                {groupedItems.map((group) => (
                                    <li key={group.category}>
                                        <h3 className="text-lg">{group.category}</h3>
                                        <ul>
                                            {group.items.map((item) => (
                                                <li key={item.id} className="flex justify-between">
                                                    <span>{item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</span>
                                                    <span>${item.price * item.quantity}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-4">
                                <hr />
                                <div className="flex justify-between">
                                    <span>Итого:</span>
                                    <span>${calculateTotal(groupedItems)}</span>
                                </div>

                                <Link to={PAYMENT_PATH}>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-full mt-2 bg-[#3b444b]/80 text-white px-4 py-2 rounded"
                                    >
                                        Pay
                                    </motion.button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </Box>
            )}
        </motion.button>
    );
};

export const groupCartItems = (
    cartItems: { [productId: number]: number },
    products: Product[]
): { category: string; items: { id: number; name: string; price: number; quantity: number }[] }[] => {
    const groupedItems: { category: string; items: { id: number; name: string; price: number; quantity: number }[] }[] = [];

    Object.entries(cartItems).forEach(([itemId, quantity]) => {
        const item: any = products.find((product: any) => product.id === itemId);
        if (item) {
            const categoryIndex = groupedItems.findIndex((group) => group.category === item.category);
            if (categoryIndex === -1) {
                groupedItems.push({ category: item.category, items: [{ ...item, id: parseInt(item.id), quantity }] });
            } else {
                const existingItemIndex = groupedItems[categoryIndex].items.findIndex((groupedItem) => groupedItem.id === parseInt(item.id));
                if (existingItemIndex !== -1) {
                    groupedItems[categoryIndex].items[existingItemIndex].quantity += quantity;
                } else {
                    groupedItems[categoryIndex].items.push({ ...item, id: parseInt(item.id), quantity });
                }
            }
        }
    });

    return groupedItems;
};

export const calculateTotal = (groupedItems: { category: string; items: { id: number; name: string; price: number; quantity: number }[] }[]): number => {
    let total = 0;
    groupedItems.forEach(group => {
        group.items.forEach(item => {
            total += item.price * item.quantity;
        });
    });
    return total;
};