import { Box, Button, Grid, Heading, Text, Tooltip } from '@radix-ui/themes';
import React from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../data/products.json';
import { Product } from '../types';

const getProductById = (productId: string): Product | undefined => {
    return productsData.products.find(product => product.id.toString() === productId);
};

const ProductDetailsPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const product: Product | undefined = getProductById(productId);

    if (!product) {
        return <div>Product not found</div>;
    }

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
                <Box>
                    <Heading size="9" className="font-bold text-[64px] mb-2">{product.name}</Heading>
                    <Text size="3" className="text-gray-700 mb-2">{product.description}</Text>
                    <Text as='div' size="3" className="font-bold text-xl">Price: ${product.price}</Text>
                    <Tooltip content="Add to Cart">
                        <Button className='bg-[#85714D] mt-4'>
                            Add to Cart
                        </Button>
                    </Tooltip>
                </Box>
            </Grid>
        </Box>
    );
};

export default ProductDetailsPage;