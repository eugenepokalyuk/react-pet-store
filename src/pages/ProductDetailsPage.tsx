import React from 'react';
import {useParams} from 'react-router-dom';
import {Box, Tooltip} from '@radix-ui/themes';
import {motion} from "framer-motion";

import {Product} from '../types';
import {useAppDispatch} from '../hooks';
import productsData from '../data/products.json';
import {addToCart} from '../store/actions/actions';
import ImageCarousel from '../components/ImageCarousel';

const getProductById = (productId:string):any => {
    return productsData.products.find(product => product.id.toString() === productId);
};

const ProductDetailsPage:React.FC = () => {
    const dispatch = useAppDispatch();

    const { productId }:any = useParams<{ productId:string }>();
    const product:Product|undefined = getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
    };

    return (
        <Box className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 mx-auto p-4 gap-2 pt-[6rem]">
                <Box>
                    {product.additionalImages
                        ? (<ImageCarousel images={[product.image, ...product.additionalImages]} alt={product.name}/>)
                        : (<img
                            src={product.image}
                            alt={product.name}
                            // h-auto
                            className="block w-full h-[40vh] md:h-[80vh] mb-4 rounded-lg object-cover"
                        />)
                    }
                </Box>

                <Box className='p-4'>
                    <p className="text-[48px] mb-2">{product.name}</p>

                    <p className="text-gray-700 mb-2">{product.description}</p>

                    <p className="text-xl">Price: ${product.price}</p>

                    <Tooltip content="Add to Cart">
                        <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className='flex items-center justify-center p-1 px-2 rounded bg-[#3b444b]/80 mt-4 text-white'
                            onClick={handleAddToCart}
                        >
                            Add to Cart
                        </motion.button>
                    </Tooltip>
                </Box>
            </div>
        </Box>
    );
};

export default ProductDetailsPage;
