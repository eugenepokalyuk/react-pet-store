import { MinusIcon, PlusIcon, ReaderIcon } from '@radix-ui/react-icons';
import { Button, Flex, Inset, Text } from '@radix-ui/themes';
import { motion } from 'framer-motion';
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
    const [addedCount, setAddedCount] = useState<number>(cartItems[product.id] ?? 0);

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
        setAddedCount((prevCount) => prevCount + 1);
    };

    const handleRemoveToCart = () => {
        if (addedCount > 0) {
            dispatch(removeFromCart(product.id));
            setAddedCount((prevCount) => prevCount - 1);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className='transition-transform duration-300 ease-in-out transform bg-gray-100 rounded-lg group'>
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
                        className='group-hover:scale-125 transition-transform duration-300 ease-in-out transform'
                    />
                </Inset>
            </Link>

            <div className='p-2 pb-4'>
                <div>
                    <Text as="p" size="3">
                        {product.name}
                    </Text>

                    <Text as="p" size="3" className='text-sm'>
                        {product.category}
                    </Text>
                </div>

                <Flex className='flex-wrap justify-between mt-4'>
                    <Link to={`/product/${product.id}`} className="flex items-center cursor-pointer">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='flex items-center justify-between p-1 px-2 rounded cursor-pointer bg-[#3b444b]/60 group-hover:bg-[#3b444b]/80 text-white'
                        >
                            <ReaderIcon width="16" height="16" className='mr-2' /> Read more
                        </motion.button>
                    </Link>

                    <div className="flex items-center">
                        {addedCount > 0 ? (
                            <>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='flex items-center justify-between p-2 rounded cursor-pointer bg-[#3b444b]/60 group-hover:bg-[#3b444b]/70 text-white'
                                    onClick={handleRemoveToCart}
                                >
                                    <MinusIcon width="16" height="16" />
                                </motion.button>
                                <Button
                                    className='bg-transparent text-black'
                                >{addedCount}</Button>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className='flex items-center justify-between p-2 rounded cursor-pointer bg-[#3b444b]/60 group-hover:bg-[#3b444b]/70 text-white'
                                    onClick={handleAddToCart}
                                >
                                    <PlusIcon width="16" height="16" />
                                </motion.button>
                            </>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className='flex items-center justify-between p-2 rounded cursor-pointer bg-[#3b444b]/60 group-hover:bg-[#3b444b]/70 text-white'
                                onClick={handleAddToCart}
                            >
                                <PlusIcon width="16" height="16" />
                            </motion.button>
                        )}
                    </div>
                </Flex>
            </div>
        </motion.div>
    );
};

export default ProductCard;