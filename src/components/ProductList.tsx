import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductListProps {
    products: Product[]
}

const ProductList: React.FC<ProductListProps> = ({ products }) => {
    return (
        <ul className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-2'>
            {products.map((product, index) => (
                <li key={index} className='p-2'>
                    <ProductCard product={product} />
                </li>
            ))}
        </ul>
    );
};
export default ProductList;