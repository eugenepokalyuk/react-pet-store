import { MinusIcon, PlusIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex, Inset, Strong, Text } from '@radix-ui/themes';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../hooks';
import { addToCart, removeFromCart } from '../store/actions/actions';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector((store) => store.cart.items);
    const [addedCount, setAddedCount] = useState(cartItems[product.id] ?? 0); // Извлекаем количество товара из корзины

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
        setAddedCount((prevCount: number) => prevCount + 1); // Увеличиваем количество товара в состоянии
    };
    // toDo удаление товаров из корзины
    const handleRemoveToCart = () => {
        dispatch(removeFromCart(product.id));
        // setAddedCount((prevCount: number) => prevCount - 1); // Увеличиваем количество товара в состоянии
    };

    return (
        <Box className='transition-transform duration-300 ease-in-out transform bg-gray-100 rounded-lg group'>
            <Link to={`/product/${product.id}`} className="flex items-center">
                <Inset clip="padding-box" side="top" pb="current" className='w-full mx-auto rounded-tl-lg rounded-tr-lg'>
                    <img
                        src={product.image}
                        alt={product.name}
                        style={{
                            display: 'block',
                            objectFit: 'cover',
                            width: '100%',
                            height: 300,
                            backgroundColor: 'var(--gray-5)',
                        }}
                    />
                </Inset>
            </Link>

            <div className='p-2 pb-4'>
                <div>
                    <Text as="p" size="3">
                        <Strong>{product.name}</Strong>
                    </Text>

                    <Text as="p" size="3" className='text-sm'>
                        <Strong>{product.category}</Strong>
                    </Text>
                </div>

                <Flex className='flex-wrap justify-between mt-4'>
                    <Link to={`/product/${product.id}`} className="flex items-center cursor-pointer">
                        <Button className='cursor-pointer bg-[#85714D]/60 group-hover:bg-[#85714D]/80'>
                            <ReaderIcon width="16" height="16" /> Read more
                        </Button>
                    </Link>

                    <div className="flex items-center">
                        {addedCount > 0 ? (
                            <>
                                <Button
                                    className='cursor-pointer bg-[#85714D]/60 group-hover:bg-[#85714D]/80'
                                    onClick={handleRemoveToCart}
                                >
                                    <MinusIcon width="16" height="16" />
                                </Button>
                                <Button
                                    className='bg-transparent text-black'
                                >{addedCount}</Button>
                                <Button
                                    className='cursor-pointer bg-[#85714D]/60 group-hover:bg-[#85714D]/80'
                                    onClick={handleAddToCart}
                                >
                                    <PlusIcon width="16" height="16" />
                                </Button>
                            </>
                        ) : (
                            <Button
                                className='cursor-pointer bg-[#85714D]/60 group-hover:bg-[#85714D]/80'
                                onClick={handleAddToCart}
                            >
                                <PlusIcon width="16" height="16" />
                            </Button>
                        )}
                    </div>
                </Flex>
            </div>
        </Box>
    );
};

export default ProductCard;