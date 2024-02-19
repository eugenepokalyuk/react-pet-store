import { Box, Button, Grid, Tooltip } from '@radix-ui/themes';
import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { useAppDispatch } from '../hooks';
import { addToCart } from '../store/actions/actions';
import { Product } from '../types';

// Product | undefined
const getProductById = (productId: string): any => {
    return productsData.products.find(product => product.id.toString() === productId);
};

const ProductDetailsPage: React.FC = () => {
    const dispatch = useAppDispatch();

    const { productId }: any = useParams<{ productId: string }>();
    const product: Product | undefined = getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

    const handleAddToCart = () => {
        dispatch(addToCart(product.id));
        // setAddedCount((prevCount: number) => prevCount + 1); // Увеличиваем количество товара в состоянии
    };

    return (
        <Box className="p-4">
            <Grid columns="1fr minmax(0, 768px)" className="mx-auto p-4 gap-2 pt-[6rem]">
                <Box>
                    <img
                        src={product.image}
                        alt={product.name}
                        className="block w-full h-auto mb-4 rounded-lg"
                    />
                </Box>
                <Box className='p-4'>
                    <p className="text-[48px] mb-2">{product.name}</p>
                    <p className="text-gray-700 mb-2">{product.description}</p>
                    <p className="text-xl">Price: ${product.price}</p>
                    <Tooltip content="Add to Cart">
                        <Button className='bg-[#85714D] mt-4' onClick={handleAddToCart}>
                            Add to Cart
                        </Button>
                    </Tooltip>
                </Box>
            </Grid>
        </Box>
    );
};

export default ProductDetailsPage;