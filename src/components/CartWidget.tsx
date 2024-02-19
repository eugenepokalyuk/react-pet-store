import { Box } from '@radix-ui/themes';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as ShoppingBag } from '../assets/images/shopping-bag.svg';
import { useAppSelector } from '../hooks';
import { PAYMENT_PATH } from '../utils/routePath';

export const CartWidget = () => {
    const cartItems = useAppSelector((store) => store.cart.items);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const handleCartClick = () => {
        setIsCartOpen(!isCartOpen);
    };

    const handlePopupClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    const groupedItems = groupCartItems(cartItems);

    return (
        <Box className="fixed bottom-5 right-5 bg-[#85714D]/50 rounded-full p-4 cursor-pointer" onClick={handleCartClick}>
            <ShoppingBag className="w-8 h-8 fill-white/90" />
            <span className="absolute top-0 right-0 flex justify-center items-center bg-red-500/90 rounded-full w-5 h-5 text-sm text-white">{cartItems.length}</span>
            {isCartOpen && (
                <Box onClick={handlePopupClick} className="absolute bottom-20 right-0 mt-12 w-80 bg-white border-4 border-[#85714D] rounded-lg shadow p-4 cart-widget">
                    {cartItems.length > 0 ? (
                        <>
                            <ul className='max-h-[400px] overflow-auto'>
                                {groupedItems.map((group) => (
                                    <li key={group.category}>
                                        <h3 className="text-lg">{group.category}</h3>
                                        <ul>
                                            {group.items.map((item) => (
                                                <li key={item.id} className="flex justify-between">
                                                    <span className="flex-grow">{item.name} {item.quantity > 1 ? `x${item.quantity}` : ''}</span>
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
                                    <button className="w-full mt-2 bg-[#85714D]/80 text-white px-4 py-2 rounded">Pay</button>
                                </Link>
                            </div>
                        </>
                    ) : (
                        <p>Your cart is empty</p>
                    )}
                </Box>
            )}
        </Box>
    );
};

export const groupCartItems = (cartItems: number[]): { category: string; items: { id: string; name: string; price: number; quantity: number }[] }[] => {
    const products = useAppSelector((store) => store.products.products);

    const groupedItems: { category: string; items: { id: string; name: string; price: number; quantity: number }[] }[] = [];

    cartItems.forEach((itemId) => {
        const item: any = products.find((product: any) => product.id === itemId);
        if (item) {
            const categoryIndex = groupedItems.findIndex((group) => group.category === item.category);
            if (categoryIndex === -1) {
                groupedItems.push({ category: item.category, items: [{ ...item, quantity: 1 }] });
            } else {
                const existingItem = groupedItems[categoryIndex].items.find((groupedItem) => groupedItem.id === item.id);
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    groupedItems[categoryIndex].items.push({ ...item, quantity: 1 });
                }
            }
        }
    });

    return groupedItems;
};

export const calculateTotal = (groupedItems: { category: string; items: { id: string; name: string; price: number; quantity: number }[] }[]): number => {
    let total = 0;
    groupedItems.forEach((group) => {
        group.items.forEach((item) => {
            total += item.price * item.quantity;
        });
    });
    return total;
};