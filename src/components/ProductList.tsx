import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <ul className='grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 max-sm:grid-cols-1 gap-2'>
            {products.map((product, index) => (
                <li key={index} className='p-2'>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    );
};
export default ProductList;